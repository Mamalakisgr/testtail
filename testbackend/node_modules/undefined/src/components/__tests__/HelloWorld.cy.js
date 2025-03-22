import Home from '@/views/Home.vue'

describe('HelloWorld', () => {
  it('playground', () => {
    cy.mount(Home, { props: { msg: 'Hello Cypress' } })
  })

  it('renders properly', () => {
    cy.mount(Home, { props: { msg: 'Hello Cypress' } })
    cy.get('h1').should('contain', 'Hello Cypress')
  })
})
