import "./style.css";

const IngredientCounter = ({
  ingredient,
  addIngredientHandler,
  removeIngredientHandler,
  minusDisabled,
  plusDisabled,
}) => {
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
