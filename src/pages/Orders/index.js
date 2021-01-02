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

      const userOrders = buildUserOrders(response);

      console.log(userOrders);

      setOrders(userOrders);
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
          orders.map((order) => (
            <BaseCard key={order.id}>
              <div className="order">
                <OrderItem
                  order={order.details}
                  extra={extra(order.extras)}
                  extraPrice={order.extras.price}
                />
              </div>
            </BaseCard>
          ))}
      </section>
    </main>
  );
};

export default OrdersPage;
