import { BrowserRouter } from "react-router-dom";
import axios from "./services/axios";
import { useEffect, useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Routes from "./routes";

import dummyIngredients from "./constants/ingredients";

import useLocalStorage from "./hooks/useLocalStorage";

import IngredientsContext from "./context/Ingredients";
import OrderContext from "./context/Order";
import AuthContext from "./context/Auth";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [order, setOrder] = useLocalStorage("burgerOrder", []);
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useLocalStorage("burgerAuth", {});

  const fetchIngredients = async () => {
    try {
      const response = await axios("/ingredients.json");
      const data = response.data;

      if (data) {
        const fetchedIngredients = [];

        for (let key in data) {
          fetchedIngredients.push({
            id: key,
            name: data[key].name,
            price: data[key].price,
          });
        }

        setIngredients(fetchedIngredients);
      } else {
        await axios.put(".json", {
          ingredients: dummyIngredients,
        });
      }
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <IngredientsContext.Provider value={ingredients}>
            <OrderContext.Provider value={{ order, setOrder }}>
              <Navbar />
              <Routes />
            </OrderContext.Provider>
          </IngredientsContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
