import { createLoginForm } from '../src/bundles/presenters/Login/createLoginForm';
import { renderLoginPage } from '../src/bundles/presenters/Login/renderLoginPage';

describe('Check render login-page and login-form', () => {
  const inputs = (txt, st) => {
    return `<input id="${txt}" class=" input-reset input" type="${st}" placeholder="Placeholder">`;
  };
  const form = createLoginForm();

  it('is correct render', () => {
    expect(form).toBeInstanceOf(HTMLElement);
  });

  it('is correct content', () => {
    expect(form.outerHTML.includes(inputs('login', 'text'))).toBeTruthy();
    expect(
      form.outerHTML.includes(inputs('password', 'password')),
    ).toBeTruthy();
    expect(
      form.outerHTML.includes(
        '<button class=" btn-reset btn" type="submit" id="log">Войти</button>',
      ),
    ).toBeTruthy();
  });

  it('is correct render login-page', () => {
    const page = renderLoginPage();
    expect(page).toBeInstanceOf(HTMLElement);
    expect(page.outerHTML.includes(form.outerHTML)).toBeTruthy();
  });
});
