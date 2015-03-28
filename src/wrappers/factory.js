/*
* Wraps a module factory function.
*/

define([
  'wrappers/Export',
  'test-framework/run-before-test'
  ], function (Export, runBeforeTest) {
  'use strict';

  return function (factory) {
    return function () {
      var exportObject;

      factory.apply(this, arguments);

      runBeforeTest(function () {

      });

      exportObject = new Export();

      return exportObject.get();
    };
  };
});
