const istanbul = require('browserify-istanbul');
const isparta  = require('isparta');

const karmaBaseConfig = {

  basePath: '../',

  singleRun: false,
  autoWatch: true,
  frameworks: ['jasmine', 'browserify'],
  

  preprocessors: {
    'app/js/**/*.js': ['browserify', 'coverage'],
    'test/**/*.js': ['browserify']
  },

  browsers: ['Chrome'],

  reporters: ['coverage', 'html','dots'],

  htmlReporter: {
      outputDir: 'test/reports/unit_tests', // where to put the reports  
      templatePath: null, // set if you moved jasmine_template.html 
      focusOnFailures: true, // reports show failures on start 
      namedFiles: false, // name files instead of creating sub-directories 
      pageTitle: null, // page title for reports; browser info by default 
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
      reportName: 'report-summary', // report summary filename; browser info by default 
      
      // experimental 
      preserveDescribeNesting: false, // folded suites stay folded  
      foldAll: false, // reports start folded (only with preserveDescribeNesting) 
  },
  coverageReporter: {
      type : 'html',
      dir : 'test/reports/coverage/'
  },


  browserify: {
    debug: true,
    extensions: ['.js'],
    transform: [
      'babelify',
      'browserify-ngannotate',
      'bulkify',
      istanbul({
        instrumenter: isparta,
        ignore: ['**/node_modules/**', '**/test/**']
      })
    ]
  },

  proxies: {
    '/': 'http://localhost:9876/'
  },

  urlRoot: '/__karma__/',

  files: [
    // app-specific code
    'app/js/main.js',

    'app/js/templates.js',

    // 3rd-party resources
    'node_modules/angular-mocks/angular-mocks.js',

    // test files
    'test/unit/**/**/**/**/*.js'
  ]

};

const customLaunchers = {
  chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  }
};

const ciAdditions = {
  singleRun: true,
  autoWatch: false,
  sauceLabs: {
    testName: 'Karma Unit Tests',
    startConnect: false,
    build: process.env.CIRCLE_BUILD_NUM,
    tunnelIdentifier: process.env.CIRCLE_SHA1
  },
  browsers: Object.keys(customLaunchers),
  customLaunchers: customLaunchers,
  reporters: ['progress', 'coverage', 'saucelabs'],
  
};

module.exports = function(config) {
  const isCI = process.env.CI && Boolean(process.env.CI_PULL_REQUEST);
  karmaBaseConfig.logLevel = isCI ? config.LOG_DEBUG : config.LOG_ERROR;

  config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions) : karmaBaseConfig);
};
