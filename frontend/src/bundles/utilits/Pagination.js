import { createPagination } from '../components/pagination';
import { createTableRow } from '../components/tableRow';

export class Pagination {
  arrowsBtn = document.getElementsByClassName('pagination__arrow');
  firstNumber;
  renderedNumbers = 0;
  defaultPagesCount = 6;

  statePage;
  backState = 0;

  constructor(account) {
    this.idAccount = account.account;
    this.allTransactions = account.transactions;
    this.maxCount = Math.ceil(this.allTransactions.length / 25);
    this.start();
  }

  start() {
    this.renderPagination();
    this.updateState(this.firstNumber);
    this.clickOnPage();
    this.clickOnDots();
    this.clickOnRightArrow();
    this.clickOnLeftArrow();
  }

  renderPagination() {
    let count;
    if (this.renderedNumbers + this.defaultPagesCount < this.maxCount) {
      count = this.defaultPagesCount;
    } else if (this.renderedNumbers + this.defaultPagesCount >= this.maxCount) {
      count = this.maxCount - this.renderedNumbers;
    }

    if (this.renderedNumbers === 0) {
      this.firstNumber = 1;
    } else {
      this.firstNumber += this.defaultPagesCount;
    }

    const render = createPagination(this.firstNumber, count);
    const isSectionPaginat = document.getElementsByClassName('pagination');
    if (isSectionPaginat.length === 1) {
      isSectionPaginat[0].remove();
    }
    document.getElementsByClassName('history')[0].append(render);
    this.renderedNumbers += count;
  }

  updateState(newState) {
    document
      .getElementById(this.statePage)
      ?.classList.remove('pagination__btn--active');

    if (this.backState === 0) {
      this.statePage = newState;
    } else {
      this.statePage = this.backState;
    }
    this.backState = 0;

    document
      .getElementById(this.statePage)
      ?.classList.add('pagination__btn--active');
    this.renderTable();
  }

  clickOnPage() {
    const btnPagination = document.getElementsByClassName('pagination__btn');
    for (let i = 0; i < btnPagination.length; i++) {
      btnPagination[i].addEventListener('click', () => {
        this.updateState(parseInt(btnPagination[i].id));
      });
    }
  }

  clickOnDots() {
    const btnDots = document.getElementsByClassName('pagination__dots');
    btnDots[0]?.addEventListener('click', () => {
      this.start();
    });
  }

  clickOnRightArrow() {
    this.arrowsBtn[1].addEventListener('click', () => {
      const newState = this.statePage + 1;
      if (newState <= this.renderedNumbers) {
        this.updateState(newState);
      } else if (newState <= this.maxCount) {
        this.start();
      }
    });
  }

  clickOnLeftArrow() {
    this.arrowsBtn[0].addEventListener('click', () => {
      const newState = this.statePage - 1;
      if (this.statePage > this.firstNumber) {
        this.updateState(newState);
      } else if (this.statePage !== 1) {
        this.renderedNumbers -= parseInt(
          document.getElementsByClassName('pagination__btn').length * 2,
        );
        this.firstNumber -= this.defaultPagesCount * 2;
        this.backState = newState;
        this.start();
      }
    });
  }

  renderTable() {
    const index = this.statePage === 1 ? 0 : this.statePage * 25 - 25;
    const count =
      this.statePage * 25 < this.allTransactions.length
        ? 25
        : this.allTransactions.length - (this.statePage - 1) * 25;

    const rows = createTableRow(
      this.allTransactions,
      this.idAccount,
      count,
      index,
    );

    while (document.getElementsByClassName('body')[0].childElementCount !== 0) {
      document.getElementsByClassName('body')[0].lastChild.remove();
    }
    document.getElementsByClassName('body')[0].append(...rows);
  }
}
