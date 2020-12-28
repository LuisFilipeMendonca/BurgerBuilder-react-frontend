import "./style.css";

const Input = ({
  id,
  type,
  value,
  hasError,
  errorMsg,
  info,
  inputChangeHandler,
  inputFocusHandler,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-group__label">
        {id}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        className={`${
          hasError ? "input-group__input--error" : "input-group__input"
        }`}
        onChange={inputChangeHandler}
        onFocus={inputFocusHandler}
      />
      {hasError && <p className="input-group__error-message">{errorMsg}</p>}
      {info && <p className="input-group__info">{info}</p>}
    </div>
  );
};

export default Input;
