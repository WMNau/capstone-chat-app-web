import isEmpty from "../../utils/isEmpty";
import Validator from "validator";

export const validateLogin = ({ state }) => {
  const errors = {};
  const isRequired = "field is required";
  const { email, password } = state;

  if (isEmpty(email)) errors.email = `Email address ${isRequired}.`;
  else if (!Validator.isEmail(email))
    errors.email = `Email address is badly formatted.`;

  if (isEmpty(password)) errors.password = `Password ${isRequired}.`;

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validateFirebase = ({ error }) => {
  const errors = {};

  switch (error.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
      errors.email = "Email address or password is incorrect.";
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
