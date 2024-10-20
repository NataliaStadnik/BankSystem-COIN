import { createHistoryPage } from './createHistoryPage';
import { mount } from 'redom';
import { doubleBarChart } from '../../utilits/barChart/doubleBarChart.js';
import { deleteLoader } from '../../components/loader';
import { getOneAccount } from '../../api/getRequest';
import { Pagination } from '../../utilits/Pagination.js';
import { createTableRow } from '../../components/tableRow.js';
import { createChangeBlocksBtn } from '../../components/changeBlocksBtn.js';

export class History {
  oneAccount;
  rowsCount = 25;

  constructor(idAccount, callBackChangeState) {
    this.idAccount = idAccount;
    this.callBackChangeState = callBackChangeState;
    this.start();
  }

  start() {
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

  addAction() {
    this.returnBack();
    this.changeBlocks();
  }

  async fetchData() {
    await getOneAccount(this.idAccount).then((response) => {
      this.oneAccount = response;
    });
  }

  render() {
    const main = createHistoryPage(this.oneAccount, this.rowsCount);
    mount(window.document.body, main);
    doubleBarChart(this.oneAccount.transactions, 12, this.idAccount);

    const transactCount = this.oneAccount.transactions.length;
    if (transactCount > this.rowsCount) {
      new Pagination(this.oneAccount);
    } else {
      const rows = createTableRow(
        this.oneAccount.transactions,
        this.idAccount,
        transactCount,
      );
      document.getElementsByClassName('body')[0].append(...rows);
    }
    createChangeBlocksBtn();
    this.addAction();
  }

  returnBack() {
    document.getElementById('back-return').addEventListener('click', (e) => {
      e.preventDefault();
      this.callBackChangeState('oneCard', this.oneAccount.account);
    });
  }

  changeBlocks() {
    const btn = document.getElementsByClassName('change-btn')[0];
    btn.addEventListener('click', () => {
      const block = document.getElementsByClassName('blocks')[0];
      const dinamicUpper = document.getElementsByClassName('dinamic__upper')[0];
      const history = document.getElementsByClassName('history')[0];
      const dinamicBottom =
        document.getElementsByClassName('dinamic__bottom')[0];

      if (block.firstChild.classList[1] === 'dinamic__upper') {
        block.lastChild.classList[1] === 'history'
          ? block.insertBefore(dinamicBottom, dinamicUpper)
          : block.insertBefore(history, dinamicUpper);
      } else if (block.firstChild.classList[1] === 'dinamic__bottom') {
        if (block.lastChild.classList[1] === 'history') {
          block.insertBefore(history, dinamicUpper);
        } else if (block.lastChild.classList[1] === 'dinamic__upper') {
          block.insertBefore(history, dinamicBottom);
        }
      } else {
        block.insertBefore(dinamicBottom, history);
        block.insertBefore(dinamicUpper, dinamicBottom);
      }
    });
  }
}
