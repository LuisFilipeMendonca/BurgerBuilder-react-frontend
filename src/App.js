import { BrowserRouter } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";

import Routes from "./routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
