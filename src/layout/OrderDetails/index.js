import OrderDetailsItem from "../../components/OrderDetailsItem";

import { buildOrderDetails, calculateTotalPrice } from "../../helpers/Burger";

const OrderDetails = ({ order }) => {
  return (
    <section className="order-details">
      <header className="order-details__header">
        <h2>Order Details</h2>
      </header>
      <div className="order-price">
        <span>
          Total:{" "}
          <span className="order-price__value">
            {calculateTotalPrice(order)}€
          </span>
        </span>
      </div>
      <ul className="order-details__menu">
        {buildOrderDetails(order).map((ingredient) => (
          <OrderDetailsItem key={ingredient.id} ingredient={ingredient} />
        ))}
      </ul>
    </section>
  );
};

export default OrderDetails;
