import TitleSecondary from "../TitleSecondary";
import BaseCard from "../BaseCard";
import { Link } from "react-router-dom";

const Form = ({
  title,
  children,
  btnSubmitDescription,
  adicionalBtn,
  submitHandler,
}) => {
  return (
    <BaseCard>
      <form className="form" onSubmit={submitHandler}>
        <TitleSecondary title={title} modifier="center" />
        {children}
        <div className="form__cta-container">
          {adicionalBtn}
          <button type="submit" onClick={submitHandler}>
            {btnSubmitDescription}
          </button>
        </div>
      </form>
    </BaseCard>
  );
};

export default Form;
