import { createOneCard } from '../src/bundles/presenters/AllCard/createOneCard';
import { createAccountsPage } from '../src/bundles/presenters/AllCard/createAccountsPage';
import { arrAccounts } from '../mockDatas/accountsMock';

describe('Check one card and Accounts page render', () => {
  const card = createOneCard(
    arrAccounts[0].account,
    arrAccounts[0].balance,
    arrAccounts[0].transactions.date,
  );

  it('is correct render one card', () => {
    expect(card).toBeInstanceOf(HTMLLIElement);
    expect(
      card.outerHTML.includes(
        `<button class=" btn-reset btn card__btn" id="${arrAccounts[0].account}">Открыть</button>`,
      ),
    ).toBeTruthy();
    expect(
      card.outerHTML.includes(
        `<span class=" number">${arrAccounts[0].account}</span>`,
      ),
    ).toBeTruthy();
    expect(
      card.outerHTML.includes(
        `<span class=" sum">${arrAccounts[0].balance} ₽</span>`,
      ),
    ).toBeTruthy();
  });

  it('is correct render Accounts page', () => {
    const page = createAccountsPage(arrAccounts);
    expect(page).toBeInstanceOf(HTMLElement);
    expect(card.outerHTML.includes(card.outerHTML)).toBeTruthy();
  });
});
