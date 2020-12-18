import "./style.css";

const Bread = ({ children, classNameTop, classNameBottom }) => {
  return (
    <>
      <div className={classNameTop ? classNameTop : "bread-top"} />
      {children}
      <div className={classNameBottom ? classNameBottom : "bread-bottom"} />
    </>
  );
};

export default Bread;
