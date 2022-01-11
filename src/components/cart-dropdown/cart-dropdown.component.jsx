import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = (cartItem) => (
  <div className="cart-dropdown">
    <div className="cart-items"> </div>
    <CustomButton>GO TO CHEKOUT</CustomButton>
  </div>
);

const mapStateToProps = ({ cart }) => ({
  cartItem: cart.cartItems,
});
export default connect(mapStateToProps, null)(CartDropdown);
