/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('check currency Change', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('#log').click();
    cy.contains('Валюта').click();
  });

  it('check buttons', () => {
    cy.get('.currency').should('exist');
    cy.get('.change-btn').click();

    cy.contains('BTC').click().should('have.class', 'choose-click');
    cy.get('.frame').should('exist');
    cy.contains('AUD').click();
    cy.contains('AUD').should('not.have.class', 'choose-click');
    cy.get('.frame').should('not.exist');

    cy.contains('ETH').click().should('have.class', 'choose-click');
    cy.get('.frame').should('exist');
    cy.contains('BYR').click();
    cy.contains('BYR').should('not.have.class', 'choose-click');
    cy.get('.frame').should('not.exist');

    cy.get('#sums').type('1');
    cy.contains('Обменять').click();
    cy.get('#sums').should('be.empty');
  });
});
