import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import Button from "../ui/Button";
import ToastStack from "../ui/ToastStack";
import { isEmailJsConfigured } from "../../config/emailjs";
import { useToast } from "../../hooks/useToast";
import {
  EMPTY_FORM,
  isFormEmpty,
  validateContactForm,
} from "../../lib/validateContactForm";
import { sendContactEmail } from "../../services/sendContactEmail";
import { fadeUp } from "../../utils/animations";

const INPUT_BASE =
  "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-white placeholder:text-muted/70 outline-none transition focus:ring-2 focus:ring-accent-indigo/20";
const INPUT_OK = "border-white/10 focus:border-accent-indigo/50";
const INPUT_ERR = "border-rose-500/50 focus:border-rose-500/60 focus:ring-rose-500/20";

const MIN_SUBMIT_INTERVAL_MS = 8000;

function Field({
  id,
  label,
  error,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white/90"
      >
        {label}
        <span className="text-rose-400" aria-hidden>
          {" "}
          *
        </span>
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs text-rose-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({ className = "" }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmitAt = useRef(0);
  const { toasts, dismiss, success, error: showError } = useToast();

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.website?.trim()) {
      return;
    }

    if (isFormEmpty(form)) {
      showError("Please fill in all required fields before sending.");
      return;
    }

    const { errors: validationErrors, isValid, sanitized } =
      validateContactForm(form);

    if (!isValid) {
      setErrors(validationErrors);
      showError("Please fix the highlighted fields and try again.");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAt.current < MIN_SUBMIT_INTERVAL_MS) {
      showError("Please wait a few seconds before sending another message.");
      return;
    }

    if (!isEmailJsConfigured()) {
      showError(
        "Contact form is not configured yet. Add EmailJS keys to your environment."
      );
      return;
    }

    setIsSubmitting(true);
    lastSubmitAt.current = now;

    try {
      await sendContactEmail(sanitized);
      success("Message sent! I'll get back to you soon.");
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again later.";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `${INPUT_BASE} ${errors[field] ? INPUT_ERR : INPUT_OK}`;

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className={`grid gap-5 ${className}`}
        noValidate
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        aria-busy={isSubmitting}
      >
        <div
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
          aria-hidden
        >
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>

        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            className={inputClass("name")}
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            disabled={isSubmitting}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={inputClass("email")}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            disabled={isSubmitting}
          />
        </Field>

        <Field id="contact-subject" label="Subject" error={errors.subject}>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            minLength={3}
            maxLength={120}
            placeholder="What is this about?"
            className={inputClass("subject")}
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            disabled={isSubmitting}
          />
        </Field>

        <Field id="contact-message" label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={2000}
            placeholder="Tell me about your project or role..."
            className={`${inputClass("message")} resize-y min-h-[140px]`}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            disabled={isSubmitting}
          />
        </Field>

        <Button
          variant="primary"
          type="submit"
          icon={isSubmitting ? Loader2 : Send}
          loading={isSubmitting}
          disabled={isSubmitting || isFormEmpty(form)}
          className="w-full sm:w-auto"
          aria-label={isSubmitting ? "Sending message" : "Send message"}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </motion.form>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
