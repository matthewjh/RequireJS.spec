/*
* Wraps a module export.
*/

define([
  ], function () {
  'use strict';

  return function exportFactory (getter) {
    var exportValue;

    exportValue = getter();

    return {
      get: function () {
        return exportValue;
      },

      reset: function () {
        exportValue = getter();
      }
    };
  };
});
