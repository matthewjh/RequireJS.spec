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
      dirty = true
    });

    return {
      get: function () {
        if (dirty) {
          exportValue = getter();
          dirty = false;

          if (_.isUndefined(exportValue)) {
            logger('WARNING: exporting undefined');
          }
        }

        return exportValue;
      }
    };
  };
});
