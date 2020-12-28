import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./style.css";

import TitleSecondary from "../TitleSecondary";

const Dialog = ({ show, text, closeHandler }) => {
  return (
    <>
      <CSSTransition
        in={show}
        timeout={1000}
        classNames="backdrop"
        unmountOnExit
      >
        <div className="dialog__backdrop" onClick={closeHandler} />
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={1000}
        classNames="dialog-animate"
        unmountOnExit
      >
        <div className="dialog">
          <header className="dialog__header">
            <TitleSecondary title="An Error Ocurred!" modifier="light" />
          </header>
          <div className="dialog__content">
            <h3 className="dialog__text">Something went wrong!</h3>
            <p className="dialog__text">Please try again later.</p>
            <button onClick={closeHandler} className="dialog__close">
              Close
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Dialog;
