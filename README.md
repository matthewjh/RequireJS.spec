#RequireJS.spec

## Overview

A work in progress. 

The aim of this project is to make testing large, modular projects written in RequireJS easier. 

To this end RequireJS.spec provides:
* Automatic loading of mock files in tests. When specifying dependencies for a test spec, the unit under test is injected, while all other dependencies are loaded out of a mock folder.
* Exclusion of certain modules (e.g. lodash, sinon) from the above mocking.

TODO:
* Automatically reload state of module exports (e.g. stub call counters) for every single test.

## Usage

In your test RequireJS config, specify the path (absolute -- not relative to the baseUrl) from which to load mock modules with the `mockPath` property.

Other options include:
* `mockSuffix` - OPTIONAL - Suffix to use for mock modules. By default is set to `.mock`.
* `implRegex` - OPTIONAL - Regex to use for detecting when to provide the implementation of a given module id as opposed to a mock. By default set to /^impl\~/ so that 'impl~mymodule' will match but not 'mymodule'.
* `alwaysUseImpl` - OPTIONAL - You may want to use the 'real' module at all times for certain modules. Usually these will be libraries like lodash. Specify which modules should never be resolved to mock modules by setting an array of module ids for this property. By default is `[]`.


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
  implRegex: /\-impl$/,
  alwaysUseImpl: [
    'config',
    'sinon',
    'ConstructorStub'
  ]
});

```
