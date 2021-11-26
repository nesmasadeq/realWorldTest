//Register user command
Cypress.Commands.add("register",(firstName,lastName,username,password,confirmPassword)=>{
    cy.visit('/signup')
    cy.get('#firstName').type(firstName).should('have.value',firstName).and('be.focused')
    cy.get('#lastName').type(lastName).should('have.value',lastName).and('be.focused')
    cy.get('#username').type(username).should('have.value',username).and('be.focused')
    cy.get('#password').type(password).should('have.value',password).and('be.focused')
    cy.get('#confirmPassword').type(confirmPassword).should('have.value',confirmPassword).and('be.focused')
    cy.get('span.MuiButton-label').should('contain','Sign Up').click()
    cy.url().should('include','/signin')
});
//Overwrite Login command
Cypress.Commands.overwrite("login",(originalFn,username,password)=>{
    cy.get('#username').clear().type(username).should('have.value',username).and('be.focused')
    cy.get('#password').clear().type(password).should('have.value',password).and('be.focused')
    // cy.get('span.PrivateSwitchBase-input-33').check().should('be.checked')
    cy.get('button[type="submit"]').should('contain','Sign In').click()
    cy.url().should('include','')
})
//Create new bank account
Cypress.Commands.add('createBankAccount',(bankName,routingNumber,accountNumber)=>{
    cy.get('#bankaccount-bankName-input').type(bankName).should('have.attr','placeholder','Bank Name')
    .and('have.value',bankName).and('be.focused')
    cy.get('#bankaccount-routingNumber-input').type(routingNumber).should('have.attr','placeholder','Routing Number')
    .and('have.value',routingNumber).and('be.focused')
    cy.get('#bankaccount-accountNumber-input').type(accountNumber).should('have.attr','placeholder','Account Number')
    .and('have.value',accountNumber).and('be.focused')
    cy.get('button[data-test="bankaccount-submit"]').should('not.be.disabled').click()
})
