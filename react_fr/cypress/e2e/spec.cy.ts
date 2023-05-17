describe('Payroll tests', () => {
  beforeEach(() => {
    cy.viewport(1722, 824)
    cy.visit('https://main--payrollapp1.netlify.app/')
  })

  it('passes', () => {
    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('input[name=username]').type("non-existing-user")
    cy.get('input[name=password]').type("password")
    cy.contains("Login").get("#submit").click()
    //cy.get('#login').click()
  })

  // it('Does not do much!', () => {
  //   expect(true).to.equal(false)
  // })
})