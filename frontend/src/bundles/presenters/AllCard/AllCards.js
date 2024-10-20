import { mount, unmount } from 'redom';
import { createAccountsPage } from './createAccountsPage';
import { getAccounts } from '../../api/getRequest';
import { createAccount } from '../../api/postRequest';
import { createSelectFrame } from '../../components/selectFrame';
import { sortArray } from '../../utilits/sortArray';
import { deleteLoader } from '../../components/loader';
import { setLocalStorage } from '../../utilits/setLocalStorage';

export class AllCards {
  createBTN;
  sortBTN;
  allAccounts;
  isChosenSorting = '';
  idCount;
  sortState = '';

  arrChoice = {
    account: 'По номеру',
    date: 'По последней транзакции',
    balance: 'По балансу',
  };

  constructor(callBackChangeState) {
    this.startPage();
    this.callBackChangeState = callBackChangeState;
  }

  startPage() {
    this.fetchDatas()
      .then(() => {
        setTimeout(() => {
          deleteLoader();
          this.render();
        }, 600);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  async fetchDatas() {
    this.allAccounts = await getAccounts();
    this.allAccounts.map((elem) => {
      setLocalStorage(elem.account);
    });
  }

  render() {
    this.accounts = createAccountsPage(this.allAccounts);
    const counter = document.body.children.length;

    if (counter === 1) {
      mount(window.document.body, this.accounts);
    } else if (counter === 2) {
      document.body.lastChild.replaceWith(this.accounts);
      this.sortState
        ? (document.getElementById('select-btn').textContent = this.sortState)
        : null;
    }
    this.addAction();
  }

  addAction() {
    this.clickCreateNewAccount();
    this.clickSort();
    this.clickOpenCard();
  }

  clickCreateNewAccount() {
    this.createBTN = document.getElementById('create-btn');
    this.createBTN.addEventListener('click', async (e) => {
      e.preventDefault();
      await createAccount()
        .then(() => {
          this.startPage();
        })
        .catch((err) => {
          console.log(err.message)
        })
    });
  }

  clickOpenCard() {
    const btnsOpen = document.getElementsByClassName('card__btn');
    for (let i = 0; i < btnsOpen.length; i++) {
      btnsOpen[i].addEventListener('click', () => {
        this.idCount = btnsOpen[i].id;
        this.callBackChangeState('oneCard', this.idCount);
      });
    }
  }

  clickSort() {
    this.sortBTN = document.getElementsByClassName('input__select')[0];
    this.sortBTN.addEventListener('click', (e) => {
      e.preventDefault();
      this.sortBTN.classList.toggle('choose-click');

      const btnWrap = document.getElementsByClassName('btn-wrap')[0];
      if (btnWrap.children.length === 1) {
        mount(btnWrap, createSelectFrame(this.arrChoice));
        this.sortBTN.textContent = 'Сортировка';

        if (this.isChosenSorting) {
          const target =
            btnWrap.getElementsByTagName('button')[this.isChosenSorting];
          target.classList.toggle('select-list__btn--click');
        }
        this.clickHowSort(btnWrap);
      } else {
        unmount(btnWrap, btnWrap.lastChild);
      }
    });
  }

  clickHowSort() {
    const btnSortVersion = document.getElementsByClassName('select-list__btn');
    for (let i = 0; i < btnSortVersion.length; i++) {
      btnSortVersion[i].addEventListener('click', () => {
        this.isChosenSorting = i + 1;
        this.sortState = btnSortVersion[i].textContent;
        this.allAccounts = sortArray(this.allAccounts, btnSortVersion[i].id);
        this.render();
      });
    }
  }
}
