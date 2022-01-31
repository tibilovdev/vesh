import { createSelector } from 'reselect';

// createSelector первым аргументом принимает функцию(селекторы) или функции , обернутые в массив(можно и  не обернутми в массив)(обернутые потому что, может быть неск функции возращающие кусочек стейта) которая возраща-ла(ли) бы кусочек стейта, а вторым фуекцию(часто анонимную) которая в аргументе принмает вернутый кусочек стейтта(или несколько аргументов, в зависимости от того сколько функции в массиве у первого аргумента) из первого массива функции и возращает(предает дальше) этот (мы можем этот кусочек стейта  обрабортать) кусочек по нашему хотению изменненого стейта. и все эти вернутые стейты мемоизируются

//selectCartItems = createSelector() первым арг принимает массив где есть  selectCart - функция которая возращает кусочек стейта. Вторым аргументом идем анонимная функция где в аргументе сидит  state.cart (вернутый из selectCart). А возращает эта анониимная функция уже мемоизированный кусочепк стейта,который мы чуть изменили( не весть саrt а проперти cart.items). и далее опять  selectCartItemsCount превым арг принимает массив где есть [selectCartItems](которая как мы знаем вернула мемоизированный cart.items), вторым арг идет анонимная функция где в аргументе сидит этот вернутый из selectCartItems cart.cartItems и мы его обрабатываем (редюсим куантити ) и возращаем уже обработанный кусочек стейта при этом происходит мемоизация это значит что перендер произойдет только тогда когда изменения произоюдут именнов этом кусочке стейта в cart. Если изменеия произошли бы в кусочке стейта user (например мы зашли или вышли из аккаунта), то компоненты которые завязаны на из state.cart не перендерятся. Без мемоизации любое изменение в стейте заставяет перендеритя все приложение, даже те части которых этот изменение не касается.

//это мемоизация это селекторы
//пересмотри 131
const selectCart = (state) => state.cart;

// эта функция мемоизует cartItems
export const selectCartItems = createSelector([selectCart], (cart) => {
  //console.log(cart, '+++++++++');
  return cart.cartItems;
});

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// эта функция мемоизует куантити при этом ссылаясь на мемоизированный cartItems
// по факту  [selectCartItems] это ртернутый  cart.cartItems во втором аргументе (анонимная функция) (cart) => {return cart.cartItems; }); и так далее
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  //console.log(selectCartItems),
  (cartItems) => {
    //console.log(cartItems, '-----------');
    return cartItems.reduce(
      (accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity,
      0
    );

    //тут мы выводим общее количество item ов  в корзине
  }
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumPrice, cartItem) => accumPrice + cartItem.price * cartItem.quantity,
    0
  )
);
