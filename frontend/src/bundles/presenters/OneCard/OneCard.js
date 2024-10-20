import { getOneAccount } from '../../api/getRequest';
import { createOneCardPage } from './createOneCardPage';
import { mount, unmount } from 'redom';
import { addErrorMessage, hasError } from '../../utilits/ addErrorMessage';
import { transferFunds } from '../../api/postRequest';
import { setLocalStorage } from '../../utilits/setLocalStorage';
import { createSelectFrame } from '../../components/selectFrame';
import { deleteLoader } from '../../components/loader';
import { oneBarChart } from '../../utilits/barChart/oneBarChart';
import { createChangeBlocksBtn } from '../../components/changeBlocksBtn';
import { cardValidation } from '../../utilits/cardValidation';

export class OneCard {
  oldAcc = JSON.parse(localStorage.account);
  oneAccount;
  inputs;
  mainRender;

  constructor(idAccount, callBackChangeState) {
    this.idAccount = idAccount;
    this.callBackChangeState = callBackChangeState;
    this.start();
  }

  async start() {
    this.fetchData()
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

  async fetchData() {
    await getOneAccount(this.idAccount).then((response) => {
      this.oneAccount = response;
    });
  }

  render() {
    this.mainRender = createOneCardPage(
      this.oneAccount.account,
      this.oneAccount.balance,
      this.oneAccount.transactions,
    );

    while (document.body.childElementCount !== 1) {
      document.body.lastChild.remove();
    }

    mount(window.document.body, this.mainRender);
    createChangeBlocksBtn();
    this.addAction();
    oneBarChart(this.oneAccount.transactions, 6, this.idAccount);
  }

  addAction() {
    this.blockClick('history');
    this.blockClick('dinamic');
    this.inputAccountInField();
    this.chooseAccountClick();
    this.transferFund();
    this.returnBack();
    this.changeBlocks();
  }

  returnBack() {
    document.getElementById('back-return').addEventListener('click', (e) => {
      e.preventDefault();
      this.callBackChangeState('accounts');
    });
  }

  blockClick(txt) {
    const block = document.getElementsByClassName(txt)[0];
    block.addEventListener('click', () => {
      this.openHistory();
    });
    block.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        this.openHistory();
      }
    });
  }

  openHistory() {
    unmount(document.body, this.mainRender);
    this.callBackChangeState('history', this.idAccount);
  }

  chooseAccountClick() {
    const btnChooce = document.getElementsByClassName('choose-btn')[0];
    btnChooce.addEventListener('click', (e) => {
      e.preventDefault();
      const btnChooce = document.getElementsByClassName('choose-btn')[0];
      btnChooce.classList.toggle('choose-click');
      this.createModal(this.oldAcc);
    });
  }

  createModal(arr) {
    const btnWrap = document.getElementsByClassName('btn-wrap')[0];
    if (btnWrap.lastChild.id === 'sort') {
      mount(btnWrap, createSelectFrame(arr));
      this.chooseSorting(btnWrap);
    } else {
      unmount(btnWrap, btnWrap.lastChild);
    }
  }

  chooseSorting(wrap) {
    const btnSortVersion = document.getElementsByClassName('select-list__btn');
    for (let i = 0; i < btnSortVersion.length; i++) {
      btnSortVersion[i].addEventListener('click', (e) => {
        e.preventDefault();
        this.inputs[0].value = e.target.textContent;
        cardValidation(e.target.textContent);
        unmount(wrap, wrap.lastChild);
        wrap.lastChild.classList.remove('choose-click');
        hasError(this.inputs[0]);
      });
    }
  }

  inputAccountInField() {
    const form = document.getElementsByClassName('order')[0];
    this.inputs = form.getElementsByTagName('input');

    [this.inputs[0], this.inputs[1]].forEach((elem) => {
      elem.addEventListener('input', () => {
        hasError(elem);
      });
    });

    this.inputs[0].addEventListener('input', (e) => {
      const filterArr = this.oldAcc.filter((elem) => {
        return elem.startsWith(e.target.value);
      });

      const isFrame = document.body.getElementsByClassName('frame')[0];
      if (isFrame !== undefined) {
        isFrame.remove();
      }
      if (filterArr.length !== 0) {
        this.createModal(filterArr);
      }
      cardValidation(e.target.value);
    });
  }

  transferFund() {
    const form = document.getElementsByClassName('order')[0];
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const state = this.validateBeforeTranfer();

      if (state) {
        const fundObj = {
          from: this.idAccount,
          to: this.inputs[0].value,
          amount: this.inputs[1].value,
        };

        await transferFunds(fundObj)
          .then(() => {
            setLocalStorage(fundObj.to);
            this.start();
          })
          .catch((error) => {
            setTimeout(() => {
              deleteLoader();
              error.message === 'Overdraft prevented'
                ? addErrorMessage('Недостаточно денег на счету', this.inputs[1])
                : error.message === 'Invalid account to'
                  ? addErrorMessage(
                      'Данного счета не существует',
                      this.inputs[0],
                    )
                  : addErrorMessage('error.message', this.inputs[0]);
            }, 600);
          });
      }
    });
  }

  validateBeforeTranfer() {
    let flags = [];

    [this.inputs[0], this.inputs[1]].forEach((elem) => {
      if (!elem.value.trim()) {
        addErrorMessage('Введите данные', elem);
      } else {
        flags.push(true);
      }
    });

    if (this.inputs[1].value.trim().startsWith('-')) {
      addErrorMessage('Сумма не может быть отрицательной', this.inputs[1]);
    } else {
      flags.push(true);
    }
    return flags.length === 3 ? true : false;
  }

  changeBlocks() {
    const btn = document.getElementsByClassName('change-btn')[0];
    btn.addEventListener('click', () => {
      const blocksUpper = document.getElementsByClassName('blocks__upper')[0];
      const order = document.getElementsByClassName('order')[0];
      const dinamic = document.getElementsByClassName('dinamic')[0];
      const history = document.getElementsByClassName('history')[0];
      const block = document.getElementsByClassName('blocks')[0];

      if (block.firstChild.classList[0] === 'blocks__upper') {
        blocksUpper.firstChild.classList[0] === 'form'
          ? blocksUpper.insertBefore(dinamic, order)
          : block.insertBefore(history, blocksUpper);
      } else {
        blocksUpper.firstChild.classList[0] === 'dinamic'
          ? blocksUpper.insertBefore(order, dinamic)
          : block.insertBefore(blocksUpper, history);
      }
    });
  }
}
