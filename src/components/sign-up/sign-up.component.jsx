import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';
import { connect } from 'react-redux';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpStart } = this.props;
    // проверка пароля и подтвержденного пароля
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    signUpStart({ displayName, email, password });

    // это чистит нашу форму
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    // [name]: value  так мы динамически ставим стейт. name  у нас может быть разным и  'displayName' и 'email' и 'password' и 'confirm password'. поэтому у нас [name]
    this.setState({ [name]: value });
  };
  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title"> У меня нет аккаунта </h2>
        <span>Зарегистрируйтесь с помощью email и пароля</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Регистрация</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredencials) => dispatch(signUpStart(userCredencials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
