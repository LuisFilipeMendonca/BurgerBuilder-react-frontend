import { useEffect, useState } from "react";
import { useLocation, useHistory, Switch } from "react-router-dom";

import "./style.css";

import { formValidator } from "../../helpers/Form";

import MyRoute from "../../components/MyRoute";
import Dialog from "../../components/Dialog";
import FormPurchase from "../../layout/FormPurchase";
import Checkout from "../../layout/Checkout";

const PurchasePage = () => {
  const [inputs, setInputs] = useState(null);
  const location = useLocation();
  const history = useHistory();

  console.log(location);

  const [showDialog, setShowDialog] = useState({
    value: false,
    title: "",
    subtitle: "",
    paragraph: "",
  });

  const submitHandler = (e, formInputs, setErrorHandler) => {
    e.preventDefault();

    const isValid = formValidator(formInputs, setErrorHandler);

    if (!isValid) {
      return;
    }

    setInputs(formInputs);
    history.push(`/purchase/checkout`);
  };

  const setShowDialogHandler = (dialogConfig) => {
    setShowDialog(dialogConfig);
  };

  return (
    <>
      <Dialog show={showDialog.value} title={showDialog.title}>
        <h3>{showDialog.subtitle}</h3>
        <p>{showDialog.paragraph}</p>
      </Dialog>
      <main className="main main--modified">
        <FormPurchase
          setShowDialogHandler={setShowDialogHandler}
          submitHandler={submitHandler}
        />
        <Switch>
          <MyRoute
            path="/purchase/checkout"
            isClosed
            render={() => <Checkout formInputs={inputs} />}
          />
        </Switch>
      </main>
    </>
  );
};

export default PurchasePage;
