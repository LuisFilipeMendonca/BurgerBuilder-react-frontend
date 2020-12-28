import { useContext } from "react";

import "./style.css";

import OrderContext from "../../context/Order";

import { addIngredient, removeIngredient } from "../../helpers/Burger";

const IngredientCounter = ({ ingredient, minusDisabled, plusDisabled }) => {
  const { order, setOrder } = useContext(OrderContext);

  const addIngredientHandler = (ing) => {
    const updatedOrder = addIngredient(ing, order);
    setOrder(updatedOrder);
  };

  const removeIngredientHandler = (ing) => {
    const updatedOrder = removeIngredient(ing, order);
    setOrder(updatedOrder);
  };

  return (
    <div className="ingredients-counter">
      <button
        className="ingredients-counter__btn"
        disabled={minusDisabled}
        onClick={() => removeIngredientHandler(ingredient)}
      >
        -
      </button>
      <span className="ingredients-counter__ingredient">{ingredient}</span>
      <button
        className="ingredients-counter__btn"
        disabled={plusDisabled}
        onClick={() => addIngredientHandler(ingredient)}
      >
        +
      </button>
    </div>
  );
};

export default IngredientCounter;
