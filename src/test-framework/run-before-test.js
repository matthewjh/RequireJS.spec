/*
* Module returning the corresponding 'beforeTest(callback)' function for the current test framework.
*/

define([
  'window'
  ], function (window) {
  'use strict';

  // Only implemented for Jasmine at the moment.

  return window.beforeEach;
});
