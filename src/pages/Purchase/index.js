import { useState, useContext } from "react";
import { useHistory, Switch } from "react-router-dom";

import { purchaseInputs } from "../../constants/inputs";

import useInputs from "../../hooks/useInputs";

import OrderContext from "../../context/Order";

import "./style.css";

import { formValidator } from "../../helpers/Form";

import MyRoute from "../../components/MyRoute";
import Dialog from "../../components/Dialog";
import FormPurchase from "../../layout/FormPurchase";
import Checkout from "../../layout/Checkout";

const PurchasePage = () => {
  const [
    formInputs,
    inputChangeHandler,
    inputFocusHandler,
    setErrorHandler,
    radioChangeHandler,
    setInputsValue,
  ] = useInputs([...purchaseInputs]);
  const history = useHistory();
  const { setOrder } = useContext(OrderContext);

  const [showDialog, setShowDialog] = useState({
    value: false,
    title: "",
    subtitle: "",
    paragraph: "",
  });
  const [redirect, setRedirect] = useState(false);

  const submitHandler = (e, formInputs, setErrorHandler) => {
    e.preventDefault();

    const isValid = formValidator(formInputs, setErrorHandler);

    if (!isValid) {
      return;
    }

    history.push(`/purchase/checkout`);
  };

  const setShowDialogHandler = (dialogConfig, redirect = false) => {
    setShowDialog(dialogConfig);

    if (redirect) {
      setRedirect(true);
    }
  };

  const closeDialogHandler = () => {
    setShowDialog((prevState) => {
      return {
        ...prevState,
        value: false,
      };
    });

    if (redirect) {
      setOrder([]);
      history.replace("/");
    }
  };

  return (
    <>
      <Dialog
        show={showDialog.value}
        title={showDialog.title}
        closeHandler={closeDialogHandler}
      >
        <h3>{showDialog.subtitle}</h3>
        <p>{showDialog.paragraph}</p>
      </Dialog>
      <main className="main main--modified">
        <FormPurchase
          setShowDialogHandler={setShowDialogHandler}
          submitHandler={submitHandler}
          formInputs={formInputs}
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          setErrorHandler={setErrorHandler}
          radioChangeHandler={radioChangeHandler}
          setInputsValue={setInputsValue}
        />
        <Switch>
          <MyRoute
            path="/purchase/checkout"
            isClosed
            render={() => (
              <Checkout
                formInputs={formInputs}
                setShowDialogHandler={setShowDialogHandler}
              />
            )}
          />
        </Switch>
      </main>
    </>
  );
};

export default PurchasePage;
