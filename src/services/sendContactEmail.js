import emailjs from "@emailjs/browser";
import { emailJsConfig, isEmailJsConfigured } from "../config/emailjs";

/**
 * Sends contact form data via EmailJS.
 * Template should define: from_name, from_email, reply_to, subject, message
 */
export async function sendContactEmail({ name, email, subject, message }) {
  if (!isEmailJsConfigured()) {
    throw new Error(
      "Email service is not configured. Add VITE_EMAILJS_* variables to your environment."
    );
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    reply_to: email,
    subject,
    message,
  };

  const response = await emailjs.send(
    emailJsConfig.serviceId,
    emailJsConfig.templateId,
    templateParams,
    { publicKey: emailJsConfig.publicKey }
  );

  return response;
}
