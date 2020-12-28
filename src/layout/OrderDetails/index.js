import { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./style.css";

import OrderDetailsItem from "../../components/OrderDetailsItem";
import TitleSecondary from "../../components/TitleSecondary";

import IngredientsContext from "../../context/Ingredients";
import OrderContext from "../../context/Order";

import { buildOrderDetails, calculateTotalPrice } from "../../helpers/Burger";

const OrderDetails = () => {
  const ingredients = useContext(IngredientsContext);
  const { order } = useContext(OrderContext);

  const orderDetails = buildOrderDetails(order, ingredients).map(
    (ingredient) => {
      return ingredient.quantity > 0 ? (
        <CSSTransition key={ingredient.id} timeout={500} classNames="fade-move">
          <OrderDetailsItem ingredient={ingredient} />
        </CSSTransition>
      ) : null;
    }
  );

  return (
    <section className="section order-details">
      <header className="order-details__header">
        <TitleSecondary title="Order Details" />
      </header>
      <div className="order-price">
        <span>
          Total:{" "}
          <span className="order-price__value">
            {calculateTotalPrice(order)}€
          </span>
        </span>
      </div>
      <TransitionGroup component="ul" className="order-details__menu">
        {orderDetails}
      </TransitionGroup>
    </section>
  );
};

export default OrderDetails;
