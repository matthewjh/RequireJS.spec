define([
  'original-define'
  ], function (originalDefine) {
  'use strict';
  var defineWrapper;

  defineWrapper = function (id, dependencies, factory) {
    var originalDefineArguments;

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

    // We have to do this because originalDefine will break if we pass it null arguments
    originalDefineArguments = [];
    [id, dependencies, factory].forEach(function (argument) {
      if (argument) {
        originalDefineArguments.push(argument);
      }
    });

    originalDefine.apply(null, originalDefineArguments);
  };

  // Required per AMD spec: https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property-
  defineWrapper.amd = originalDefine.amd;

  return defineWrapper;
});
