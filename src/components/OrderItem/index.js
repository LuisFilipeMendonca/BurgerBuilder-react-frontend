import { useContext } from "react";

import {
  sortOrder,
  calculateTotalPrice,
  buildOrderDetails,
} from "../../helpers/Burger";

import IngredientsContext from "../../context/Ingredients";

import Bread from "../../components/Bread";
import Ingredient from "../../components/Ingredient";

const OrderItem = ({
  order,
  storeOrderHandler,
  extraPrice,
  extra,
  isPurchase,
}) => {
  const ingredients = useContext(IngredientsContext);

  const orderDetailItem = () => {
    const validOrders = buildOrderDetails(order, ingredients).filter(
      (item) => item.quantity > 0
    );

    return validOrders.map((orderDetail) => (
      <li key={orderDetail.id}>
        {orderDetail.quantity}x {orderDetail.name} (
        {orderDetail.totalPrice.toFixed(2)}€)
      </li>
    ));
  };

  return (
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
          <ul className="checkout__menu">
            {orderDetailItem().length > 0 ? (
              orderDetailItem()
            ) : (
              <li>nothing</li>
            )}
          </ul>
        </div>
        <div className="checkout__item">
          <h4 className="checkout__title">Extras:</h4>
          <ul className="checkout__menu">
            <li>{extra}</li>
          </ul>
        </div>
        <div className="checkout__item checkout__item--inline">
          <h4>Total: {calculateTotalPrice(order, extraPrice)}€</h4>
          {isPurchase && <button onClick={storeOrderHandler}>Purchase</button>}
          {!isPurchase && <button>Detele Order</button>}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
