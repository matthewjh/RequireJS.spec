define([
  'original-require',
  'wrappers/require.config'
  ], function (originalRequire, requireConfigWrapper) {
  'use strict';
  var requireWrapper;

  requireWrapper = function () {
    originalRequire.apply(null, arguments);
  };

  requireWrapper.__proto__ = originalRequire;

  requireWrapper.config = requireConfigWrapper;

  return requireWrapper;
});
