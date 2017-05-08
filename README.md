Cognoma Frontend Repository Structure and Git Workflow 
=====================================
This repository is setup with a [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) style [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows) in order to add structure and organization to the Cognoma product development lifecycle and support better for [Semantic Versioning](http://semver.org/). 

The main principle behind the branching model is the ONLY production ready commits will be pushed and exist in the `master` branch. All other working copies will be supported by the `develop`, `feature\<feature-name>`, `release\<release-number>`, and `hotfix\<fix-number>` branches. 

**Gitflow Resources**

- [Git Workflow Overview](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Gitflow Process Explained](http://nvie.com/posts/a-successful-git-branching-model/)
- [IDE and text editor Extensions](https://github.com/nvie/gitflow)

---

#Frontend Scaffolding
**Based on [angularjs-gulp-browserify-boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate)**


A boilerplate using AngularJS, SASS, Gulp, and Browserify that also utilizes [these best AngularJS practices](https://github.com/toddmotto/angularjs-styleguide)  and Gulp best practices from [this resource](https://github.com/greypants/gulp-starter).

[View contributors](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate/graphs/contributors)


### Getting up and running
1. Install [Node.js](https://nodejs.org/en/download/) ,*native JS engine*
2. Install [Node Package Manager - npm](https://docs.npmjs.com/getting-started/installing-node), *node.js package manager*
3. [Fork](https://help.github.com/articles/fork-a-repo/) this repoistory
4. Checkout the develop branch `$ git checkout develop`
5. Run `npm install` from project root directory
6. Run `npm run dev`
7. Your browser will automatically be opened and directed to the browser-sync proxy address (http://localhost:3000) 
8. To run unit test (continuous integration) open a separate terminal session run `$npm run unit` or `$gulp unit`. This will launch two new Chrome windows one with an html Unit test report summary and another that runs the tests.
8. To prepare assets for production, run the `npm run build` script (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `npm run dev` during development. More information below)

Now that `npm run dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp tasks and the changes will be injected to any open browsers pointed at the proxy address.

---

This boilerplate uses the following libraries:

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

Along with many Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks/`).

---

### AngularJS v1.5.x

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this boilerplate, it is used for all the application routing as well as all of the frontend views and logic.

The AngularJS files are all located within `/app/js`, structured in the following manner:

```
/components
  index.js   (the main module on which all components will be mounted)
  /componentName 
      <componentName>.component.js (AngularJS component code )
      <componentName>.tpl.html (component HTML template)
      _<componentName>.scss ( sass component styles )
/directives
  index.js   (the main module on which all directives will be mounted)
  example.js
/filters
  index.js (the main module on which all filters will be mounted)
  example.js
/services
  index.js   (the main module on which all services will be mounted)
  example.js
/dataModels
  index.js (the main module on which all models will be mounted as factories)
/MockBackend
  index.js   (Angular ngMockE2E implementation to intercept and mock $http requests and responses)
  /mockData (contains mock json data to be served as responses from the mockBackend)
constants.js  (any constant values that you want to make available to Angular)
main.js       (the main file read by Browserify, also where the application is defined and bootstrapped)
on_run.js     (any functions or logic that need to be executed on app.run)
on_config.js  (all route definitions and any logic that need to be executed on app.config
```

##### Module organization

Controllers, services, directives, etc. should all be placed within their respective folders, and will be automatically required and mounted via their respective `index.js` using `bulk-require`. All modules must export an object of the format:

```javascript
const ExampleModule = function() {};

export default {
  name: 'ExampleModule',
  fn: ExampleModule
};

```

##### Dependency injection

Dependency injection is carried out with the [ng-annotate](https://github.com/olov/ng-annotate) library. In order to take advantage of this, a simple directive prologue of the format:

```js
function MyService($http) {
  'ngInject';
  ...
}
```

needs to be added at the very beginning of any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you to only specify the dependencies within the function parameters and nothing more.

---

### SASS

[SASS](http://sass-lang.com/), standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a barebones file structure for your styles, with explicit imports into `app/styles/main.scss`. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

---

### Browserify

[Browserify](http://browserify.org/) is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. The bundling and compilation is then taken care of by Gulp, discussed below.

---

### Gulp

[Gulp](http://gulpjs.com/) is a "streaming build system", providing a very fast and efficient method for running your build tasks.

##### Web Server

Gulp is used here to provide a very basic node/Express web server for viewing and testing your application as you build. It serves static files from the `build/` directory, leaving routing up to AngularJS. All Gulp tasks are configured to automatically reload the server upon file changes. The application is served to `localhost:3002` once you run the `npm run dev` script. To take advantage of the fast live reload injection provided by browser-sync, you must load the site at the proxy address (within this boilerplate will by default be `localhost:3000`). To change the settings related to live-reload or browser-sync, you can access the UI at `localhost:3001`.

##### Scripts

A number of build processes are automatically run on all of our Javascript files, run in the following order:

- **JSHint:** Gulp is currently configured to run a JSHint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **Babelify:** This uses [babelJS](https://babeljs.io/) to provide support for ES6+ features.
- **ngAnnotate:** This will automatically add the correct dependency injection to any AngularJS files, as mentioned previously.
- **Uglifyify:** This will minify the file created by Browserify and ngAnnotate.

The resulting file (`main.js`) is placed inside the directory `/build/js/`.

##### Styles

Just one plugin is necessary for processing our SASS files, and that is `gulp-sass`. This will read the `main.scss` file, processing and importing any dependencies and then minifying the result. This file (`main.css`) is placed inside the directory `/build/css/`.

- **gulp-autoprefixer:** Gulp is currently configured to run autoprefixer after compiling the scss.  Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you. Autoprefixer is recommended by Google and used in Twitter, WordPress, Bootstrap and CodePen.

##### Images

Any images placed within `/app/images` will be automatically copied to the `build/images` directory. If running `npm run build`, they will also be compressed via imagemin.

##### Views

When any changes are made to the `index.html` file, the new file is simply copied to the `/build/` directory without any changes occurring.

Components templates files inside  `/app/js/components/**/*.tpl.html`, on the other hand are included inline in the component's definition via a `require()`

##### Watching files

All of the Gulp processes mentioned above are run automatically when any of the corresponding files in the `/app` directory are changed, and this is thanks to our Gulp watch tasks. Running `npm run dev` will begin watching all of these files, while also serving to `localhost:3002`, and with browser-sync proxy running at `localhost:3000` (by default).

##### Production Task

Just as there is the `npm run dev` command for development, there is also a `npm run build` command for putting your project into a production-ready state. This will run each of the tasks, while also adding the image minification task discussed above. There is also an empty deploy task (run with `npm run deploy`) that is included when running the production task. This deploy task can be fleshed out to automatically push your production-ready site to your hosting setup.

**Reminder:** When running the production task, gulp will not fire up the express server and serve your index.html. This task is designed to be run before the `deploy` step that may copy the files from `/build` to a production web server.

##### Pre-compressing text assets

When building with `npm run build`, a pre-compressed file is generated in addition to uncompressed file (.html.gz, .js.gz, css.gz). This is done to enable web servers serve compressed content without having to compress it on the fly. Pre-compression is handled by `gzip` task.

##### Testing

A Gulp tasks also exists for running the test framework (discussed in detail below). Running `gulp test` will run any and all tests inside the `/test` directory and show the results (and any errors) in the terminal.

---

### Testing

This boilerplate also includes a simple framework for unit and end-to-end (e2e) testing via [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/). In order to test AngularJS modules, the [angular.mocks](https://docs.angularjs.org/api/ngMock/object/angular.mock) module is used.

All of the tests can be run at once with the command `npm test`. However, the tests are broken up into two main categories:

##### End-to-End (e2e) Tests

e2e tests, as hinted at by the name, consist of tests that involve multiple modules or require interaction between modules, similar to integration tests. These tests are carried out using the Angular library [Protractor](https://github.com/angular/protractor), which also utilizes Jasmine. The goal is to ensure that the flow of your application is performing as designed from start to finish.

In this boilerplate, two end-to-end test examples are provided:

- `routes_spec.js`, which tests the functionality of our AngularJS routing
- `example_spec.js`, which tests the functionality of the example route, controller, and view

More examples can be seen at the above link for Protractor.

All e2e tests are run with `npm run protractor`.

##### Unit Tests

Unit tests are used to test a single module (or "unit") at a time in order to ensure that each module performs as intended individually. In AngularJS this could be thought of as a single controller, directive, filter, service, etc. That is how the unit tests are organized in this boilerplate.

An example test is provided for the following types of AngularJS modules:

- `unit/controllers/example_spec.js`
- `unit/services/example_spec.js`
- `unit/directives/example_spec.js`
- `unit/constants_spec.js`

All unit tests are run with `npm run unit`. When running unit tests, code coverage is simultaneously calculated and output as an HTML file to the `/coverage` directory.
