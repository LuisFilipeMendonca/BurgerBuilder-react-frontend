import { useEffect, useContext } from "react";

import AuthAPI from "../../api/Auth";

import AuthContext from "../../context/Auth";

import Form from "../../components/Form";

import Input from "../../components/Inputs";
import InputsRadioGroup from "../../components/InputsRadioGroup";

const FormPurchase = ({
  setShowDialogHandler,
  submitHandler,
  formInputs,
  inputChangeHandler,
  inputFocusHandler,
  setErrorHandler,
  radioChangeHandler,
  setInputsValue,
}) => {
  const { auth } = useContext(AuthContext);

  const formChildren = formInputs.map((input) => {
    return input.type === "radio" ? (
      <InputsRadioGroup
        selectedValue={input.value.field}
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

  const buildUserData = () => {
    let userData = {};

    formInputs.forEach((input) => {
      if (input.type !== "radio") {
        userData[input.id] = input.value;
      }
    });

    saveUserData(userData);
  };

  const saveUserData = async (userData) => {
    try {
      await AuthAPI.saveUserData(userData, auth.userId);

      setShowDialogHandler({
        value: true,
        title: "Success Storing Data",
        subtitle: "Your data was added successfully in our database!",
        paragraph: "Next time you have less job.",
      });
    } catch (e) {
      setShowDialogHandler({
        value: true,
        title: "An Error Ocurred!",
        subtitle: e.message,
        paragraph: "Try again later.",
      });
    }
  };

  const adicionalBtn = (
    <button type="button" onClick={buildUserData}>
      Save My Data
    </button>
  );

  const fetchUserData = async () => {
    try {
      const userData = await AuthAPI.fetchUserData(auth.userId);

      setInputsValue(userData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <section className="section section--center">
      <Form
        title="Enter your data to complete the purchase!"
        btnSubmitDescription="Continue"
        adicionalBtn={adicionalBtn}
        submitHandler={(e) => submitHandler(e, formInputs, setErrorHandler)}
      >
        {formChildren}
      </Form>
    </section>
  );
};

export default FormPurchase;
