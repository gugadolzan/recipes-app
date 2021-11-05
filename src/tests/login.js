import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Ultilis/renderWhihRouter';
import App from '../App';

const TOKEN_KEY_MEALS = 'mealsToken';
const TOKEN_KEY_COCKTAILS = 'cocktailsToken';
const TOKEN_KEY_EMAIL = 'email';

describe('2 - [TELA DE LOGIN] Verifica todos os elementos que devem respeitar'
+ 'os atributos descritos no protótipo para a tela de login', () => {
  it('O input de email deve possuir o atributo data-testid="email-input";', () => {
    renderWithRouter(<App />);

    // const inputEmail = screen.getByTestId('email-input');
    // expect(inputEmail).should()
  });
});

describe('3 - [TELA DE LOGIN] Deve conseguir escrever um e-mail', () => {
  it('É possível escrever o email', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });
});

describe('4 - [TELA DE LOGIN] Deve conseguir coloar um password', () => {
  it('É possível escrever o password', () => {
    renderWithRouter(<App />);

    const passwordInput = screen.getByTestId('password-inpu');
    expect(passwordInput).toBeInTheDocument();
  });
});

describe('5 - [TELA DE LOGIN] O formulário só pode ser válido após um email válido'
+ 'e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe('alguem@alguem.com');

    const buttonLogin = screen.getByRole('button', {
      name: 'Login',
    });

    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toDisabled();

    userEvent.type(emailInput, 'm');
    expect(emailInput.value).toBe('Nam');
    expect(loginSubmitButton).toBeDisable();
  });

  it('O botão Login deve estar desativado com menos 6 caracteres na senha', () => {
    renderWithRouter(<App />);

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.value).toBe('');

    const buttonLogin = screen.getByRole('button', {
      name: 'Login',
    });

    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toDisabled();

    userEvent.type(passwordInput, 'N');
    expect(passwordInput.value).toBe('p');
    expect(buttonLogin).toBeDisabled();

    userEvent.type(passwordInput, 'a');
    expect(loginNameInput.value).toBe('pa');
    expect(buttonLogin).toBeDisabled();

    userEvent.type(passwordInput, 'm');
    expect(loginNameInput.value).toBe('pas');
    expect(buttonLogin).toBeDisable();

    userEvent.type(passwordInput, 'm');
    expect(loginNameInput.value).toBe('pass');
    expect(buttonLogin).toBeDisable();

    userEvent.type(passwordInput, 'm');
    expect(loginNameInput.value).toBe('passw');
    expect(buttonLogin).toBeDisable();

    userEvent.type(passwordInput, 'e');
    expect(loginNameInput.value).toBe('passwo');
    expect(buttonLogin).toBeEnabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput.value).toBe('alguem@alguem.com');

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput.value).toBe('passwo');

    const buttonLogin = screen.getByRole('button', {
      name: 'Login',
    });

    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(passwordInput, 'password');
    expect(buttonLogin).toBeEnabled();
  });
});

// describe('6 - [TELA DE LOGIN] Salvar 2 tokens no localStorage após submissão', () => {
//   it('Entra na app salvando um token do usuario', () => {
//     renderWithRouter(<App />);

//     const emailInput = screen.getByTestId('email-input');
//     userEvent.type(emailInput, 'alguem@alguem.com');

//     const passwordInput = screen.getByTestId('password-input');
//     userEvent.type(passwordInput, 'password');

//     expect(localStorage.getItem(TOKEN_KEY_MEALS));
//     expect(localStorage).getItem(TOKEN_KEY_COCKTAILS);
//   });
// });

describe('7 - [TELA DE LOGIN] Salve o e-mail da pessoa usuária no'
+ 'localStorage na chave user após a submissão', () => {
  it('Salve o -email no localStorage com na chave e-mail', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'alguem@alguem.com');

    expect(localStorage.getItem(TOKEN_KEY_EMAIL));
  });
});

describe('8 - [TELA DE LOGIN] Ao clicar Redirecione a pessoa usuária para a tela'
+ 'principal de receitas de comidas', () => {
  it('Ao clicar direciona para a tela de Receitas', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', {
      name: 'Login',
    });

    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(passwordInput, 'password');
    userEvent.click(buttonLogin);

    expect(window.location.pathname).toBe('/comidas');
  });
});
