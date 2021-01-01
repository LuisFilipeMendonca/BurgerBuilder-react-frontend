import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      const updatedChangeState = [...state];
      const inputChangeIndex = updatedChangeState.findIndex(
        (input) => input.id === action.payload.id
      );
      updatedChangeState[inputChangeIndex].value = action.payload.value;
      return updatedChangeState;
    case "FOCUS":
      const updatedFocusState = [...state];
      const inputFocusIndex = updatedFocusState.findIndex(
        (input) => input.id === action.payload.id
      );
      updatedFocusState[inputFocusIndex].hasError = false;
      return updatedFocusState;
    case "SET_ERROR":
      const updatedErrorState = [...state];
      const inputErrorIndex = updatedErrorState.findIndex(
        (input) => input.id === action.payload.id
      );
      updatedErrorState[inputErrorIndex].hasError = true;
      updatedErrorState[inputErrorIndex].errorMsg = action.payload.errorMsg;
      return updatedErrorState;
    case "CHANGE_RADIO":
      const updatedRadioState = [...state];
      const inputRadioIndex = updatedRadioState.findIndex(
        (input) => input.id === action.payload.target.name
      );

      const optionField = updatedRadioState[inputRadioIndex].options.find(
        (option) => option.id === action.payload.target.id
      );

      updatedRadioState[inputRadioIndex].value = {
        field: optionField.id,
        price: optionField.price,
      };
      return updatedRadioState;
    case "SET_INPUTS_VALUE":
      const updatedInputs = [...state];

      Object.keys(action.payload).forEach((key) => {
        const inputIndex = updatedInputs.findIndex((input) => input.id === key);
        updatedInputs[inputIndex].value = action.payload[key];
      });

      return updatedInputs;
    default:
      return state;
  }
};

const useInputs = (inputs) => {
  const [formInputs, dispatch] = useReducer(reducer, inputs);

  const inputChangeHandler = (e) =>
    dispatch({
      type: "CHANGE",
      payload: { id: e.target.id, value: e.target.value },
    });

  const setErrorHandler = (id, errorMsg) =>
    dispatch({ type: "SET_ERROR", payload: { id, errorMsg } });

  const inputFocusHandler = (e) =>
    dispatch({ type: "FOCUS", payload: { id: e.target.id } });

  const radioChangeHandler = (e) =>
    dispatch({ type: "CHANGE_RADIO", payload: { target: e.target } });

  const setInputsValue = (inputsValues) =>
    dispatch({ type: "SET_INPUTS_VALUE", payload: inputsValues });

  return [
    formInputs,
    inputChangeHandler,
    inputFocusHandler,
    setErrorHandler,
    radioChangeHandler,
    setInputsValue,
  ];
};

export default useInputs;
