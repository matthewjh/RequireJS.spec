define([
  'window',
  'config'
  ], function (window, config) {
  'use strict';

  return function logger () {
    if (config.verboseMode) {
      window.console.log.apply(window.console, arguments);
    }
  };
});
