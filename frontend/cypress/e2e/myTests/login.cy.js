/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('check login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check login', () => {
    cy.get('#login')
      .should('be.empty')
      .click()
      .should('be.focused')
      .type('qw')
      .should('have.value', 'qw');
    cy.get('#log').should('be.enabled').click();
    cy.get('#login').should('have.class', 'error--red');
    cy.get('#password').should('have.class', 'error--red');
    cy.contains('Минимально количество символов: 6').should('exist');
    cy.get('#login')
      .type('qwe')
      .should('not.have.class', 'error--red')
      .clear()
      .should('have.value', '')
      .type('qwerty');
    cy.get('#log').click();
    cy.get('#login')
      .should('not.have.class', 'error--red')
      .clear()
      .type('qw erty');
    cy.get('#log').click();
    cy.get('#login').should('have.class', 'error--red');
    cy.contains('Пробелы недопустимы').should('exist');
  });

  it('check password', () => {
    cy.get('#password')
      .should('be.empty')
      .click()
      .should('be.focused')
      .type('qw')
      .should('have.value', 'qw');
    cy.get('#log').should('be.enabled').click();
    cy.get('#login').should('have.class', 'error--red');
    cy.get('#password').should('have.class', 'error--red');
    cy.contains('Минимально количество символов: 6').should('exist');
    cy.get('#password')
      .type('qwe')
      .should('not.have.class', 'error--red')
      .clear()
      .should('have.value', '')
      .type('qwerty');
    cy.get('#log').click();
    cy.get('#password')
      .should('not.have.class', 'error--red')
      .clear()
      .type('qw erty');
    cy.get('#log').click();
    cy.get('#password').should('have.class', 'error--red');
    cy.contains('Пробелы недопустимы').should('exist');
  });

  it('check invalid login and password', () => {
    cy.get('#login').type('qwerty');
    cy.get('#password').type('qwerty');
    cy.get('#log').click();
    cy.contains('Пользователя с таким логином не существует').should('exist');
    cy.get('#login')
      .should('have.class', 'error--red')
      .clear()
      .should('not.have.class', 'error--red')
      .type('developer');
    cy.get('#log').click();
    cy.contains('Неверный пароль').should('exist');
    cy.get('#password')
      .should('have.class', 'error--red')
      .clear()
      .should('not.have.class', 'error--red')
      .type('skillbox');
    cy.get('#log').click();
  });

  it('check valid login and password', () => {
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('#log').click();
    cy.get('.accounts').should('exist');
  });
});
