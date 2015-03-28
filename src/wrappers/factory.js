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
      var exportObject,
          factoryArguments,
          factoryContext;

      factoryArguments = Array.prototype.slice.call(arguments);
      exportObject = new Export();
      factoryContext = this;

      // Before every test, get a fresh export and wire it up to the wrapped export
      // runBeforeTest(function () {
      //   var actualExport;

      //   actualExport = factory.apply(factoryContext, factoryArguments);

      //   exportObject.wireTo(actualExport);
      // });

      actualExport = factory.apply(factoryContext, factoryArguments);
      exportObject.wireTo(actualExport);

      return exportObject.get();
    };
  };
});
