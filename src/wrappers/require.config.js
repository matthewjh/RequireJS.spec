define([
  'original-require'
  ], function (originalRequire) {
  'use strict';
  var requireConfigWrapper;

  requireConfigWrapper = function () {
    originalRequire.config.apply(null, arguments);
  };

  return requireConfigWrapper;
});
