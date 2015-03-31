/*
* Wraps a module factory function.
*/

define([
  'wrappers/export-factory',
  'test-framework/run-before-test',
  'original-require',
  'original-define'
  ], function (exportFactory, runBeforeTest, originalRequire, originalDefine) {
  'use strict';

  return function wrapFactory (factory) {
    return function (module) {
      var deps = Array.prototype.slice.call(arguments),
          removed = false;

      console.log(module.id);

      // Remove 'module' dependency
      deps.shift();

      return factory.apply(null, deps);
    };
  };
});

