import Bread from "../Bread";
import Ingredient from "../Ingredient";

const Logo = () => {
  return (
    <Bread
      classNameTop="bread-top--small"
      classNameBottom="bread-bottom--small"
    >
      <Ingredient type="tomato" className="tomato--small" />
      <Ingredient type="lettuce" className="lettuce--small" />
      <Ingredient type="cheese" className="cheese--small" />
      <Ingredient type="meat" className="meat--small" />
    </Bread>
  );
};

export default Logo;
