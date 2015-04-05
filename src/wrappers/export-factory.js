/*
* Wraps a module export.
*/

define([
  'lodash',
  'test-framework/run-before-test',
  'logger',
  ], function (_, runBeforeTest, logger) {
  'use strict';

  return function exportFactory (getter) {
    var dirty,
        exportValue;

    dirty = true;

    runBeforeTest(function () {
      dirty = true;
    });

    return {
      /*
       * Get the export value through the getter. Caches the export between test runs.
       */
      get: function () {
        if (dirty) {
          exportValue = getter();
          dirty = false;

          if (_.isUndefined(exportValue)) {
            logger('WARNING: exporting undefined');
          }
        }

        return exportValue;
      },

      /*
       * We use this property to check that we are indeed dealing with an export we've wrapped as opposed
       * to an export beyond rjs.spec's context that also has a .get method.
       */
      isRJSSExport: true
    };
  };
});
