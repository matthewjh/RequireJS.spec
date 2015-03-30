/*
* Wraps a module factory function.
*/

define([
  'wrappers/export-factory',
  'test-framework/run-before-test'
  ], function (exportFactory, runBeforeTest) {
  'use strict';

  return function wrapFactory (factory) {
    return function () {
      var actualExport,
          exportObject,
          factoryArguments,
          factoryContext;

      factoryArguments = Array.prototype.slice.call(arguments);
      exportObject = exportFactory();
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
