/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('check history Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('#log').click();
    cy.contains('Открыть').first().click();
    cy.get('.history').click();
  });

  it('check buttons', () => {
    cy.get('.history-section').should('exist');
    cy.contains('Вернуться назад').click();
    cy.get('.dinamic').click();
    cy.get('.change-btn').click();

    cy.get('.pagination__btn').first().should('have.id', 1);
    cy.get('#1').should('have.class', 'pagination__btn--active');
    cy.get('#2').click().should('have.class', 'pagination__btn--active');
    cy.get('#1').should('not.have.class', 'pagination__btn--active');

    cy.get('.pagination__arrow').first().click();
    cy.get('#1').should('have.class', 'pagination__btn--active');
    cy.get('#2').should('not.have.class', 'pagination__btn--active');
    cy.get('.pagination__arrow').last().click();
    cy.get('#1').should('not.have.class', 'pagination__btn--active');
    cy.get('#2').should('have.class', 'pagination__btn--active');

    cy.get('.pagination__dots').click();
    cy.get('.pagination__btn').first().should('have.id', 7);
    cy.get('.pagination__arrow').first().click();
    cy.get('.pagination__btn').last().should('have.id', 6);
  });
});
