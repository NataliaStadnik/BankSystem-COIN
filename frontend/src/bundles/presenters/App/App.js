import { AllCards } from '../AllCard/AllCards';
import { OneCard } from '../OneCard/OneCard';
import { MapPage } from '../MapPage/MapPage';
import { Currency } from '../Currency/Currency';
import { mount } from 'redom';
import { createHeaderWithButtons } from '../../components/createHeaderWithButtons';
import { History } from '../History/History';
import { Login } from '../Login/Login';

export class App {
  socket;
  map;

  constructor(state) {
    this.state = state;
    this.header = createHeaderWithButtons();
    this.render();
  }

  render() {
    mount(document.body, this.header);
    App.mainRender(this.state);
    this.actions();
  }

  static mainRender(newState, param = null) {
    try {
      if (this.map?.myMap) {
        this.map?.myMap.destroy();
      }

      if (this.socket?.socket.readyState === 1) {
        this.socket.socket.close();
      }
    }
    catch (err) {
      console.log(err.message)
    }

    while (document.body.children.length !== 1) {
      document.body.lastChild.remove();
    }

    const isActive = document.getElementsByClassName('nav__btn--current');
    if (isActive.length === 1) {
      isActive[0].classList.remove('nav__btn--current');
    }

    this.state = newState;
    if (['atm', 'accounts', 'currency', 'quit'].includes(this.state)) {
      document.getElementById(this.state).classList.add('nav__btn--current');
    }

    switch (this.state) {
      case 'accounts': {
        new AllCards(App.mainRender);
        break;
      }
      case 'oneCard': {
        new OneCard(param, App.mainRender);
        break;
      }
      case 'atm': {
        this.map = new MapPage();
        break;
      }
      case 'currency': {
        this.socket = new Currency();
        break;
      }
      case 'history': {
        new History(param, App.mainRender);
        break;
      }
      case 'quit': {
        sessionStorage.removeItem('token');
        new Login();
        break;
      }
    }
  }

  actions() {
    const btns = document.getElementsByClassName('nav__btn');
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', () => {
        App.mainRender(btns[i].id);
      });
    }
  }
}
