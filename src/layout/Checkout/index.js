import { useContext, useEffect, useRef } from "react";

import { buildOrderData } from "../../helpers/Order";

import OrderContext from "../../context/Order";
import AuthContext from "../../context/Auth";

import OrderAPI from "../../api/Orders";

import TitleSecondary from "../../components/TitleSecondary";
import BaseCard from "../../components/BaseCard";
import OrderItem from "../../components/OrderItem";

const Checkout = ({ formInputs, setShowDialogHandler }) => {
  const { order } = useContext(OrderContext);
  const { auth } = useContext(AuthContext);

  const sectionRef = useRef(null);

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

  const storeOrder = async () => {
    const orderData = buildOrderData(formInputs, order);
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
          <OrderItem
            order={order}
            storeOrderHandler={storeOrder}
            extraPrice={extraPrice()}
            extra={extra()}
            isPurchase
          />
        </div>
      </BaseCard>
    </section>
  );
};

export default Checkout;
