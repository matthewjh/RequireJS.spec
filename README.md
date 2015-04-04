#RequireJS.spec

## Overview

Both the code and documentation are a work in progress. 

The aim of this project is to make testing large, modular projects written in RequireJS easier. 

To this end RequireJS.spec provides:
* Automatic loading of mock files in tests. When specifying dependencies for a test spec, the unit under test is injected, while all other dependencies are loaded out of a mock folder.
* Exclusion of certain modules (e.g. lodash, sinon) from the above mocking.

TODO:
* Handle different RequireJS contexts. At present, RequireJS.spec only works if you have a single context.
* Two different injection modes: auto and manual. Auto is business as usual whereas manual mode means you have to call .get on a module export to get its real export from within spec files.
* Allow passing through of 'local' injection values via .get({dep1: localDep1, ...}) which will override those in the requirejs registry, so that modules can be substitued for others on an ad-hoc, per test basis.

## Installation and Usage

Install via bower

```
bower install requirejs.spec --save-dev
```

and then ensure that `bower_components/requirejs.spec/requirejs-spec.js` is loaded after RequireJS is loaded into your environment and before your tests are run.

Note: Currently only Jasmine is supported.

## Configuration and Examples

In your test RequireJS config, specify the path (absolute -- not relative to the baseUrl) from which to load mock modules with the `mockPath` property.

Other options include:
* `mockSuffix` - OPTIONAL - Suffix to use for mock modules. By default is set to `.mock`.
* `implRegex` - OPTIONAL - Regex to use for detecting when to provide the implementation of a given module id as opposed to a mock. By default set to `/^impl\~/` so that `impl~mymodule` will match but not `mymodule`.
* `neverMock` - OPTIONAL - You may want to use the 'real' module at all times for certain modules. Usually these will be libraries like lodash. Specify which modules should never be resolved to mock modules by setting an array of module ids for this property. By default is `[]`.

For example:

```javascript
require.config({
  baseUrl: '/scripts',
  paths: {
    'sinon': '../../bower_components/sinon/sinon-1.12.2'
  },
  shim: {
    'sinon': {
      exports: 'sinon'
    }
  },
  callback: onRequireJsReady,

  // etc...

  // RequireJS.spec config
  mockPath: '/base/test/unit/mocks/',
  neverMock: [
    'sinon'
  ]
});

```

Now, given this config, if you were writing unit tests for `myModule`...

Implementation file `/scripts/my-module.js`:

```javascript
define([
  'dep1',
  ], function (dep1) {
  'use strict';

  ...

  dep1.someSideAffectingFunction();

  return 5;
});
````

Unit test file `/scripts/my-module.spec.js`:

```javascript
define([
  'impl~my-module'    // Will be resolved to 'my-module' 
  'dep1',            // Will be resolved to '{config.mockPath}/dep1.mock'
  ], function (myModule, dep1) {
  'use strict';

  describe('myModule', function () {
    var dep1Mock,
        myModuleExport;

    beforeEach(function () {
      // Call .get here to get the actual export value -- this gives flexibility and enables reloading of mocks before every test
      myModuleExport = myModule.get();
      dep1Mock = dep1.get();
    });

    it('should have some side effect', function () {
      expect(dep1Mock.someSideAffectingFunction.callCount).toBe(1);
    });

    it('should export 5', function () {
      expect(myModuleExport).toBe(5);
    });
  });
});
````

Mock file for dep1 `/scripts/test/mock/dep1.mock.js`:

```javascript
define([
  'sinon'           // Will be resolved to 'sinon' because it's in the config neverMock array 
  ], function (sinon) {
  'use strict';

  return {
    someSideAffectingFunction: sinon.stub()
  };
});
````

then when running the unit test, `mymodule-impl` will be resolved to `/scripts/mymodule.js`, and `dep1` will resolve to `/test/unit/mocks/dep1.mock.js`. This means that you can inject mocks for essentially everything BUT the unit you're testing (as specified by the impl prefix/suffix).
