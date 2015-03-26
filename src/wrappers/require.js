define([
  'original-require',
  'wrappers/require.config'
  ], function (originalRequire, requireConfigWrapper) {
  'use strict';
  var requireWrapper;

  requireWrapper = function () {
    originalRequire.apply(null, arguments);
  };

  // TODO: investigate why Object.setPrototypeOf didn't work here.
  requireWrapper.__proto__ = originalRequire; // jshint ignore:line

  requireWrapper.config = requireConfigWrapper;

  return requireWrapper;
});
