import React, { useState } from 'react';
import { useHistory } from 'react-router';

import LoginInput from './LoginInput';
import INITIAL_LOCAL_STORAGE from '../../data';
import logo from '../../images/logo.png';

import './Login.css';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCLick = async (e) => {
    e.preventDefault();
    INITIAL_LOCAL_STORAGE.forEach(({ key, value }) => (key === 'user'
      ? localStorage.setItem('user', JSON.stringify({ email }))
      : localStorage.setItem(key, JSON.stringify(value))));
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
    <div className="login-background">
      <img alt="logo" className="logo" src={ logo } />
      <form className="login-form" onSubmit={ handleCLick }>
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
          className="login-button"
          data-testid="login-submit-btn"
          disabled={ !validateEmail() || !validatePassword() }
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
