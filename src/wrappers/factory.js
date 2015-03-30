/*
* Wraps a module factory function.
*/

define([
  'wrappers/export-factory',
  'test-framework/run-before-test'
  ], function (exportFactory, runBeforeTest) {
  'use strict';

  return function wrapFactory (factory) {
    return function (module) {
      var deps = Array.prototype.slice.call(arguments);

      console.log(module.id);

      // Remove 'module' dependency
      deps.shift();

      return factory.apply(null, deps);
    };
  };
});

