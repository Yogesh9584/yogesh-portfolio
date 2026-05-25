const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function validateContactForm(values) {
  const errors = {};
  const name = values.name?.trim() ?? "";
  const email = values.email?.trim() ?? "";
  const subject = values.subject?.trim() ?? "";
  const message = values.message?.trim() ?? "";

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 80) {
    errors.name = "Name must be 80 characters or fewer.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!subject) {
    errors.subject = "Subject is required.";
  } else if (subject.length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  } else if (subject.length > 120) {
    errors.subject = "Subject must be 120 characters or fewer.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 2000) {
    errors.message = "Message must be 2000 characters or fewer.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    sanitized: { name, email, subject, message },
  };
}

export function isFormEmpty(values) {
  const { name, email, subject, message } = values;
  return (
    !name?.trim() &&
    !email?.trim() &&
    !subject?.trim() &&
    !message?.trim()
  );
}
