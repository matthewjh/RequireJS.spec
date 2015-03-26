define([
  'original-define',
  'config'
  ], function (originalDefine, config) {
  'use strict';
  var defineWrapper,
      isDependencyExcludedFromMocking,
      mapDependencies;

  isDependencyExcludedFromMocking = function (dependency) {
    return config.alwaysUseImpl.indexOf(dependency) >= 0;
  };

  // Map each 'IMPL-id' to 'id' and each 'id' to 'mockPath/id.mock'
  mapDependencies = function (dependencies) {
    dependencies.forEach(function (dependency, index) {
      if (config.implRegex.test(dependency)) {
        // Strip impl prefix/suffix
        dependencies[index] = dependency.replace(config.implRegex, '');
      } else if (!isDependencyExcludedFromMocking(dependency)) {
        // Add mock path and suffix
        dependencies[index] = config.mockPath + dependency + config.mockSuffix + '.js';
      }
    });
  };

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

    if (dependencies) {
      mapDependencies(dependencies);
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
