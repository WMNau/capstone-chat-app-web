import isEmpty from "../../utils/isEmpty";
import Validator from "validator";

export const validateEmail = ({ state, user }) => {
  const errors = {};
  const isRequired = "field is required";
  const { email, confirmEmail, password } = state;
  if (isEmpty(email)) errors.email = `Email address ${isRequired}.`;
  else if (!Validator.isEmail(email))
    errors.email = `Email address is badly formatted.`;
  else if (user.email === email.trim().toLowerCase())
    errors.email = "Your new email address matches your old email address.";
  if (isEmpty(confirmEmail))
    errors.confirmEmail = `Confirm email address ${isRequired}.`;
  if (isEmpty(password)) errors.password = `Password ${isRequired}.`;
  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validateFirebase = ({ error }) => {
  const errors = {};
  switch (error.code) {
    case "auth/wrong-password":
      errors.password = "Invaild password";
      break;
    case "auth/email-already-in-use":
      errors.email = error.message;
      break;
    case "auth/too-many-requests":
      errors.email = "Too many unsuccessful attempts. Please try again later.";
      break;
    default:
      errors.database = error.message;
      console.log(
        "Firebase Error:",
        `Code: ${error.code}, "Message: ${error.message}`
      );
      break;
  }
  return {
    isValid: isEmpty(errors),
    errors,
  };
};
