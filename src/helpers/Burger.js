import ingredients from "../constants/ingredients";

export const addIngredient = (addedIngredient, order) => {
  const ingredient = ingredients.find(
    (ingredient) => ingredient.name === addedIngredient
  );
  const orderCopy = [...order];
  orderCopy.unshift({
    id: new Date().getTime(),
    name: ingredient.name,
    ingredientId: ingredient.id,
    price: ingredient.price,
  });

  return orderCopy;
};

export const removeIngredient = (removedIngredient, order) => {
  let orderCopy = [...order];
  const ingredientIndex = orderCopy.findIndex(
    (ingredient) => ingredient.name === removedIngredient
  );
  orderCopy = orderCopy.filter((_, index) => index !== ingredientIndex);

  return orderCopy;
};

export const calculateTotalPrice = (order) => {
  return order.reduce((acc, curr) => (acc += curr.price), 0).toFixed(2);
};

export const buildOrderDetails = (order) => {
  const orderDetails = [];

  order.forEach((ingredient) => {
    const alreadyExistsIndex = orderDetails.findIndex(
      (ing) => ing.name === ingredient.name
    );

    if (alreadyExistsIndex >= 0) {
      orderDetails[alreadyExistsIndex].quantity += 1;
      orderDetails[alreadyExistsIndex].totalPrice += ingredient.price;
    } else {
      orderDetails.push({
        id: ingredient.id,
        name: ingredient.name,
        totalPrice: ingredient.price,
        quantity: 1,
      });
    }
  });
  return orderDetails;
};
