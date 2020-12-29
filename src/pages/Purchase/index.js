import { purchaseInputs } from "../../constants/inputs";

import Form from "../../components/Form";
import Input from "../../components/Inputs";
import InputsRadioGroup from "../../components/InputsRadioGroup";

const PurchasePage = () => {
  const formChildren = purchaseInputs.map((input) => {
    return input.type === "radio" ? (
      <InputsRadioGroup
        key={input.id}
        id={input.id}
        inputsOptions={input.options}
      />
    ) : (
      <Input
        key={input.id}
        type={input.type}
        id={input.id}
        value={input.value}
        hasError={input.hasError}
        errorMsg={input.errorMsg}
      />
    );
  });

  return (
    <main className="main main--modified">
      <section className="section section--center">
        <Form
          title="Enter your data to complete the purchase!"
          btnSubmitDescription="Purchase"
        >
          {formChildren}
        </Form>
      </section>
    </main>
  );
};

export default PurchasePage;
