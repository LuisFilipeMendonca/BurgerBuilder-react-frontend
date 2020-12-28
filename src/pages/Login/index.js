import { useState, useContext } from "react";

import "./style.css";

import TitleSecondary from "../../components/TitleSecondary";

import useInputs from "../../hooks/useInputs";
import AuthContext from "../../context/Auth";

import AuthAPI from "../../api/Auth";

import { formValidator } from "../../helpers/Form";

import { authInputs } from "../../constants/inputs";

const LoginPage = () => {
  const [mode, setMode] = useState("login");
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

  return (
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
        <div className="form__input-group">
          <label htmlFor={formInputs[0].id} className="form__input-label">
            Email
          </label>
          <input
            type={formInputs[0].type}
            id={formInputs[0].id}
            value={formInputs[0].value}
            className={`${
              formInputs[0].hasError ? "form__input-error" : "form__input"
            }`}
            onChange={inputChangeHandler}
            onFocus={inputFocusHandler}
          />
          {formInputs[0].hasError && <p>{formInputs[0].errorMsg}</p>}
        </div>
        <div className="form__input-group">
          <label htmlFor={formInputs[1].id} className="form__input-label">
            Password
          </label>
          <input
            type={formInputs[1].type}
            id={formInputs[1].id}
            value={formInputs[1].value}
            className={`${
              formInputs[1].hasError ? "form__input-error" : "form__input"
            }`}
            onChange={inputChangeHandler}
            onFocus={inputFocusHandler}
          />
          {formInputs[1].hasError && <p>{formInputs[1].errorMsg}</p>}
          <p className="form__input-info">{formInputs[1].info}</p>
        </div>
        <div className="form__cta-container">
          <button onClick={submitHandler}>
            {mode === "login" ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
