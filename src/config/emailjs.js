export const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
};

export function isEmailJsConfigured() {
  const { serviceId, templateId, publicKey } = emailJsConfig;
  return Boolean(serviceId && templateId && publicKey);
}
