define([
  'window'
  ], function (window) {
  'use strict';
  var defineWrapper;

  defineWrapper = function (id, dependencies, factory) {
    // When define is called with the 'id' and 'dependencies' omitted
    if (id.constructor === Function) {
      factory = id;
      id = null;
      dependencies = null;
    } // When define is called with the 'id' omitted
      else if (id.constructor === Array) {
      factory = dependencies;
      dependencies = id;
      id = null;
    }

    // When define is called with 'dependencies' omitted
    if (dependencies && dependencies.constructor && dependencies.constructor === Function) {
      factory = dependencies;
      dependencies = null;
    }

    window.define(id, dependencies, factory);
  };

  defineWrapper.amd = window.define.amd;

  return defineWrapper;
});