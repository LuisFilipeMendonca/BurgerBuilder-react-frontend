import "./style.css";

const InputRadio = ({ id, optionId, value, label, inputChangeHandler }) => {
  return (
    <label className="input-radio__label">
      <input
        type="radio"
        name={id}
        id={optionId}
        value={value}
        onChange={inputChangeHandler}
      />
      <div className="input-radio__description">{label}</div>
    </label>
  );
};

export default InputRadio;
