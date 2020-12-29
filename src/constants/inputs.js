export const authInputs = [
  {
    id: "email",
    type: "email",
    value: "",
    hasError: false,
  },
  {
    id: "password",
    type: "password",
    value: "",
    info: "Should contain at least 6 characters",
    hasError: false,
  },
];

export const purchaseInputs = [
  {
    id: "firstname",
    type: "text",
    value: "",
    hasError: false,
    placeholder: "Your first name",
  },
  {
    id: "lastname",
    type: "text",
    value: "",
    hasError: false,
    placeholder: "Your last name",
  },
  {
    id: "phone",
    type: "tel",
    value: "",
    hasError: false,
    placeholder: "Your phone number",
  },
  {
    id: "extras",
    type: "radio",
    value: "nothing",
    options: [
      {
        id: "drink",
        value: "drink",
        price: 1.25,
        label: "Want the house drink? (+ 1.25€)",
      },
      {
        id: "fries",
        value: "fries",
        price: 1.5,
        label: "Maybe some crispy fries? (+ 1.50€)",
      },
      {
        id: "menu",
        value: "menu",
        price: 2.25,
        label: "Give me the full menu instead (Drink + Fries). (+ 2.25€)",
      },
      {
        id: "nothing",
        value: "nothing",
        label: "Just want my delicious burger, thanks!",
      },
    ],
  },
];
