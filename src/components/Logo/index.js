import Bread from "../Bread";
import Ingredient from "../Ingredient";

const Logo = () => {
  return (
    <Bread
      classNameTop="bread-top--navbar"
      classNameBottom="bread-bottom--navbar"
    >
      <Ingredient type="tomato" className="tomato--navbar" />
      <Ingredient type="lettuce" className="lettuce--navbar" />
      <Ingredient type="cheese" className="cheese--navbar" />
      <Ingredient type="meat" className="meat--navbar" />
    </Bread>
  );
};

export default Logo;
