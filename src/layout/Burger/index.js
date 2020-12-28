import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./style.css";

import { sortOrder } from "../../helpers/Burger";

import OrderContext from "../../context/Order";

import Bread from "../../components/Bread";
import Ingredient from "../../components/Ingredient";
import TitleSecondary from "../../components/TitleSecondary";

const Burger = () => {
  const { order } = useContext(OrderContext);

  return (
    <section className="section burger">
      <header className="burger__header">
        <TitleSecondary title="Your Delicious Burger" />
      </header>
      <div className="burger-container">
        <Bread>
          <TransitionGroup>
            {sortOrder(order).map((ingredient) => (
              <CSSTransition
                timeout={300}
                classNames="move"
                key={ingredient.id}
              >
                <Ingredient type={ingredient.name} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Bread>
      </div>
    </section>
  );
};

export default Burger;
