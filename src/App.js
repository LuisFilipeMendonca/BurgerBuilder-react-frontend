import { BrowserRouter } from "react-router-dom";
import axios from "./services/axios";
import { useEffect, useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Routes from "./routes";

import dummyIngredients from "./constants/ingredients";

import IngredientsContext from "./context/Ingredients";
import OrderContext from "./context/Order";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [order, setOrder] = useState([]);

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
  };

  console.log(ingredients);

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <BrowserRouter>
        <IngredientsContext.Provider value={ingredients}>
          <OrderContext.Provider value={{ order, setOrder }}>
            <Navbar />
            <Routes />
          </OrderContext.Provider>
        </IngredientsContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
