import "./style.css";

const InputRadio = ({ id, value, label }) => {
  return (
    <label className="input-radio__label">
      <input type="radio" name={id} value={value} />
      <div className="input-radio__description">{label}</div>
    </label>
  );
};

export default InputRadio;
