/*
* Wraps a module export.
*/

define([
  'test-framework/run-before-test'
  ], function (runBeforeTest) {
  'use strict';

  return function exportFactory (getter) {
    var dirty,
        exportValue;

    dirty = true;

    runBeforeTest(function () {
      dirty = true;
    });

    return {
      get: function () {
        if (dirty) {
          exportValue = getter();
          dirty = false;
        }

        return exportValue;
      }
    };
  };
});
