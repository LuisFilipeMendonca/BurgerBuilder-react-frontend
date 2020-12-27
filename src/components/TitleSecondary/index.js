import "./style.css";

const TitleSecondary = ({ title, modifier }) => {
  return (
    <h2 className={`title-secondary title-secondary--${modifier}`}>{title}</h2>
  );
};

export default TitleSecondary;
