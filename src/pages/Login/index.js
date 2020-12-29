import { useState, useContext } from "react";

import "./style.css";

import TitleSecondary from "../../components/TitleSecondary";
import Input from "../../components/Inputs";
import Dialog from "../../components/Dialog";
import Form from "../../components/Form";

import useInputs from "../../hooks/useInputs";
import AuthContext from "../../context/Auth";

import AuthAPI from "../../api/Auth";

import { formValidator } from "../../helpers/Form";

import { authInputs } from "../../constants/inputs";

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [hasError, setHasError] = useState(null);
  const [
    formInputs,
    inputChangeHandler,
    inputFocusHandler,
    setErrorHandler,
  ] = useInputs([...authInputs]);

  const { setAuth } = useContext(AuthContext);

  const setModeHandler = (mode) => {
    setMode(mode);
  };

  const authHandler = async () => {
    try {
      const data = {
        email: formInputs[0].value,
        password: formInputs[1].value,
        returnSecureToken: true,
      };

      const response = await AuthAPI.register(data, mode);

      setAuth(response);
    } catch (e) {
      let error = e.message;

      if (mode === "register") {
        error = AuthAPI.registerErrorHandler(error);
      } else {
        error = AuthAPI.loginErrorHandler(error);
      }

      if (typeof error === "object") {
        setErrorHandler(error.field, error.errorMsg);
        return;
      }

      setHasError(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = formValidator(formInputs, setErrorHandler);

    if (!isValid) {
      return;
    }

    authHandler();
  };

  const clearError = () => setHasError(null);

  return (
    <main className="main main--modified">
      <Dialog
        closeHandler={clearError}
        show={hasError}
        title="An Error Ocurred!"
      >
        <h3>Something went wrong!</h3>
        <p>Please try again later.</p>
      </Dialog>
      <section className="section section--center">
        <div className="form__control">
          <button
            className={mode === "login" ? "highlighted" : null}
            onClick={() => setModeHandler("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "highlighted" : null}
            onClick={() => setModeHandler("register")}
          >
            Register
          </button>
        </div>
        <Form
          title={`${
            mode === "login" ? "Login" : "Register"
          } to purchase your delicious burger.`}
          submitHandler={submitHandler}
          btnSubmitDescription={`${mode === "login" ? "Login" : "Register"}`}
        >
          {formInputs.map((input) => (
            <Input
              key={input.id}
              type={input.type}
              id={input.id}
              value={input.value}
              hasError={input.hasError}
              errorMsg={input.errorMsg}
              info={input.info}
              inputChangeHandler={inputChangeHandler}
              inputFocusHandler={inputFocusHandler}
            />
          ))}
        </Form>
      </section>
    </main>
  );
};

export default LoginPage;
