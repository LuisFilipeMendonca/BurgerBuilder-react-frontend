import { useState, useContext } from "react";

import "./style.css";

import TitleSecondary from "../../components/TitleSecondary";
import Input from "../../components/Inputs";
import Dialog from "../../components/Dialog";

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

      console.log(error);

      if (typeof error === "object") {
        setErrorHandler(error.field, error.errorMsg);
        return;
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // const isValid = formValidator(formInputs, setErrorHandler);

    // if (!isValid) {
    //   return;
    // }

    // authHandler();

    setHasError(true);
  };

  const clearError = () => setHasError(null);

  return (
    <>
      <Dialog closeHandler={clearError} show={hasError} />
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
        <form className="form" onSubmit={submitHandler}>
          <TitleSecondary
            title="Login to purchase your delicious burger!"
            modifier="center"
          />
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
          <div className="form__cta-container">
            <button onClick={submitHandler}>
              {mode === "login" ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
