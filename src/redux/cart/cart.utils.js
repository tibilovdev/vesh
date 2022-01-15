export const addItemToCart = (cartItems, cartItemToAdd) => {
  // cartItems это state.cartItems, cartItemToAdd это  action.payload
  //проверка есть ли уже такой товар в корзине

  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  //если он есть и  cartItem.id === cartItemToAdd.id то увеличиваем проперти колличества товара в корзине cartItem.quantity + 1, если нет возвращаем просто товар в массив неизменным. и так пройдясь по массиву товаров мы увеличим куантити айтемов которые совпадают с добавляемыми
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //  добавляем в корзину товар которого там еще нет и даем quantity: 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const removeItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return clearItemFromCart(cartItems, cartItemToRemove);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
