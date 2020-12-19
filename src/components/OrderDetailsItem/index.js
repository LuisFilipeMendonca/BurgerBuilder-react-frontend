import "./style.css";

const OrderDetailsItem = ({ ingredient }) => {
  const { name, quantity, totalPrice } = ingredient;

  return (
    <li className="order-details__item">
      <h5 className="order-details__item-title">{name}</h5>
      <p>Quantity: {quantity}x</p>
      <p>Total: {totalPrice.toFixed(2)}€</p>
    </li>
  );
};

export default OrderDetailsItem;
