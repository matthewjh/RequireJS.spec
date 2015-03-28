define([
  'original-require',
  'config'
  ], function (originalRequire, config) {
  'use strict';
  var customProperties,
      requireConfigWrapper;

  customProperties = [
    'mockPath',
    'implRegex',
    'mockSuffix',
    'neverMock'
  ];

  requireConfigWrapper = function (requireConfig) {
    _.assign(config, requireConfig);

    // Delete our custom properties before forwarding the config to require.config
    // in case they cause any issues.
    customProperties.forEach(function (customProperty) {
      delete requireConfig[customProperty];
    });

    originalRequire.config(requireConfig);
  };

  return requireConfigWrapper;
});
