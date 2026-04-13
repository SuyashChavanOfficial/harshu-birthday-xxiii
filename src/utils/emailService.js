import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ramuzpm";
const TEMPLATE_ID = "template_vn2pqdg";
const FEEDBACK_TEMPLATE_ID = "template_vdj2fu6";
const PUBLIC_KEY = "uv8YiHRC8KbiQsy1C";
const TO_EMAIL = "suyashchavanofficial@gmail.com";

export const sendBreakfastEmail = async (cartItems) => {
  const params = {
    message: cartItems.join(", "),
    selected_items: cartItems.join(", "),
    item_count: cartItems.length,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      params,
      PUBLIC_KEY,
    );

    if (response?.status !== 200) {
      throw new Error(
        `Email service returned ${response?.status || "unknown"}.`,
      );
    }

    return response;
  } catch (error) {
    const details = error?.text || error?.message || "Unknown email error.";
    throw new Error(`Email send failed: ${details}`);
  }
};

export const sendFeedbackEmail = async ({ rating, feedback }) => {
  if (
    !FEEDBACK_TEMPLATE_ID ||
    FEEDBACK_TEMPLATE_ID === "PASTE_FEEDBACK_TEMPLATE_ID_HERE"
  ) {
    throw new Error("Set FEEDBACK_TEMPLATE_ID in src/utils/emailService.js");
  }
  if (!TO_EMAIL || TO_EMAIL === "PASTE_RECEIVER_EMAIL_HERE") {
    throw new Error("Set TO_EMAIL in src/utils/emailService.js");
  }

  const params = {
    rating,
    feedback,
    // Provide common aliases so template variable mismatch is less likely.
    to_email: TO_EMAIL,
    email: TO_EMAIL,
    recipient_email: TO_EMAIL,
    user_email: TO_EMAIL,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      FEEDBACK_TEMPLATE_ID,
      params,
      PUBLIC_KEY,
    );

    if (response?.status !== 200) {
      throw new Error(
        `Email service returned ${response?.status || "unknown"}.`,
      );
    }

    return response;
  } catch (error) {
    const details = error?.text || error?.message || "Unknown email error.";
    throw new Error(`Feedback email send failed: ${details}`);
  }
};
