define([
  'sinon'
  ], function (sinon) {
  'use strict';

  var config,
      getConfigMock;

  // This is pretty disgusting... hence this project.
  afterEach(function () {
    for (var prop in config) {
      if (config.hasOwnProperty(prop)) {
        delete config[prop];
      }
    };

    config.isExcludedModule = sinon.stub();
  });

  config = {};
  config.isExcludedModule = sinon.stub();

  return config;
});
