import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      const updatedState = [...state];
      const inputIndex = updatedState.findIndex(
        (input) => input.id === action.payload.id
      );
      updatedState[inputIndex].value = action.payload.value;
      return updatedState;
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

  return [formInputs, inputChangeHandler];
};

export default useInputs;
