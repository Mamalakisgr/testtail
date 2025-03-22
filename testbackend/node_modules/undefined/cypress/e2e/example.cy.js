// https://on.cypress.io/api

describe('Checkout Page - E2E', () => {
  it('Checkout as a guest.', () => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.get('[data-cy="mobile-menu"]').should('be.visible')
    cy.get('[data-cy="mobile-menu"]').click()
    cy.contains('TestList').click()
    cy.get('[data-cy="product_name"]').first().click()
    cy.get('[data-cy="add_cart"]').first().click()
    cy.get('[data-cy="toast-message"]').should('be.visible').should('contain', "Product has been added to cart")
    cy.get('[data-cy="cart_button"]').find('span').should('contain', '1')
    cy.get('[data-cy="cart_button"]').click()
    cy.get('[data-cy="cart_page_button"]').click()
    cy.get('[data-cy="checkout_page_button"]').click()
    cy.get('[data-cy="shipping_first_name"]').type("Automation")
    cy.get('[data-cy="shipping_last_name"]').type("Tester")
    cy.get('[data-cy="shipping_email"]').type("oarthaseinaigay@gmail.com")
    cy.get('[data-cy="shipping_country_selector"]').select("Greece")
    cy.get('[data-cy="shipping_region_selector"]').select("Attiki")

  });
});
