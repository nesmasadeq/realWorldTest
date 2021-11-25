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
