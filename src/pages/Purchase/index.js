import { useContext, useState, useEffect } from "react";

import { purchaseInputs } from "../../constants/inputs";

import useInputs from "../../hooks/useInputs";

import AuthContext from "../../context/Auth";

import AuthAPI from "../../api/Auth";

import Form from "../../components/Form";
import Input from "../../components/Inputs";
import InputsRadioGroup from "../../components/InputsRadioGroup";
import Dialog from "../../components/Dialog";
import axiosInstance from "../../services/axios";

const PurchasePage = () => {
  const [showDialog, setShowDialog] = useState({
    value: false,
    title: "",
    subtitle: "",
    paragraph: "",
  });

  const { auth } = useContext(AuthContext);
  const [
    formInputs,
    inputChangeHandler,
    inputFocusHandler,
    setErrorHandler,
    radioChangeHandler,
  ] = useInputs([...purchaseInputs]);

  const formChildren = formInputs.map((input) => {
    return input.type === "radio" ? (
      <InputsRadioGroup
        key={input.id}
        id={input.id}
        inputsOptions={input.options}
        inputChangeHandler={radioChangeHandler}
      />
    ) : (
      <Input
        key={input.id}
        type={input.type}
        id={input.id}
        value={input.value}
        hasError={input.hasError}
        errorMsg={input.errorMsg}
        inputChangeHandler={inputChangeHandler}
        inputFocusHandler={inputFocusHandler}
      />
    );
  });

  const saveUserData = async (userData) => {
    try {
      await AuthAPI.saveUserData(userData, auth.userId);

      setShowDialog({
        value: true,
        title: "Success Storing Data",
        subtitle: "Your data was added successfully in our database!",
        paragraph: "Next time you have less job.",
      });
    } catch (e) {
      setShowDialog({
        value: true,
        title: "An Error Ocurred!",
        subtitle: e.message,
        paragraph: "Try again later.",
      });
    }
  };

  const buildUserData = () => {
    let userData = {};

    formInputs.forEach((input) => {
      if (input.type !== "radio") {
        userData[input.id] = input.value;
      }
    });

    saveUserData(userData);
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance(`/users-data/${auth.userId}.json`);

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const adicionalBtn = (
    <button type="button" onClick={buildUserData}>
      Save My Data
    </button>
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Dialog show={showDialog.value} title={showDialog.title}>
        <h3>{showDialog.subtitle}</h3>
        <p>{showDialog.paragraph}</p>
      </Dialog>
      <main className="main main--modified">
        <section className="section section--center">
          <Form
            title="Enter your data to complete the purchase!"
            btnSubmitDescription="Continue"
            adicionalBtn={adicionalBtn}
          >
            {formChildren}
          </Form>
        </section>
      </main>
    </>
  );
};

export default PurchasePage;
