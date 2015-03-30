/*
* Unfortunately, because wrappers/Export will wrap module exports, equality comparisons
* will no longer work as expected.
*
* Hence, this module exports a custom equality test function for comparing equality between an export and a regular value.
* They will be equal if the unwrapped value of the export equals the value.
*/

define([
  'window'
  ], function (window) {
  'use strict';

  // Only implemented for Jasmine at the moment.

  return window.beforeEach;
});
