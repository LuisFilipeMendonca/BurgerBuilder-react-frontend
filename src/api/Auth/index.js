import axios from "axios";
import axiosInstance from "../../services/axios";

class Auth {
  static async register(data, mode) {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCowqrVcdA4nxQ_VANHaFt-Z1wZfwizbZ8";

    if (mode === "register") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCowqrVcdA4nxQ_VANHaFt-Z1wZfwizbZ8";
    }

    try {
      const response = await axios.post(url, data);

      return { userId: response.data.localId, token: response.data.idToken };
    } catch (e) {
      throw new Error(e.response.data.error.message);
    }
  }

  static registerErrorHandler(err) {
    switch (err) {
      case "EMAIL_EXISTS":
        return {
          field: "email",
          errorMsg: "Your email is already registered.",
        };
      case "WEAK PASSWORD : Password should be at least 6 characters":
        return {
          field: "password",
          errorMsg: "Your password should have at least 6 characters.",
        };
      default:
        return "Something went wrong. Try again later";
    }
  }

  static loginErrorHandler(err) {
    switch (err) {
      case "EMAIL_NOT_FOUND":
        return {
          field: "email",
          errorMsg: "Your email wasnt found. Try to register first.",
        };
      case "INVALID_PASSWORD":
        return {
          field: "password",
          errorMsg: "Your password doesn't match.",
        };
      default:
        return "Something went wrong. Try again later";
    }
  }

  static async saveUserData(data, userId) {
    try {
      await axiosInstance.put(`/users-data/${userId}.json`, data);

      console.log("before");
    } catch (e) {
      throw new Error("Something went wrong!");
    }
  }
}

export default Auth;
