import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://burger-builder-f9653-default-rtdb.firebaseio.com/",
});

export default axiosInstance;
