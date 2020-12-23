import axios from "axios";

export default axios.create({
  baseURL: "https://burger-builder-f9653-default-rtdb.firebaseio.com/",
});
