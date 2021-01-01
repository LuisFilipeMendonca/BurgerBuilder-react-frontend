export const formValidator = (inputs, setError) => {
  let isFormValid = true;

  inputs.forEach((input) => {
    if (input.id === "extras") {
      return;
    }

    if (input.id === "email") {
      isFormValid = emailValidator(input, setError) && isFormValid;
    }

    if (
      input.id === "firstname" ||
      input.id === "lastname" ||
      input.id === "address"
    ) {
      isFormValid = lengthValidator(input, setError, 1, 100) && isFormValid;
    }

    if (input.id === "password") {
      isFormValid = lengthValidator(input, setError, 6, 50) && isFormValid;
    }

    if (input.id === "phone") {
      isFormValid = phoneValidator(input, setError) && isFormValid;
    }
  });

  return isFormValid;
};

const phoneValidator = (input, errorHandler) => {
  const phoneRegex = /[0-9]{9}/;
  const isValid = phoneRegex.test(input.value);

  if (!isValid) {
    errorHandler(
      input.id,
      "Your phone number is invalid. Must contain 9 numbers."
    );
  }

  return isValid;
};

const lengthValidator = (input, errorHandler, min, max) => {
  const isValid =
    input.value.trim().length >= min && input.value.trim().length <= max;

  if (!isValid)
    errorHandler(
      input.id,
      `Your ${input.id} should have at least ${min} and a maximum of ${max} characters.`
    );

  return isValid;
};

const emailValidator = (input, errorHandler) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValid = emailRegex.test(input.value);

  if (!isValid) errorHandler(input.id, "Your email is invalid.");

  return isValid;
};
