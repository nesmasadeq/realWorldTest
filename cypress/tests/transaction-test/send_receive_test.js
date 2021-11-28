/// <reference types="cypress" />

describe("Sending and Receiving Transaction",()=>{
    let senderUserName='NesmaSenderx3'
    let senderPassword='12345'
    let receiverUserName='NesmaReceiver'
    let receiverPassword='123456'
    let hasBankAccount=false
    let amount=500
    let note="test note"

    before(()=>{
        cy.visit(Cypress.config().baseUrl)
    })
    context("Creating Accounts",()=>{
        it("Verify registering new sender user",()=>{
            cy.register('Nesma','Sender',senderUserName,senderPassword,senderPassword)
            cy.fixture('database.json').as('realData')
            cy.get('@realData').then((data)=>{
                let users=data.users
                for(var i=0; i < users.length -1; i++){
                    if(users[i].username==senderUserName){
                        cy.log('success')
                    }else{
                        cy.log('not-found')
                    }
                }
            })
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
                cy.get('span > span.MuiStepLabel-iconContainer > svg')
                .should('have.class','MuiStepIcon-active')
                cy.get('div:nth-child(3) > span > span.MuiStepLabel-iconContainer > svg')
                .should('not.have.class','MuiStepIcon-completed')
                cy.get('div:nth-child(5) > span > span.MuiStepLabel-iconContainer > svg')
                .should('not.have.class','MuiStepIcon-completed')
            })
            
            it("Verify typing in search field",()=>{
                cy.get('#user-list-search-input').type(receiverUserName,{force:true})
                .should('have.value',receiverUserName).and('have.attr','placeholder','Search...')
            })
            it("Verify clicking on the receiver account",()=>{
                cy.get('.MuiPaper-elevation0.MuiPaper-rounded > ul > li:nth-child(1)')
                .should('contain',receiverUserName).click({force:true})
            })
            it("Verify clicking on reciver account the 'payment' is selected",()=>{
                cy.get('div:nth-child(3) > span > span.MuiStepLabel-iconContainer > svg')
                .should('have.class','MuiStepIcon-active')
            })
            it("Verify the receiver user is displayed correctlly",()=>{
                cy.get('div:nth-child(2) > h2').should('contain','Nesma')
            })
            context("Filling amount feilds",()=>{
                beforeEach(()=>{
                    cy.get('button[data-test="transaction-create-submit-request"]')
                    .should('be.disabled').and('have.class','Mui-disabled')
                })
                it("Verify filling amount feild",()=>{
                    cy.get('#amount').clear().type(amount).should('have.value','$'+amount)
                    .and('have.attr','placeholder','Amount')
                })
                it("Verify filling note feild",()=>{
                    cy.get('#transaction-create-description-input').clear().type(note).should('have.value',note)
                    .and('have.attr','placeholder','Add a note')
                })
                after(()=>{
                    cy.get('button[data-test="transaction-create-submit-request"]')
                    .should('not.be.disabled').and('not.have.class','Mui-disabled')
                })
            })
            context("Request payment",()=>{
                it("Verify clicking on request button",()=>{
                    cy.get('.MuiGrid-justify-content-xs-center > div:nth-child(1) > button')
                    .should('contain','Request').click()
                })
                it("Verify the successfully messsage displayed",()=>{
                    cy.get('[data-test="alert-bar-success"]',{timeout:5000}).should('be.visible')
                    .and('have.class', 'MuiAlert-filledSuccess')
                })
                it("Verify the 'complete' is selected",()=>{
                    cy.get('div:nth-child(5) > span > span.MuiStepLabel-iconContainer > svg')
                    .should('have.class','MuiStepIcon-completed')
                })
                
                it("Verify the payment displayed successfully ",()=>{
                    cy.get('div.MuiBox-root> div > div > h2').should('contain',amount)
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
    
        it("Verify creating bank account",()=>{
            cy.createBankAccount('Palestine','123456789','123123123')
        })
    
        it("Verify the account has been added successfully",()=>{
            cy.checkAddedAccount('ul > li > div > div:nth-child(1) > p','Palestine')
        })
        it("Verify the reciver user logged successfully",()=>{
            cy.get('div:nth-child(2) > h6.MuiTypography-root.MuiTypography-subtitle2')
            .should('contain',receiverUserName)
        })
        it("verify the user notification displayed",()=>{
            cy.get('.MuiIconButton-colorInherit > span.MuiIconButton-label > span > span').should('be.visible')
        })
        it("Verify clicking on notification icon",()=>{
            cy.get('.MuiIconButton-colorInherit > span.MuiIconButton-label > span > span').click()
        })
        //after 10 am
       it("Verify the payment displayed in notification list",()=>{
           cy.get('ul[data-test="notifications-list"]> li:nth-child(1)').should('contain',"Nesma")
       }) 
       it("Verify clicking on home item in sidebar",()=>{
           cy.get('ul a[href="/"]').should('contain','Home').click()
       })
       it("Verify the user redirect to home page",()=>{
           cy.url().should('include','http://localhost:3000/')
       })
       it("Verify clicking in mine tab",()=>{
           cy.get('a[href="/personal"]',{timeout:5000}).should('contain','Mine').click({force:true})
       })
       it("Verify the 'mine' tab is selected",()=>{
        cy.get('a[href="/personal"]').should('have.attr','aria-selected','true')
        .and('have.class','Mui-selected')
       })
       it("Verify the user redirect to personal page",()=>{
           cy.url().should('include','/personal')
       })
       it("Verify the list in 'mine' contain sender amount",()=>{
           cy.get('div:nth-child(1) > li')
           .should('contain',amount)
       })
       it("Verify clicking on recieved item",()=>{
           cy.get('div:nth-child(1) > li').should('contain',"Nesma").click({force:true})
       })
       it("Verify redirect user to submitting recived payment screen",()=>{
           cy.url().should('include','/transaction')
           cy.get('.MuiGrid-justify-content-xs-space-between > div:nth-child(2) > span').should('contain',amount)
       })
       it("Verify clicking on like button",()=>{
           cy.get('button[data-test^="transaction-like-button-"]').click({force:true})
       })
       it("Verify the like is done successfully",()=>{
           cy.get('div[data-test^="transaction-like-count"]').should('contain','1')
       })
       it("Verify the like button be disabled",()=>{
        cy.get('button[data-test^="transaction-like-button"]').should('be.disabled')
       })
       it("Verify writting comment",()=>{
           cy.get('input[id^="transaction-comment-input"]').type('test comment').should('have.value','test comment')
           .and('have.attr','placeholder','Write a comment...').and('be.focused')
       })
       it("Verify clicking on 'accept request' button",()=>{
           cy.get('button[data-test^="transaction-accept-request"]')
           .should('contain','Accept Request').click({force:true})
       })
       it("Verify the user redirect to transaction detail screen",()=>{
           cy.url().should('include','/transaction')
           cy.get('h2[data-test="transaction-detail-header"]').should('contain','Transaction Detail')
       })
       it("Verify the comment is displayed in screen",()=>{
           cy.get('.MuiGrid-align-items-xs-flex-start > div:nth-child(3) > p')
           .should('contain','test note')
       })
       it("Verify the like is saved",()=>{
           cy.get('div[data-test^="transaction-like-count"]').should('contain','1')
       })
    
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