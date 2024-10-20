import { setChildren, unmount } from 'redom';
import { createHeader } from '../../components/createHeader';
import { renderLoginPage } from './renderLoginPage';
import { loginInApp } from '../../api/postRequest';
import { addErrorMessage, hasError } from '../../utilits/ addErrorMessage';
import { App } from '../App/App';
import { deleteLoader } from '../../components/loader';

export class Login {
  inputPassword;
  inputLogin;
  token = sessionStorage.getItem('token');
  formLog = document.getElementsByClassName('form__login');
  header = createHeader();
  loginRender = renderLoginPage();
  logObj = {
    login: '',
    password: '',
  };

  constructor() {
    this.checkIsLogin();
  }

  async checkIsLogin() {
    try {
      if (this.token) {
        this.updatePage();
        new App('accounts');
      } else {
        setChildren(window.document.body, [this.header, this.loginRender]);
        this.login();
        this.inputsChange();
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  inputsChange() {
    [this.inputPassword, this.inputLogin].forEach((elem) => {
      elem.addEventListener('input', () => {
        hasError(elem);
      });
    });
  }

  login() {
    this.inputPassword = document.getElementById('password');
    this.inputLogin = document.getElementById('login');

    this.formLog[0].addEventListener('submit', async (e) => {
      e.preventDefault();
      const state = this.validateBeforeLogin();

      if (state) {
        this.logObj.login = this.inputLogin.value;
        this.logObj.password = this.inputPassword.value;
        this.fetchLogin();
      }
    });
  }

  async fetchLogin() {
    await loginInApp(this.logObj)
      .then((resp) => {
        if (resp?.token) {
          sessionStorage.setItem('token', resp.token);
          this.updatePage();
          new App('accounts');
        }
      })
      .catch((error) => {
        setTimeout(() => {
          deleteLoader();
          error.message === 'Invalid password'
            ? addErrorMessage('Неверный пароль', this.inputPassword)
            : error.message === 'No such user'
              ? addErrorMessage(
                  'Пользователя с таким логином не существует',
                  this.inputLogin,
                )
              : null;
        }, 500);
      });
  }

  validateBeforeLogin() {
    let flags = [];
    [this.inputPassword, this.inputLogin].forEach((elem) => {
      if (!elem.value.trim() || elem.value.length < 6) {
        addErrorMessage('Минимально количество символов: 6', elem);
      } else if (elem.value.includes(' ')) {
        addErrorMessage('Пробелы недопустимы', elem);
      } else {
        flags.push(true);
      }
    });
    return flags.length === 2 ? true : false;
  }

  updatePage() {
    deleteLoader();
    unmount(document.body, this.loginRender);
    unmount(document.body, this.header);
  }
}
