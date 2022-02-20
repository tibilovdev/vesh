import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/homepage/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// render={() =>
//               this.props.currentUser ? (
//                 <Redirect to="/" />
//               ) : (
//                 <SignInAndSignUpPage />
//               )
//             }
// render дает нам возможность прописывать какие то функции в роуте которые бы влияли на отображение компонентов по тому или иному юрл(дат возможность добавить джс кода в роут). render в ROUTE анологичен render() в классовом компоненте Redirect дает нам возможность пренаправялять нас url отличный который есть в path Route, в зависиости от какого либо условия. В нашем случае если current юзер авторизовался т.е существует(т.е не null), то нас с нашего дефолтного path="/signin" перекинет на URL "/" если мв попытаемся перейти по адресу /signin то нас перекинет на / (когда this.props.currentUser существует )

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});
//mapDispatchToProps позводяет нам закинуть наши актионы в стор и сразу их задиспачить (естественно актионы будут в пропсах, в нашем случае этого компонента Арр)
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
// mут первая нулл потому что в конекте первым аргументом всегда идет mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
// мы вместо  mapDispatchToProps в connect можем передать в объекте вторым аргументом наши актионы. Результат будет  такой же export default connect(null, {setCurrentUser})(App)
