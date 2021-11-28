/// <reference types="cypress" />

describe("Sending and Receiving Transaction",()=>{
    let senderUserName='NesmaSenderx3'
    let senderPassword='12345'
    let receiverUserName='NesmaReceiver'
    let receiverPassword='123456'
    let hasBankAccount=false
    let amount=5000
    let note="test note"

    before(()=>{
        cy.visit(Cypress.config().baseUrl)
    })
    context("Creating Accounts",()=>{
        it("Verify registering new sender user",()=>{
            cy.register('Nesma','Sender',senderUserName,senderPassword,senderPassword)
        })
        it("Verify registering new Receiver user",()=>{
            cy.register('Nesma','Receiver',receiverUserName,receiverPassword,receiverPassword)
        })

    })
    context("Sending Transactions",()=>{
        
        it("Verify loging the registered sender user",()=>{
            cy.login(senderUserName,senderPassword)
        })
        it("Verify the sender user logged successfully",()=>{
            cy.get('div:nth-child(2) > h6.MuiTypography-root.MuiTypography-subtitle2')
            .should('contain',senderUserName)
            
            // cy.request('POST','/login',{"username":senderUserName,"password":senderPassword}).its('body').should('contain',senderUserName)
        })
        // it("Verify that the 'get started' modal displayed when the user login for the first time",()=>{
                // cy.get('div[role="dialog"]').should('be.visible')

        // cy.fixture('database.json').as('realData')
        //     cy.get('@realData').then((data)=>{
        //         let users=data.users
        //         let bankaccounts=data.bankaccounts
        //         let userId
        //         for(var i=0; i < users.length -1; i++){
        //             if(users[i].username==senderUserName){
        //                 userId= users[i].id
        //             }
        //         }
        //         for(var x=0; x < bankaccounts.length -1;x++){

        //             if(bankaccounts[x].userId==userId){
        //                hasBankAccount=true
        //             }
        //         }
                
        //     })
            
        // })
        // it("Verify clicking on next button displays 'create account bank' modal",()=>{
            // cy.get('button[data-test="user-onboarding-next"]').should('contain','Next').click()
            // cy.get('div[data-test="user-onboarding-dialog-title"]').should('contain','Create Bank Account')
            // .and('be.visible')
        // })
        context("Create bank account",()=>{
    
            it("Verify creating bank account",()=>{
                cy.createBankAccount('Palestine','123456789','123123123')
            })
        
            it("Verify the account has been added successfully",()=>{
                cy.checkAddedAccount('ul > li > div > div:nth-child(1) > p','Palestine')

            })

        })
        
        context("Send money",()=>{
            //click new  transaction
            it("Verify clicking on new button",()=>{
                cy.get('a[href="/transaction/new"]').should('contain','New').click()
            })
            it("Verify the user redirect to transaction page after clicking new button",()=>{
                cy.url().should('include','transaction/new')
            })
            it("Verify the 'select contact step' is enabled and other steps are disabled",()=>{
                cy.get('.MuiStep-completed > span > span.MuiStepLabel-iconContainer > svg')
                .should('have.class','MuiStepIcon-completed')
                cy.get('div:nth-child(3) > span > span.MuiStepLabel-iconContainer > svg')
                .should('not.have.class','MuiStepIcon-completed')
                cy.get('div:nth-child(5) > span > span.MuiStepLabel-iconContainer > svg')
                .should('not.have.class','MuiStepIcon-completed')
            })
            
            it("Verify typing in search field",()=>{
                cy.get('#user-list-search-input').type(receiverUserName)
                .should('have.value',receiverUserName).and('have.attr','placeholder','Search...')
            })
            it("Verify clicking on the receiver account",()=>{
                cy.get('.MuiPaper-elevation0.MuiPaper-rounded > ul > li:nth-child(1)').should('contain',receiverUserName).click()
            })
            it("Verify clicking on reciver account the 'payment' is selected",()=>{
                cy.get('div:nth-child(3) > span > span.MuiStepLabel-iconContainer > svg')
                .should('have.class','MuiStepIcon-active')
            })
            it("Verify the receiver user is displayed correctlly",()=>{
                cy.get('div > div:nth-child(2) > h2').should('contain',receiverUserName)
            })
            context("Filling amount feilds",()=>{
                beforeEach(()=>{
                    cy.get('.MuiGrid-justify-content-xs-center > div:nth-child(1) > button')
                    .should('be.disabled')
                })
                it("Verify filling amount feild",()=>{
                    cy.get('#amount').type(amount).should('have.value',amount)
                    .and('have.attr','placeholder','Amount')
                })
                it("Verify filling note feild",()=>{
                    cy.get('#transaction-create-description-input').type(note).should('have.value',amount)
                    .and('have.attr','placeholder','Add a note')
                })
                after(()=>{
                    cy.get('.MuiGrid-justify-content-xs-center > div:nth-child(1) > button')
                    .should('not.be.disabled')
                })
            })
            context("Request payment",()=>{
                it("Verify clicking on request button",()=>{
                    cy.get('.MuiGrid-justify-content-xs-center > div:nth-child(1) > button')
                    .should('contain','Request').click()
                })
                it("Verify the 'complete' is selected",()=>{
                    cy.get('div:nth-child(5) > span > span.MuiStepLabel-iconContainer > svg')
                    .should('have.class','MuiStepIcon-completed')
                })
                it("Verify the successfully messsage displayed",()=>{
                    cy.get('[data-test="alert-bar-success"]').should('be.visible')
                    .and('have.class', 'MuiAlert-filledSuccess')
                })
                it("Verify the payment displayed successfully ",()=>{
                    cy.get('div.MuiBox-root.MuiBox-root-174 > div > div > h2').should('contain',amount)
                    .and('contain',note)
                })
            })

        })
        after(()=>{
            cy.logout()
        })

    
    
    })
    context("Receiving Transactions",()=>{
        it("Verify loging the registered reciver user",()=>{
            cy.login(receiverUserName,receiverPassword)
        })
        it("Verify the reciver user logged successfully",()=>{
            cy.get('div:nth-child(2) > h6.MuiTypography-root.MuiTypography-subtitle2')
            .should('contain',receiverUserName)
        })
        it("verify the user notification displayed",()=>{
            cy.get('.MuiIconButton-colorInherit > span.MuiIconButton-label > span > span').should('be.visible')
            .and('have.class','.makeStyles-customBadge-391')
        })
        it("Verify clicking on notification icon",()=>
        {
            cy.get('.MuiIconButton-colorInherit > span.MuiIconButton-label > span > span').click()
        })
        //verify the
        after(()=>{
            cy.logout()
        })
    })
    
    // Preserve cookie in every test
    Cypress.Cookies.defaults({
        preserve: (cookie) => {
          return true;
        }
      })
})