export const buildOrderData = (formInputs, order) => {
  const orderData = {
    details: null,
    userDetails: {},
    extras: null,
  };

  formInputs.forEach((input) => {
    if (input.id !== "extras") {
      orderData.userDetails[input.id] = input.value;
    } else {
      orderData.extras = {
        name: input.value.field,
        price: input.value.price || 0,
      };
    }
  });

  orderData.details = order;

  return orderData;
};

export const buildUserOrders = (orders) => {
  const userOrder = [];

  Object.keys(orders).forEach((order) => {
    userOrder.push({
      id: order,
      details: orders[order].details,
      extras: orders[order].extras,
      userDetails: orders[order].userDetails,
    });
  });

  return userOrder;
};
