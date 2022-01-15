import React from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCartTotal } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckOutPage = ({ cartItems, totalPrice }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Продукт</span>
      </div>
      <div className="header-block">
        <span>Описание</span>
      </div>
      <div className="header-block">
        <span>Количество</span>
      </div>
      <div className="header-block">
        <span>Цена</span>
      </div>
      <div className="header-block">
        <span>Удалить</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span>Всего: ${totalPrice}</span>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectCartTotal,
});

export default connect(mapStateToProps, null)(CheckOutPage);
