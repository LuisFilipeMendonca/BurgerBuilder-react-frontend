import axios from "axios";

class Auth {
  static async register(data) {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCowqrVcdA4nxQ_VANHaFt-Z1wZfwizbZ8",
        data
      );

      return { userId: response.data.localId, token: response.data.idToken };
    } catch (e) {
      return e.response.data.error.message;
    }
  }
}

export default Auth;
