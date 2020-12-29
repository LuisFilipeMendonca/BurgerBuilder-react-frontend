import { Link } from "react-router-dom";

import "./style.css";

const Button = ({ isLink, clickHandler, type, path, children, mode }) => {
  return (
    <>
      {!isLink ? (
        <button
          type={type}
          onClick={clickHandler}
          className={`btn btn--${mode}`}
        >
          {children}
        </button>
      ) : (
        <Link to={path} className={`btn btn--${mode}`}>
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
