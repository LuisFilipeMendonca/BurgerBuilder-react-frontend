import ingredients from "../constants/ingredients";

export const addIngredient = (addedIngredient, order) => {
  const ingredient = ingredients.find(
    (ingredient) => ingredient.name === addedIngredient
  );
  const orderCopy = [...order];
  orderCopy.push({
    id: new Date().getTime(),
    name: ingredient.name,
    ingredientId: ingredient.id,
    price: ingredient.price,
  });

  return orderCopy;
};

export const sortOrder = (order) => {
  const sortedOrder = order.sort((a, b) => b.id - a.id);
  return sortedOrder;
};

export const removeIngredient = (removedIngredient, order) => {
  let orderCopy = [...order];
  const ingredientIndex = orderCopy.findIndex(
    (ingredient) => ingredient.name === removedIngredient
  );
  orderCopy = orderCopy.filter((_, index) => index !== ingredientIndex);

  return orderCopy;
};

export const calculateTotalPrice = (order, initialValue = 0) => {
  return order
    .reduce((acc, curr) => (acc += curr.price), initialValue)
    .toFixed(2);
};

export const buildOrderDetails = (order, ingredients) => {
  const orderDetails = [];

  ingredients.forEach((ingredient) => {
    orderDetails.push({
      id: ingredient.id,
      name: ingredient.name,
      totalPrice: 0,
      quantity: 0,
    });
  });

  order.forEach((ingredient) => {
    const ingIndex = orderDetails.findIndex(
      (ing) => ing.name === ingredient.name
    );

    orderDetails[ingIndex].quantity += 1;
    orderDetails[ingIndex].totalPrice += ingredient.price;
  });
  return orderDetails;
};
