import { useState } from "react";

import useInputs from "../../hooks/useInputs";

const authInputs = [
  {
    id: "email",
    type: "email",
    value: "",
  },
  {
    id: "password",
    type: "password",
    value: "",
    info: "Should contain at least 6 characters",
  },
];

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [formInputs, inputChangeHandler] = useInputs([...authInputs]);

  const setModeHandler = (mode) => {
    setMode(mode);
  };

  return (
    <section className="section">
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
      <form className="form">
        <h2 className="form__title">
          Login to purchase your delicious burger!
        </h2>
        <div className="form__input-group">
          <label htmlFor={formInputs[0].id} className="form__input-label">
            Email
          </label>
          <input
            type={formInputs[0].type}
            id={formInputs[0].id}
            value={formInputs[0].value}
            className="form__input"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form__input-group">
          <label htmlFor={formInputs[1].id} className="form__input-label">
            Password
          </label>
          <input
            type={formInputs[1].type}
            id={formInputs[1].id}
            value={formInputs[1].value}
            className="form__input"
            onChange={inputChangeHandler}
          />
          <p className="form__input-info">{formInputs[1].info}</p>
        </div>
        <div className="form__cta-container">
          <button>{mode === "login" ? "Login" : "Register"}</button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
