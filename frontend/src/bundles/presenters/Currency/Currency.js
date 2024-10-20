import { mount, unmount } from 'redom';
import { createCurrencyPage } from './createCurrencyPage';
import { allCurrencies, myCurrencies } from '../../api/getRequest';
import { createMyCurrencies } from './createMyCurrencies';
import { createSelectFrame } from '../../components/selectFrame';
import { addErrorMessage, hasError } from '../../utilits/ addErrorMessage';
import { buyCurrency } from '../../api/postRequest';
import { openWebSocket } from '../../api/webSocket';
import { deleteLoader } from '../../components/loader';
import { createChangeBlocksBtn } from '../../components/changeBlocksBtn';

export class Currency {
  allCurrencies;
  myCurrencies;
  btnFromTo;
  sumsInput;
  from;
  to;
  socket;

  constructor() {
    this.startPage();
  }

  startPage() {
    this.fetchMyCurrencies()
      .then(() => {
        setTimeout(() => {
          deleteLoader();
          this.render();
          this.socket = openWebSocket();
          this.addAction();
        }, 600);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  addAction() {
    this.clickChangeTransfer();
    this.transferSubmit();
    this.changeBlocks();
  }

  async fetchAllCurrencies() {
    try {
      this.allCurrencies = await allCurrencies();
    }
    catch(err) {
      console.log(err.message)
    }
  }

  async fetchMyCurrencies() {
    try {
      this.myCurrencies = await myCurrencies();
    }
    catch(err) {
      console.log(err.message)
    }
  }

  render() {
    const renderMyCurrencies = createMyCurrencies(this.myCurrencies);
    window.document.body.childElementCount === 2
      ? window.document.body.lastChild.remove()
      : null;

    const renderPage = createCurrencyPage(renderMyCurrencies);
    mount(window.document.body, renderPage);
    createChangeBlocksBtn();
  }

  transferSubmit() {
    const form = document.getElementsByClassName('dinamic__form')[0];

    this.sumsInput = document.getElementById('sums');
    this.sumsInput.addEventListener('input', () => {
      hasError(this.sumsInput);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const state = this.validateBeforeTranfer();

      if (state) {
        const fundObj = {
          from: this.from,
          to: this.to,
          amount: this.sumsInput.value,
        };

        await buyCurrency(fundObj)
          .then(() => {
            this.socket.close();
            this.startPage();
          })
          .catch((error) => {
            setTimeout(() => {
              deleteLoader();
              error.message === 'Overdraft prevented'
                ? addErrorMessage('Недостаточно денег на счету', this.sumsInput)
                : error.message === 'Not enough currency'
                  ? addErrorMessage(
                      'На валютном счёте списания нет средств',
                      this.sumsInput,
                    )
                  : addErrorMessage(
                      'передан неверный валютный код',
                      this.sumsInput,
                    );
            }, 600);
          });
      }
    });
  }

  validateBeforeTranfer() {
    if (!this.sumsInput.value.trim()) {
      addErrorMessage('Введите данные', this.sumsInput);
    } else if (this.sumsInput.value.trim().startsWith('-')) {
      addErrorMessage('Сумма не может быть отрицательной', this.sumsInput);
    } else {
      return true;
    }
  }

  clickChangeTransfer() {
    this.btnFromTo = document.getElementsByClassName('choose');
    for (let i = 0; i < this.btnFromTo.length; i++) {
      this.btnFromTo[i].addEventListener('click', (e) => {
        e.preventDefault();
        this.btnFromTo[i].classList.toggle('choose-click');

        const btnWrap = document.getElementsByClassName('btn-wrap')[i];
        if (btnWrap.children.length === 1) {
          mount(btnWrap, createSelectFrame(Object.keys(this.myCurrencies)));
          this.clickChooceFrom(btnWrap, i);
        } else {
          unmount(btnWrap, btnWrap.lastChild);
        }
      });
    }
  }

  clickChooceFrom(wrap, index) {
    const btnsChooceFrom = document.getElementsByClassName('select-list__btn');
    for (let i = 0; i < btnsChooceFrom.length; i++) {
      btnsChooceFrom[i].addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          this.btnFromTo[index].textContent = btnsChooceFrom[i].textContent;
          index === 0
            ? (this.from = btnsChooceFrom[i].textContent)
            : (this.to = btnsChooceFrom[i].textContent);
          unmount(wrap, wrap.lastChild);
          this.btnFromTo[index].classList.toggle('choose-click');
        },
        {
          onse: true,
        },
      );
    }
  }

  changeBlocks() {
    const btn = document.getElementsByClassName('change-btn')[0];
    btn.addEventListener('click', () => {
      const leftPart = document.getElementsByClassName('left-part')[0];
      const order = document.getElementsByClassName('dinamic__form')[0];
      const dinamic = document.getElementsByClassName('currency__dinamic')[0];
      const history = document.getElementsByClassName('dinamic-block')[0];
      const block = document.getElementsByClassName('wrapper')[0];

      if (block.firstChild.classList[0] === 'left-part') {
        leftPart.firstChild.classList[1] === 'currency__dinamic'
          ? leftPart.insertBefore(order, dinamic)
          : block.insertBefore(history, leftPart);
      } else {
        leftPart.firstChild.classList[1] === 'dinamic__form'
          ? leftPart.insertBefore(dinamic, order)
          : block.insertBefore(leftPart, history);
      }
    });
  }
}
