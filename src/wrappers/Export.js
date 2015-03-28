/*
* Wraps a module export.
*/

define([
  ], function () {
  'use strict';

  var Export;

  Export = function () {
    var ghostObject;

    // The ghost object has to be a function in case the export
    // is wired up to a function.
    this._ghostObject = ghostObject = function () {
      var prototype;

      // Call through to prototype
      prototype = Object.getPrototypeOf(ghostObject);
      prototype.apply(this, arguments);
    };
  };

  Export.prototype.get = function () {
    return this._ghostObject;
  };

  Export.prototype.wireTo = function (object) {
    this._ghostObject.__proto__ = object;
  };

  return Export;
});
