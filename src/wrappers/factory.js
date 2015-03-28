/*
* Wraps a module factory function.
*/

define([
  'wrappers/Export'
  ], function (Export) {
  'use strict';

  return function (factory) {
    return function () {
      var exportObject;

      factory.apply(this, arguments);

      exportObject = new Export();

      return exportObject.get();
    };
  };
});
