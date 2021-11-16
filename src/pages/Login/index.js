import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import INITIAL_LOCAL_STORAGE from '../../data';

import LoginInput from './LoginInput';

import './Login.css';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // set initial localStorage
  useEffect(() => {
    INITIAL_LOCAL_STORAGE.forEach(({ key, value }) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, []);

  const handleCLick = async (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
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
        data-testid="login-submit-btn"
        disabled={ !validateEmail() || !validatePassword() }
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
