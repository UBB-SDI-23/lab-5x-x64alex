describe('Payroll tests', () => {
  beforeEach(() => {
    cy.viewport(1722, 824)
    cy.visit('https://main--payrollapp1.netlify.app/')
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });
  })

  it('Login', () => {
    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('input#username').type('your_username');
    cy.get('input#password').type('1');
    cy.get('#submitButton').click()
    cy.get('@windowAlert').should('be.calledWith', 'Error');

    cy.get('input#username').clear().type("admin")
    cy.get('input#password').clear().type("12345678")
    cy.get('#submitButton').click()
    cy.get('@windowAlert').should('be.calledWith', 'Useradmin signed in');

    cy.contains('Logout').click()
    cy.contains('Logout').should('not.exist')
    cy.contains('Login').should('exist')
  })


  // it('NoProductsFilter', () => {
  //   cy.contains('Products').click()

  //   cy.get('input#filterQuantity').clear().type(75869675486)
  //   cy.wait(2000).contains("No products found").should('exist')
  // })

  it('AddCategory', () => {
    cy.contains('Login').click()
    cy.get('input#username').clear().type("admin")
    cy.get('input#password').clear().type("12345678")
    cy.get('#submitButton').click()
    cy.get('@windowAlert').should('be.calledWith', 'Useradmin signed in');


    cy.contains('Categories').click()
    cy.get('#addButton').click()

    cy.get('input#categoryName').clear().type("testAddCategory")
    cy.get('input#categoryPopularity').clear().type(1)
    cy.get('input#categoryProfitability').clear().type(0)
    cy.get('input#categoryReturnsPerMonth').clear().type(45)
    cy.get('input#categorySales').clear().type(78)
    cy.get('#submitButton').click()
    cy.get('@windowAlert').should('be.calledWith', 'Product added');
    
    cy.contains('Categories').click()
    cy.contains('No categories found').should("not.exist")

  })

  it('AddProduct', () => {
    cy.contains('Login').click()
    cy.get('input#username').clear().type("admin")
    cy.get('input#password').clear().type("12345678")
    cy.get('#submitButton').click()
    cy.get('@windowAlert').should('be.calledWith', 'Useradmin signed in');


    cy.contains('Products').click()
    cy.get('#addButton').click()

    cy.get('input#productName').clear().type("testAddProduct")
    cy.get('input#productPrice').clear().type(1)
    cy.get('input#productQuantity').clear().type(758696754)
    cy.get('input#productSale').clear().type("true")
    cy.get('input#productWeight').clear().type(1)

    cy.get('input#combo-box-demo').type('testAddCategory');
    cy.contains('testAddCategory').click()


    cy.get('#submitButton').click()

    cy.contains('Products').click()
    cy.get('input#filterQuantity').clear().type(758696753)
    cy.contains("testAddProduct").should('exist')
  })
})