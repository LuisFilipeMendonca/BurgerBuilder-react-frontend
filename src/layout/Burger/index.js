import Bread from "../../components/Bread";
import Ingredient from "../../components/Ingredient";

const Burger = ({ order }) => {
  return (
    <section className="burger">
      <header className="burger__header">
        <h2>Your delicious Burger</h2>
      </header>
      <div className="burger-container">
        <Bread>
          {order.map((ingredient) => (
            <Ingredient key={ingredient.id} type={ingredient.name} />
          ))}
        </Bread>
      </div>
    </section>
  );
};

export default Burger;
