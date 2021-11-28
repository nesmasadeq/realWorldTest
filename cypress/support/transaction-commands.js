//Register user command
Cypress.Commands.add("register", (firstName, lastName, username, password, confirmPassword) => {
    cy.visit('/signup')
    cy.get('#firstName').type(firstName).should('have.value', firstName).and('be.focused')
    cy.get('#lastName').type(lastName).should('have.value', lastName).and('be.focused')
    cy.get('#username').type(username).should('have.value', username).and('be.focused')
    cy.get('#password').type(password).should('have.value', password).and('be.focused')
    cy.get('#confirmPassword').type(confirmPassword).should('have.value', confirmPassword).and('be.focused')
    cy.get('span.MuiButton-label').should('contain', 'Sign Up').click()
    cy.url().should('include', '/signin')
});
//Overwrite Login command
Cypress.Commands.overwrite("login", (originalFn, username, password) => {
    cy.get('#username').clear().type(username).should('have.value', username).and('be.focused')
    cy.get('#password').clear().type(password).should('have.value', password).and('be.focused')
    // cy.get('span.PrivateSwitchBase-input-33').check().should('be.checked')
    cy.get('button[type="submit"]').should('contain', 'Sign In').click()
    cy.url().should('include', '')
})
//Create new bank account
Cypress.Commands.add('createBankAccount', (bankName, routingNumber, accountNumber) => {
    //Verify clicking on next button displays 'create account bank' modal
    cy.wait(5000).then(() => {
        cy.get('body').then((elem) => {
            if (elem.find('button[data-test="user-onboarding-next"]').length > 0) {
                cy.get('button[data-test="user-onboarding-next"]', { timeout: 10000 }).should('contain', 'Next').click({ force: true })
                cy.get('div[data-test="user-onboarding-dialog-title"]').should('contain', 'Create Bank Account')
                    .and('be.visible')
                //Verify filling bank acount feilds
                cy.get('#bankaccount-bankName-input').type(bankName).should('have.attr', 'placeholder', 'Bank Name')
                    .and('have.value', bankName).and('be.focused')
                cy.get('#bankaccount-routingNumber-input').type(routingNumber).should('have.attr', 'placeholder', 'Routing Number')
                    .and('have.value', routingNumber).and('be.focused')
                cy.get('#bankaccount-accountNumber-input').type(accountNumber).should('have.attr', 'placeholder', 'Account Number')
                    .and('have.value', accountNumber).and('be.focused')
                //Verify the save button not be disabled
                cy.get('button[data-test="bankaccount-submit"]').should('not.be.disabled')
                    .and('have.class', 'MuiButton-containedPrimary').click()
                //Verify the finished modal displyed after successfully creating account
                cy.get('div[data-test="user-onboarding-dialog-title"]').should('contain', 'Finished')
                //Verify clicking on done button
                cy.get('button[data-test="user-onboarding-next"]', { timeout: 10000 }).should('contain', 'Done').click({ force: true })
                //Verify the finished modal disapear after clicking done button
                cy.get('div[data-test="user-onboarding-dialog-title"]').should('not.be.visible')
            }
        })

    })


})
Cypress.Commands.add('checkAddedAccount', (bankNameSelector, bankName) => {
    cy.get('ul > div > a:nth-child(3)').should('contain', 'Bank Accounts').click()
    cy.url().should('include', '/bankaccounts')
    cy.get(bankNameSelector).should('contain', bankName)
})

Cypress.Commands.add('logout',()=>{
    cy.get('[data-test="sidenav-signout"]').should('contain' , 'Logout').click()
})
Cypress.Commands.add('checkSubmitButton', (buttonSelector) => {
    let bankName = $('#bankaccount-bankName-input').val
    let routingNumber = $('#bankaccount-routingNumber-input').val
    let accountNumber = $('accountNumber').val

})