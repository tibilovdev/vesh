import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

class CartIcon extends React.Component {
  render() {
    return (
      <div onClick={this.props.toggleCartHidden} className="cart-icon">
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{this.props.itemCount}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    // пересмотри 131 видео
    // тут мы выводим общее количество item ов  в корзине
    itemCount: selectCartItemsCount(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
