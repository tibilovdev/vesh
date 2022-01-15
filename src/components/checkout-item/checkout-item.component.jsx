import React from 'react';
import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem, clearItemFromCart, removeItem, addItem }) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={cartItem.imageUrl} alt="item" />
    </div>
    <span className="name">{cartItem.name}</span>
    <span className="quantity">
      <div onClick={() => removeItem(cartItem)} className="arrow">
        &#10094;
      </div>
      <span className="value">{cartItem.quantity}</span>
      <div onClick={() => addItem(cartItem)} className="arrow">
        &#10095;
      </div>
    </span>

    <span className="price">{cartItem.price}</span>
    <div onClick={() => clearItemFromCart(cartItem)} className="remove-button">
      &#10005;
    </div>
  </div>
);
const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (cartItem) => dispatch(clearItemFromCart(cartItem)),
  removeItem: (cartItem) => dispatch(removeItem(cartItem)),
  addItem: (cartItem) => dispatch(addItem(cartItem)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
