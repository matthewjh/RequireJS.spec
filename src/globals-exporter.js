define([
  'window',
  'wrappers/define',
  'wrappers/require'
  ], function (window, wrappedDefine, wrappedRequire) {
  'use strict';

  return function () {
    window.define = wrappedDefine;
    window.require = wrappedRequire;
  };
});
