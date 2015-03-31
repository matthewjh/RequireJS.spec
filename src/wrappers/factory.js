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
      var deps,
          exportValue;

      deps = Array.prototype.slice.call(arguments);

      // Remove 'module' dependency
      deps.shift();

      if (/\.spec$/.test(module.id)) {
        // If the module is a spec, we don't want to wrap the export
        exportValue = factory.apply(null, deps);
      } else {
        exportValue = exportFactory(function () {
          var gottenDeps = [];

          deps.forEach(function (dep) {
            gottenDeps.push(dep.get());
          });

          return factory.apply(null, gottenDeps);
        });
      }

      return exportValue;
    };
  };
});

