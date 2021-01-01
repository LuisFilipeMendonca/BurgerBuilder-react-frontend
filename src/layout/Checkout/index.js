import { useContext, useEffect, useRef } from "react";

import {
  sortOrder,
  buildOrderDetails,
  calculateTotalPrice,
} from "../../helpers/Burger";

import OrderContext from "../../context/Order";
import IngredientsContext from "../../context/Ingredients";
import AuthContext from "../../context/Auth";

import OrderAPI from "../../api/Orders";

import Bread from "../../components/Bread";
import Ingredient from "../../components/Ingredient";
import TitleSecondary from "../../components/TitleSecondary";
import BaseCard from "../../components/BaseCard";

const Checkout = ({ formInputs, setShowDialogHandler }) => {
  const { order } = useContext(OrderContext);
  const { auth } = useContext(AuthContext);
  const ingredients = useContext(IngredientsContext);

  const sectionRef = useRef(null);

  const orderDetails = buildOrderDetails(order, ingredients);

  const orderDetailItem = orderDetails.map((orderDetail) => {
    if (orderDetail.quantity > 0) {
      return (
        <li key={orderDetail.id}>
          {orderDetail.quantity}x {orderDetail.name} (
          {orderDetail.totalPrice.toFixed(2)}€)
        </li>
      );
    }
  });

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

  const buildOrderData = () => {
    const orderData = {
      details: null,
      userDetails: {},
      extras: null,
    };

    formInputs.forEach((input) => {
      if (input.id !== "extras") {
        orderData.userDetails[input.id] = input.value;
      } else {
        orderData.extras = {
          name: input.value.field,
          price: input.value.price || 0,
        };
      }
    });

    orderData.details = orderDetails;

    storeOrder(orderData);
  };

  const storeOrder = async (orderData) => {
    try {
      await OrderAPI.storeOrder(orderData, auth.userId);

      setShowDialogHandler(
        {
          value: true,
          title: "Success",
          subtitle: "Your order was submited successfully.",
          paragraph: "Thank you for your choice. Come back again!",
        },
        true
      );
    } catch (e) {
      setShowDialogHandler({
        value: true,
        title: "An Error Ocurred!",
        subtitle: e.message,
        paragraph: "Please try again later.",
      });
    }
  };

  useEffect(() => {
    console.log(sectionRef.current);
    window.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="section" ref={sectionRef}>
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
                <ul className="checkout__menu">
                  {orderDetailItem.filter((e) => e).length ? (
                    orderDetailItem
                  ) : (
                    <li>nothing</li>
                  )}
                </ul>
              </div>
              <div className="checkout__item">
                <h4 className="checkout__title">Extras:</h4>
                <ul className="checkout__menu">
                  <li>{extra()}</li>
                </ul>
              </div>
              <div className="checkout__item checkout__item--inline">
                <h4>Total: {calculateTotalPrice(order, extraPrice())}€</h4>
                <button onClick={buildOrderData}>Purchase</button>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </section>
  );
};

export default Checkout;
