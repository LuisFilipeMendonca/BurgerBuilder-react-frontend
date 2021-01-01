import { useContext } from "react";

import OrderContext from "../../context/Order";
import IngredientsContext from "../../context/Ingredients";

import IngredientCounter from "../../components/IngredientCounter";
import TitleSecondary from "../../components/TitleSecondary";
import Button from "../../components/Button";

const BurgerCta = () => {
  const { order, setOrder } = useContext(OrderContext);
  const ingredients = useContext(IngredientsContext);

  const resetOrderHandler = () => setOrder([]);

  return (
    <section className="section burger-cta">
      <header className="burger-cta__header">
        <TitleSecondary title="Add Ingredients" />
      </header>
      <div className="burger-cta__content">
        {ingredients.map((ingredient) => (
          <IngredientCounter
            key={ingredient.name}
            ingredient={ingredient.name}
            quantity={ingredient.quantity}
            minusDisabled={!order.some((ing) => ing.name === ingredient.name)}
            plusDisabled={
              order.filter((ing) => ing.name === ingredient.name).length >= 3
            }
          />
        ))}
        <Button mode="flat" clickHandler={resetOrderHandler}>
          Reset Burger
        </Button>
      </div>
    </section>
  );
};

export default BurgerCta;
