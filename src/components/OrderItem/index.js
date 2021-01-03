import { useContext, useState } from "react";

import "./style.css";

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
  deleteOrderHandler,
  extraPrice,
  extra,
  isPurchase,
  userDetails,
}) => {
  const [showDetails, setShowDetails] = useState(false);
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

  const toggleDetailsHandler = () => setShowDetails(!showDetails);

  return (
    <div className="order">
      <div className="order__burger">
        <Bread>
          {sortOrder(order).map((ingredient) => (
            <Ingredient key={ingredient.id} type={ingredient.name} />
          ))}
        </Bread>
      </div>
      <div className="order__details">
        <div className="order__item">
          <h4 className="order__title">Ingredients:</h4>
          <ul className="order__menu">
            {orderDetailItem().length > 0 ? (
              orderDetailItem()
            ) : (
              <li>nothing</li>
            )}
          </ul>
        </div>
        <div className="order__item">
          <h4 className="order__title">Extras:</h4>
          <ul className="order__menu">
            <li>{extra}</li>
          </ul>
        </div>
        {!isPurchase && (
          <div className="order__item">
            <button className="order__btn" onClick={toggleDetailsHandler}>
              See Details
            </button>
            {showDetails && (
              <ul className="order__menu">
                <li>
                  Name: {`${userDetails.firstname} ${userDetails.lastname}`}
                </li>
                <li>Address: {userDetails.address}</li>
                <li>Phone: {userDetails.phone}</li>
              </ul>
            )}
          </div>
        )}
        <div className="order__item order__item--inline">
          <h4>Total: {calculateTotalPrice(order, extraPrice)}€</h4>
          {isPurchase && <button onClick={storeOrderHandler}>Purchase</button>}
          {!isPurchase && (
            <button onClick={deleteOrderHandler}>Detele Order</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
