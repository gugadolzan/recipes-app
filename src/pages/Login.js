import * as React from 'react';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail();
    setPassword();
  };

  const validateEmail = () => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = () => {
    const MIN_PASSWORD = 6;
    if (password.length >= MIN_PASSWORD) return true;
    return false;
  };

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <fieldset>
          <h1>Login</h1>
          <TextField
            label="Email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            type="email"
            value={ email }
          />
          <TextField
            label="Senha"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
            value={ password }
          />
          <Button
            variant="contained"
            color="primary"
            data-testid="login-submit-btn"
            disable={ !validatePassword() || !validateEmail() }
          >
            Entrar
          </Button>
        </fieldset>
      </form>
    </main>
  );
}

export default Login;
