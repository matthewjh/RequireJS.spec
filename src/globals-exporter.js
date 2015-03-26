define([
  'window',
  'wrappers/define'
  ], function (window, wrappedDefine) {
  'use strict';

  return function () {
    window.define = wrappedDefine;
  };
});
