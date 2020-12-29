import TitleSecondary from "../TitleSecondary";

const Form = ({ title, children, btnSubmitDescription, submitHandler }) => {
  return (
    <form className="form" onSubmit={submitHandler}>
      <TitleSecondary title={title} modifier="center" />
      {children}
      <div className="form__cta-container">
        <button onClick={submitHandler}>{btnSubmitDescription}</button>
      </div>
    </form>
  );
};

export default Form;
