import "./style.css";

import InputRadio from "../InputsRadio";

const InputsRadioGroup = ({ inputsOptions, id, inputChangeHandler }) => {
  const groupContent = inputsOptions.map((input) => (
    <InputRadio
      key={input.id}
      id={id}
      optionId={input.id}
      value={input.value}
      label={input.label}
      inputChangeHandler={inputChangeHandler}
    />
  ));

  return (
    <div className="radio-group__container input-group">
      <h4 className="radio-group__title">Select Your extras:</h4>
      {groupContent}
    </div>
  );
};

export default InputsRadioGroup;
