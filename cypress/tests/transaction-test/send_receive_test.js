/// <reference types="cypress" />

describe("Sending and Receiving Transaction",()=>{
    before(()=>{
        cy.visit('http://localhost:3000')
    })
    context("Sending Transactions",()=>{
        it("Verify registering new sender user",()=>{
            cy.register('Nesma','Sender','NesmaSender','12345','12345')
        })
        
    })
    context("Receiving Transactions",()=>{})
})