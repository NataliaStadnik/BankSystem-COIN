/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('check header', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('#log').click();
  });

  it('check buttons', () => {
    cy.get('.nav__list li').should('have.length', 4);
    cy.contains('Счета').should('have.class', 'nav__btn--current');

    cy.contains('Банкоматы').click().should('have.class', 'nav__btn--current');
    cy.contains('Счета').should('not.have.class', 'nav__btn--current');
    cy.get('.map').should('exist');

    cy.contains('Счета').click().should('have.class', 'nav__btn--current');
    cy.contains('Банкоматы').should('not.have.class', 'nav__btn--current');
    cy.get('.accounts').should('exist');

    cy.contains('Валюта').click().should('have.class', 'nav__btn--current');
    cy.contains('Счета').should('not.have.class', 'nav__btn--current');
    cy.get('.currency').should('exist');

    cy.contains('Выйти').click().should('have.class', 'nav__btn--current');
    cy.contains('Счета').should('not.have.class', 'nav__btn--current');
    cy.get('.login-wrap').should('exist');
  });
});
