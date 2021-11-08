import React, { useState } from 'react';
import { useHistory } from 'react-router';
import LoginInput from './LoginInput';
import storage from '../../services/storage';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCLick = async (e) => {
    e.preventDefault();
    storage.write('mealsToken', 1);
    storage.write('cocktailsToken', 1);
    storage.write('user', { email });
    history.push('/comidas');
  };

  const validateEmail = () => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = () => {
    const MIN_PASSWORD = 6;
    return password.length > MIN_PASSWORD;
  };

  return (
    <form onSubmit={ handleCLick }>
      <fieldset>
        <LoginInput
          name="email"
          onChange={ ({ target }) => setEmail(target.value) }
          value={ email }
        />
        <LoginInput
          name="password"
          onChange={ ({ target }) => setPassword(target.value) }
          value={ password }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !validateEmail() || !validatePassword() }
          type="submit"
        >
          Login
        </button>
      </fieldset>
    </form>
  );
}

export default Login;
