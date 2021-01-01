import { useContext } from "react";

import {
  sortOrder,
  buildOrderDetails,
  calculateTotalPrice,
} from "../../helpers/Burger";

import OrderContext from "../../context/Order";
import IngredientsContext from "../../context/Ingredients";

import Bread from "../../components/Bread";
import Ingredient from "../../components/Ingredient";
import TitleSecondary from "../../components/TitleSecondary";
import BaseCard from "../../components/BaseCard";

const Checkout = ({ formInputs }) => {
  const { order } = useContext(OrderContext);
  const ingredients = useContext(IngredientsContext);

  const orderDetails = buildOrderDetails(order, ingredients).map(
    (orderDetail) => (
      <li key={orderDetail.id}>
        {orderDetail.quantity}x {orderDetail.name} (
        {orderDetail.totalPrice.toFixed(2)}€)
      </li>
    )
  );

  const extra = () => {
    const extra = formInputs.find((input) => input.id === "extras");

    return `${extra.value.field} ${
      extra.value.price ? `(${extra.value.price.toFixed(2)}€)` : ""
    }`;
  };

  const extraPrice = () => {
    const extra = formInputs.find((input) => input.id === "extras");
    return extra.value.price;
  };

  return (
    <section className="section">
      <BaseCard>
        <div className="checkout">
          <header className="checkout__header">
            <TitleSecondary title="Confirm Your Order" modifier="center" />
          </header>
          <div className="checkout__container">
            <div className="checkout__burger burger-container">
              <Bread>
                {sortOrder(order).map((ingredient) => (
                  <Ingredient key={ingredient.id} type={ingredient.name} />
                ))}
              </Bread>
            </div>
            <div className="checkout__details">
              <div className="checkout__item">
                <h4 className="checkout__title">Ingredients:</h4>
                <ul className="checkout__menu">{orderDetails}</ul>
              </div>
              <div className="checkout__item">
                <h4 className="checkout__title">Extras:</h4>
                <ul className="checkout__menu">
                  <li>{extra()}</li>
                </ul>
              </div>
              <div className="checkout__item checkout__item--inline">
                <h4>Total: {calculateTotalPrice(order, extraPrice())}€</h4>
                <button>Purchase</button>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </section>
  );
};

export default Checkout;
