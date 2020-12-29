import BurgerCta from "../../layout/BurgerCta";
import Burger from "../../layout/Burger";
import OrderDetails from "../../layout/OrderDetails";

const MainPage = () => {
  return (
    <main className="main">
      <BurgerCta />
      <Burger />
      <OrderDetails />
    </main>
  );
};

export default MainPage;
