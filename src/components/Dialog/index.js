import { CSSTransition } from "react-transition-group";

import "./style.css";

import TitleSecondary from "../TitleSecondary";

const Dialog = ({ show, title, closeHandler, children }) => {
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
        timeout={1500}
        classNames="dialog-animate"
        unmountOnExit
      >
        <dialog open className="dialog">
          <header className="dialog__header">
            <TitleSecondary title={title} modifier="light" />
          </header>
          <div className="dialog__content">
            {children}
            <button onClick={closeHandler} className="dialog__close">
              Close
            </button>
          </div>
        </dialog>
      </CSSTransition>
    </>
  );
};

export default Dialog;
