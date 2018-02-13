describe('home', function() {
  it.only('should give log in faild mess for invalid user', function() {
    cy.visit('http://localhost:9000/login')
    .get('#username')
    .type('rg.k;her')
    cy.get('#password')
    .type(';rdigh;o')
    cy.get('#submit')
    .click()
  });

  it('should open home page for valid user', function() {
    cy.visit('http://localhost:9000/login')
      .get('#username')
      .type('ankurrai')
    cy.get('#password')
      .type('ankur')
    cy.get('#submit')
      .click()
  })

  it('should open create todo page', function() {
    cy.visit('http://localhost:9000/login')
      .get('#newTodo')
      .click()
  })

})
