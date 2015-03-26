define([
  'wrappers/require.config-impl',
  'original-require',
  'config'
  ], function (requireConfigWrapper, originalRequire, config) {
  'use strict';

  var configWithMockProps,
      configWithoutMockProps;

  beforeEach(function () {
    configWithMockProps = {
      baseUrl: 'some-base-url',
      mockPath: 'some-mock-path'
    };

    configWithoutMockProps = {
      baseUrl: 'some-base-url',
    };
  });

  describe('requireConfigWrapper', function () {
    it('should call through to originalRequire', function () {
      var arg;

      arg = 'some-arg';

      requireConfigWrapper(arg);

      expect(originalRequire.config.withArgs(arg).callCount).toBe(1);
    });

    it('should assign the passed config object to our config object', function () {
      requireConfigWrapper(configWithMockProps);

      expect(config.baseUrl).toEqual('some-base-url');
      expect(config.mockPath).toEqual('some-mock-path');
    });

    describe('when called with a config contain mocking-related properties', function () {
      it('should call through to originalRequire passing through the config minus the mock properties', function () {
        requireConfigWrapper(configWithMockProps);

        expect(originalRequire.config.withArgs(configWithoutMockProps).callCount).toBe(1);
      });
    });
  });
});
