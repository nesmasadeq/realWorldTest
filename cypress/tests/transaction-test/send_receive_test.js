/// <reference types="cypress" />

describe("Sending and Receiving Transaction",()=>{
    before(()=>{
        cy.visit('http://localhost:3000')
    })
    context("Sending Transactions",()=>{
        it("Verify registering new sender user",()=>{
            cy.register('Nesma','Sender','NesmaSender','12345','12345')
        })
        it("Verify loging the registered sender user",()=>{
            cy.login('NesmaSender','12345')
        })
        it("Verify the user logged successfully",()=>{
            cy.get('div:nth-child(2) > h6.MuiTypography-root.MuiTypography-subtitle2').should('contain','NesmaSender')
        })
        it("Verify that the 'get started' modal displayed when the user login for the first time",()=>{
            cy.get('div[role="dialog"]').should('be.visible')
        })
        it("Verify clicking on next button displays 'create account bank' modal",()=>{
            cy.get('button[data-test="user-onboarding-next"]').should('contain','Next').click()
            cy.get('div[data-test="user-onboarding-dialog-title"]').should('contain','Create Bank Account')
            .and('be.visible')
        })
        context("Create bank account",()=>{
            before(()=>{
                //verify the save button is disabled
                cy.get('button[data-test="bankaccount-submit"]').should('be.disabled')
                .and('not.have.class','MuiButton-containedPrimary')
            })
            it("Verify filling the bank name feild",()=>{
                cy.createBankAccount('Palestine','123456789','123123123')
            })
            it("Verify the bank account added successfully",()=>{
                cy.get('ul > div > a:nth-child(3)').should('contain','Bank Accounts').click()
                cy.url().should('include','/bankaccounts')
                cy.get(' ul > li > div > div:nth-child(1) > p').should('contain','Palestine')
            })
            after(()=>{
                //verifty the save button enabled
                cy.get('button[data-test="bankaccount-submit"]').should('not.be.disabled')
                .and('have.class','MuiButton-containedPrimary')
                cy.get('div[data-test="user-onboarding-dialog-title"]').should('contain','Finished')
                cy.get('button[data-test="user-onboarding-next"]').should('contain','Done').click()
                cy.get('div[data-test="user-onboarding-dialog-title"]').should('not.be.visible')
            })

        })
        context("Send money",()=>{
            //verify typing insearch field
            //verify the select contact is enabled
            //verify the recieved user found
            //verify click on reciver user displays the payment section
            //verify the payment is enabled
            //verify filling amount field
            //verify filling note
            //verify the button is disabled before filling fields
            //verify the button is enabled after filling fields
            //verify clicking on request button
            //verify thecomplete is enabled
            //verify the userrecived is the same
            //verify the amout is the same
            //verify successfully message displayed

        })

    })
    context("Receiving Transactions",()=>{
        
    })
})