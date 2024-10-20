/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('check one Card', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('#log').click();
    cy.contains('Открыть').click();
  });

  it('check buttons', () => {
    cy.contains('Счета').should('not.have.class', 'nav__btn--current');
    cy.get('.details').should('exist');

    cy.get('.history').click();
    cy.get('.history-section').should('exist');
    cy.get('.change-btn').click();
    cy.contains('Вернуться назад').click();

    cy.get('.dinamic').click();
    cy.get('.history-section').should('exist');
    cy.contains('Вернуться назад').click();

    cy.get('.change-btn').click();
    cy.contains('Вернуться назад').click();
    cy.contains('Счета').should('have.class', 'nav__btn--current');
    cy.get('.accounts').should('exist');
  });

  it('check field "sum" in form', () => {
    cy.get('#sum')
      .should('not.have.class', 'error--red')
      .click()
      .should('be.focused')
      .type('22')
      .should('have.value', '22');
    cy.contains('Отправить').click();
    cy.get('#sum').should('not.have.class', 'error--red').clear().type('-22');
    cy.contains('Отправить').click();
    cy.get('#sum').should('have.class', 'error--red');
    cy.contains('Сумма не может быть отрицательной').should('exist');
  });

  it('check field "to" in form', () => {
    cy.get('#to')
      .should('not.have.class', 'error--red')
      .click()
      .should('be.focused')
      .type('  ');
    cy.contains('Отправить').click();
    cy.get('#to').should('have.class', 'error--red');
    cy.contains('Введите данные').should('exist');
  });

  it('check submit', () => {
    cy.contains('Отправить').click();
    cy.contains('Введите данные').should('exist');
    cy.get('.error').should('exist');
    cy.get('#to')
      .type('7')
      .should('have.value', '7')
      .should('not.have.class', 'error--red');
    cy.get('.frame').should('exist');
    cy.get('.select-list__btn:first').click();
    cy.get('.frame').should('not.exist');

    cy.get('#sum').type('1').should('not.have.class', 'error--red');
    cy.contains('Отправить').click();

    cy.get('#to').should('be.empty');
    cy.get('#sum').should('be.empty');
  });
});
