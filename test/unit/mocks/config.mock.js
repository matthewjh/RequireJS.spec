define([], function () {
  'use strict';

  var config,
      getConfigMock;

  afterEach(function () {
    for (var prop in config) {
      if (config.hasOwnProperty(prop)) {
        delete config[prop];
      }
    };
  });

  config = {};

  return config;
});
