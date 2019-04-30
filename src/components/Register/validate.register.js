import isEmpty from "../../utils/isEmpty";
import Validator from "validator";

export const validateRegister = ({ state }) => {
  const errors = {};
  const isRequired = "field is required";
  const {
    firstName,
    lastName,
    email,
    confirmEmail,
    password,
    confirmPassword,
  } = state;

  if (isEmpty(firstName)) errors.firstName = `First name ${isRequired}.`;

  if (isEmpty(lastName)) errors.lastName = `Last name ${isRequired}.`;

  if (isEmpty(email)) errors.email = `Email address ${isRequired}.`;
  else if (!Validator.isEmail(email))
    errors.email = `Email address is badly formatted.`;

  if (isEmpty(confirmEmail))
    errors.confirmEmail = `Confirm email address ${isRequired}.`;
  const minLength = 6;

  if (isEmpty(password)) errors.password = `Password ${isRequired}.`;
  else if (!Validator.isLength(password, { min: minLength }))
    errors.password = `Password must be at least ${minLength} characters long.`;

  if (isEmpty(confirmPassword))
    errors.confirmPassword = `Confirm password ${isRequired}.`;

  const doNotMatch = "fields do not match";
  if (isEmpty(errors.email) && isEmpty(errors.confirmEmail)) {
    if (email.toLowerCase() !== confirmEmail.trim().toLowerCase())
      errors.email = `Email address ${doNotMatch}.`;
  }

  if (isEmpty(errors.password) && isEmpty(errors.confirmPassword)) {
    if (password !== confirmPassword)
      errors.password = `Password ${doNotMatch}.`;
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validateFirebase = ({ error }) => {
  const errors = {};

  switch (error.code) {
    case "auth/email-already-in-use":
      errors.email = error.message;
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
