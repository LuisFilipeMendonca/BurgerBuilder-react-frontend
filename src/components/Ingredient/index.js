import "./style.css";

const Ingredient = ({ type, className }) => {
  return <div className={className ? className : type} />;
};

export default Ingredient;
