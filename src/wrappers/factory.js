/*
* Wraps a module factory function.
*/

define([
  ], function () {
  'use strict';

  return function (factory) {
    return function () {
      factory.apply(this, arguments);
    };
  };
});
