import Bread from "../../components/Bread";
import Ingredient from "../../components/Ingredient";
import IngredientCounter from "../../components/IngredientCounter";

import ingredients from "../../constants/ingredients";

import useLocalStorage from "../../hooks/useLocalStorage";

const MainPage = () => {
  const [order, setOrder] = useLocalStorage("burgerOrder", []);

  const addIngredientHandler = (ing) => {
    const ingredient = ingredients.find(
      (ingredient) => ingredient.name === ing
    );
    const orderCopy = [...order];
    orderCopy.unshift({
      id: new Date().getTime(),
      ingredient: ingredient.name,
      ingredientId: ingredient.id,
      price: ingredient.price,
    });

    setOrder(orderCopy);
  };

  const removeIngredientHandler = (ing) => {
    let orderCopy = [...order];
    const ingredientIndex = orderCopy.findIndex(
      (ingredient) => ingredient.ingredient === ing
    );
    orderCopy = orderCopy.filter((_, index) => index !== ingredientIndex);
    setOrder(orderCopy);
  };

  const totalPrice = () => {
    let total = 0;

    order.forEach((ingredient) => {
      total += ingredient.price;
    });

    return total.toFixed(2);
  };

  const buildOrderDetails = () => {
    const orderDetails = [];

    order.forEach((ingredient) => {
      const alreadyExistsIndex = orderDetails.findIndex(
        (ing) => ing.ingredient === ingredient.ingredient
      );

      if (alreadyExistsIndex >= 0) {
        orderDetails[alreadyExistsIndex].quantity += 1;
        orderDetails[alreadyExistsIndex].totalPrice += ingredient.price;
      } else {
        orderDetails.push({
          id: ingredient.id,
          ingredient: ingredient.ingredient,
          totalPrice: ingredient.price,
          quantity: 1,
        });
      }
    });
    return orderDetails;
  };

  const resetOrderHandler = () => setOrder([]);

  return (
    <main className="main">
      <section className="burger-cta">
        <header className="burger-cta__header">
          <h2>Add Ingredients</h2>
        </header>
        <div className="burger-cta__content">
          {ingredients.map((ingredient) => (
            <IngredientCounter
              key={ingredient.name}
              ingredient={ingredient.name}
              quantity={ingredient.quantity}
              addIngredientHandler={addIngredientHandler}
              removeIngredientHandler={removeIngredientHandler}
              minusDisabled={
                !order.some((ing) => ing.ingredient === ingredient.name)
              }
              plusDisabled={
                order.filter((ing) => ing.ingredient === ingredient.name)
                  .length >= 5
              }
            />
          ))}
          <button onClick={resetOrderHandler}>Reset Burger</button>
        </div>
      </section>
      <section className="burger">
        <header className="burger__header">
          <h2>Your delicious Burger</h2>
        </header>
        <div className="burger-container">
          <Bread>
            {order.map((ingredient) => (
              <Ingredient key={ingredient.id} type={ingredient.ingredient} />
            ))}
          </Bread>
        </div>
      </section>
      <section className="order-details">
        <header className="order-details__header">
          <h2>Order Details</h2>
        </header>
        <div className="order-price">
          <span>
            Total: <span className="order-price__value">{totalPrice()}€</span>
          </span>
        </div>
        <ul className="order-details__menu">
          {buildOrderDetails().map((ingredient) => (
            <li className="order-details__item" key={ingredient.id}>
              <h5 className="order-details__item-title">
                {ingredient.ingredient}
              </h5>
              <p>Quantity: {ingredient.quantity}x</p>
              <p>Total: {ingredient.totalPrice.toFixed(2)}€</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default MainPage;
