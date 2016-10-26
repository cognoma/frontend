// require('babel-register');
require('babel-core/register')

const gulpConfig = require('../gulp/config');
// import config     from '../config';

exports.config = {

  allScriptsTimeout: 11000,

  baseUrl: `http://localhost:${gulpConfig.testPort}/`,

  capabilities: {
    browserName: 'chrome',
    // 'tunnel-identifier': process.env.CIRCLE_JOB_NUMBER,
    build: process.env.CIRCLE_BUILD_NUM,
    name: 'Protractor Tests'
  },

  framework: 'jasmine2',

  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  specs: [
    'e2e/**/*.js'
  ],

  sauceUser: process.env.SAUCE_USERNAME,

  sauceKey: process.env.SAUCE_ACCESS_KEY

};
