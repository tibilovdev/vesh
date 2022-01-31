import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
      //вход с помощью пароля и почты
      await auth.signInWithEmailAndPassword(email, password);
      //очистка формы
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    //console.log(event.target, event.currentTarget, this.state);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2> У меня уже есть учетная запись</h2>
        <span>Войдите с помощью email и пароля</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Войдите </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              {' '}
              Войдите с Google{' '}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
