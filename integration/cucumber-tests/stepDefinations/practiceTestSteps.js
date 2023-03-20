import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'; //Using this lib to use Behaviour Driven Development tests using cucumber/Gherkin language
import practicePage from '../pages/practicePage';
import 'cypress-iframe'; //using this library to interact with iframes in cypress

Given('User navigates to practice test page', () => {
   let url = Cypress.env('page_url');// using Cypress.env()
   return cy.visit(url);

});

When('practice test page is loaded', () => {

   return practicePage.elements.practicePageHeader().should('be.visible');


});

Then('upload file and verify', () => {
   let path = Cypress.env('upload_file'); // using Cypress.env()
   practicePage.elements.uploadFile().selectFile(path);
   practicePage.elements.uploadedFile().should('be.visible');
});

Then('select dropdown option and verify selected value {string}', (value) => {
   practicePage.elements.dropDown().select(value);
   practicePage.elements.dropDown().contains(value);
});


Then('hide input and verify', () => {
   practicePage.elements.hideButton().click();
   practicePage.elements.hideShowTextBox().should('not.be.visible');
});

Then('mouse hover and click', () => {

   practicePage.elements.mouseHoverButton().trigger('mouseover')
   practicePage.elements.mouseHoverButton().click();
   practicePage.elements.mouseHoverLink1().should('be.visible');
   practicePage.elements.mouseHoverLink1().click();

});

Then('verify elements in iframe displayed', () => {

   cy.frameLoaded("iframe[id='courses-iframe']");
   cy.iframe().xpath("//*[contains(text(),'Create and maintain e-learning easily')]").should('be.visible');

});

Then('verify new tab opened', () => {

   let url = Cypress.env('page_url');// using Cypress.env()
   let newURL = Cypress.env('new_tab_url');

   //stub to opening a new tab since cypress dosent support multi-tab support
   cy.visit(url, {
      onBeforeLoad(win) {
         cy.stub(win, 'open').as('open')
      }
   })

   //clicking on the new tab button
   practicePage.elements.newTabButton().click();

   //verifying if the stub has been called and verifying the URL which it opens
   cy.get('@open').should('have.been.calledOnce', newURL);

});

Then('mock request using fixtures', () => {
   cy.fixture('user.json').as('create_user');

   cy.get('@create_user').then(myFixture => {
      let api = Cypress.env('api_url')
      cy.request({ method: 'POST', url: api, body: myFixture, }).then(response => {
         expect(response.status.toString().trim()).to.equal('201'.trim());
      })
   })

});

Then('Read file using cy.task and display alert', () => {
   let path = Cypress.env('text_file_path');
   cy.task('readFileMaybe',path ).then((file) => { 
      practicePage.elements.alertTextBox().type(file);
      practicePage.elements.alertButton().click();
      cy.on('window:alert', (alertValue) => {
         expect(alertValue).to.contains(file.toString().trim());
      })

    })

});







