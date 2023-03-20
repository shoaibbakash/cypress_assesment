const { defineConfig } = require('cypress');
const fs = require('fs');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');

 async function setupNodeEvents(on, config) {
   await addCucumberPreprocessorPlugin(on, config);

  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.feature$/,
            use: [
              {
                loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                options: config,
              },
            ],
          },
        ],
      },
    },

  };

  on('file:preprocessor', webpackPreprocessor(options));
  on('task', {
    readFileMaybe(filename) {
      if (fs.existsSync(filename)) {
        return fs.readFileSync(filename, 'utf8')
      }

      return null
    },
  })
require('cypress-mochawesome-reporter/plugin')(on);
  return config;
 }

module.exports = {
  chromeWebSecurity: false,

  "testFiles": "**/*.feature",
  default: defineConfig({
    reporter:'cypress-mochawesome-reporter',
    reporterOptions:{
      charts:true,
      reportPageTitle:'cypress report',
      embeddedScreenshots:true,
      inlineAssets:true,
      code:false,
    },

    env: {
      upload_file: './fixtures/screenshot1.jpg',
      page_url: '../../fixtures/eg-task/task.html',
      new_tab_url:'https://www.easygenerator.com/',
      youtube_url:'https://www.youtube.com/user/easygenerator',
      text_file_path: './fixtures/eg-task/alert-text.txt',
      api_url:'https://reqres.in/api/users'

    },
    e2e: {
      chromeWebSecurity: false,
      specPattern: '**/*.feature',
      supportFile: 'support/index.js',
      fixturesFolder: 'fixtures',
      setupNodeEvents,
      experimentalSessionAndOrigin: true,
      video:false
    },
  }),
  chromeWebSecurity: false,

  setupNodeEvents,
};

