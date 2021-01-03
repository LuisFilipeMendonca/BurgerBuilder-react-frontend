import axiosInstance from "../../services/axios";

class Order {
  static async storeOrder(order, userId) {
    try {
      await axiosInstance.post(`/orders/${userId}.json`, order);
    } catch (e) {
      throw new Error("Something went wrong!");
    }
  }

  static async fetchOrders(userId) {
    try {
      const response = await axiosInstance(`/orders/${userId}.json`);

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteOrder(orderId, userId) {
    try {
      await axiosInstance.delete(`/orders/${userId}/${orderId}.json`);
    } catch (e) {
      console.log(e);
    }
  }
}

export default Order;
