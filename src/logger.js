define([
  'window',
  ], function (window) {
  'use strict';

  return function logger () {
    return window.console.log.apply(window.console, arguments);
  };
});
