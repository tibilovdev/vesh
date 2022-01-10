import { cartActionTypes } from './cart.types';

// у нас тут нет паулода потому что нам нужен только тип исходя из которого мы будем тоглить в редюсере наш стейт
export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN,
});
