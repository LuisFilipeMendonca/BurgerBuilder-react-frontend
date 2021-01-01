import axiosInstance from "../../services/axios";

class Order {
  static async storeOrder(order, userId) {
    try {
      await axiosInstance.post(`/orders/${userId}.json`, order);
    } catch (e) {
      throw new Error("Something went wrong!");
    }
  }
}

export default Order;
