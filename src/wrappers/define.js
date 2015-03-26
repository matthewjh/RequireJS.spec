define([
  'original-define'
  ], function (originalDefine) {
  'use strict';
  var defineWrapper;

  defineWrapper = function (id, dependencies, factory) {
    // When called with 'id' and 'dependencies' omitted
    if (id.constructor === Function) {
      factory = id;
      id = null;
      dependencies = null;
    } // When called with 'id' omitted
      else if (id.constructor === Array) {
      factory = dependencies;
      dependencies = id;
      id = null;
    }

    // When called with 'dependencies' omitted
    if (dependencies && dependencies.constructor && dependencies.constructor === Function) {
      factory = dependencies;
      dependencies = null;
    }

    originalDefine(id, dependencies, factory);
  };

  defineWrapper.amd = originalDefine.amd;

  return defineWrapper;
});
