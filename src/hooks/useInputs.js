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

  return [formInputs, inputChangeHandler, inputFocusHandler, setErrorHandler];
};

export default useInputs;
