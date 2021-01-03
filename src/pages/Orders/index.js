import { useEffect, useState, useContext } from "react";

import AuthContext from "../../context/Auth";

import OrdersAPI from "../../api/Orders";

import { buildUserOrders } from "../../helpers/Order";

import OrderItem from "../../components/OrderItem";
import BaseCard from "../../components/BaseCard";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useContext(AuthContext);

  const extra = (extra) => {
    return `${extra.name} ${extra.price ? `(${extra.price.toFixed(2)}€)` : ""}`;
  };

  const fetchOrders = async () => {
    try {
      const response = await OrdersAPI.fetchOrders(auth.userId);

      const userOrders = response ? buildUserOrders(response) : [];

      setOrders(userOrders);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteOrderHandler = async (orderId) => {
    try {
      await OrdersAPI.deleteOrder(orderId, auth.userId);

      let updatedOrders = [...orders];
      updatedOrders = updatedOrders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="main main--modified">
      <section className="section">
        {orders.length > 0 &&
          orders.map(({ id, details, extras, userDetails }) => (
            <BaseCard key={id}>
              <OrderItem
                order={details}
                extra={extra(extras)}
                extraPrice={extras.price}
                userDetails={userDetails}
                deleteOrderHandler={() => deleteOrderHandler(id)}
              />
            </BaseCard>
          ))}
      </section>
    </main>
  );
};

export default OrdersPage;
