const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Razorpay = require("razorpay");

admin.initializeApp();
const db = admin.firestore();

const razorpay = new Razorpay({
  keyId: functions.config().razorpay.key_id,
  KeySecret: functions.config().razorpay.key_secret,
});

exports.createOrder = functions.https.onCall(async (data, context) => {
  const amount = data.amount;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  try {
    const order = await razorpay.orders.create(options);
    return {
      success: true,
      OrderId: order.id,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
});

exports.verifyPayment = functions.https.onCall(async (data, context) => {
  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = data;

  const crypto = require("crypto");
  const generatedSignature = crypto.createHmac("sha256",
      functions.config().razorpay.key_secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

  if (generatedSignature === razorpaySignature) {
    try {
      await db.collection("payments").add({
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        success: true,
        message: "Payment verified and recorded",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error saving to database: " + error.message,
      };
    }
  } else {
    return {
      success: false,
      message: "Payment verification failed",
    };
  }
});
