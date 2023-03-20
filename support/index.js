// const cucumber = require('cypress-cucumber-preprocessor').default

//   module.exports = (on, config) => {
//     on('file:preprocessor', cucumber())
//   }

import './commands';
import 'cypress-mochawesome-reporter/register';

before(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })
})
