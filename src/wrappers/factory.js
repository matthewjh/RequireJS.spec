/*
* Wraps a module factory function.
*/

define([
  'wrappers/export-factory',
  'test-framework/run-before-test',
  'logger',
  'config'
  ], function (exportFactory, runBeforeTest, logger, config) {
  'use strict';

  return function wrapFactory (factory) {
    return function (module) {
      var deps,
          exportValue,
          loggingFactory;

      loggingFactory = function () {
        logger('factory function for', module.id, 'invoked');

        return factory.apply(null, arguments);
      };


      deps = Array.prototype.slice.call(arguments);

      // Remove 'module' dependency
      deps.shift();

      if (config.specRegex.test(module.id)) {
        // If the module is a spec, we don't want to wrap the export
        exportValue = loggingFactory.apply(null, deps);
      } else {
        exportValue = exportFactory(function () {
          var gottenDeps = [];

          deps.forEach(function (dep) {
            gottenDeps.push(dep.get());
          });

          return loggingFactory.apply(null, gottenDeps);
        });
      }

      return exportValue;
    };
  };
});

