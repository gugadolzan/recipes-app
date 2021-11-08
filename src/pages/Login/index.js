import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Input from '../../components/Input';
import storage from '../../services/storage';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCLick = async () => {
    storage.write('mealsToken', '1');
    storage.write('cocktailsToken', '1');
    storage.write('email', email);
    history.push('/comidas');
  };

  const validateEmail = () => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = () => {
    const MIN_PASSWORD = 6;
    return (password.length >= MIN_PASSWORD);
  };

  return (
    <form>
      <fieldset>
        <Input
          htmlFor="email"
          label="Email"
          type="email"
          id="email"
          name="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <Input
          htmlFor="password"
          label="Password"
          type="password"
          id="password"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          disabled={ !validateEmail() || !validatePassword() }
          type="button"
          onClick={ () => handleCLick() }
        >
          Login
        </button>
      </fieldset>
    </form>
  );
}

export default Login;
