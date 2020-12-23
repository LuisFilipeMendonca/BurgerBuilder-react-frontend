import BurgerCta from "../../layout/BurgerCta";
import Burger from "../../layout/Burger";
import OrderDetails from "../../layout/OrderDetails";
import { useContext } from "react";

import IngredientsContext from "../../context/Ingredients";
import OrderContext from "../../context/Order";

import { addIngredient, removeIngredient } from "../../helpers/Burger";

import useLocalStorage from "../../hooks/useLocalStorage";

const MainPage = () => {
  const [order, setOrder] = useLocalStorage("burgerOrder", []);

  const ingredients = useContext(IngredientsContext);
  // const { order, setOrder } = useContext(OrderContext);

  console.log(ingredients);

  const addIngredientHandler = (ing) => {
    const updatedOrder = addIngredient(ing, order);
    setOrder(updatedOrder);
  };

  const removeIngredientHandler = (ing) => {
    const updatedOrder = removeIngredient(ing, order);
    setOrder(updatedOrder);
  };

  const resetOrderHandler = () => setOrder([]);

  return (
    <main className="main">
      <BurgerCta
        addIngredientHandler={addIngredientHandler}
        removeIngredientHandler={removeIngredientHandler}
        order={order}
        resetOrderHandler={resetOrderHandler}
      />
      <Burger order={order} />
      <OrderDetails order={order} />
    </main>
  );
};

export default MainPage;
