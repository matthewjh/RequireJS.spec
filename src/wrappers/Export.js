/*
* Wraps a module export.
*/

define([
  ], function () {
  'use strict';

  var Export;

  Export = function () {
    this._ghostObject = {};
  };

  Export.prototype.get = function () {
    return this._ghostObject;
  };

  Export.prototype.wireTo = function (object) {
    this._ghostObject.__proto__ = object;
  };

  return Export;
});
