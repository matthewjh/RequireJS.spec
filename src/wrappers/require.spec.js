define([
  'wrappers/require-impl',
  'original-require',
  'wrappers/require.config'
  ], function (requireWrapper, originalRequire, requireConfigWrapper) {
  'use strict';

  describe('require wrapper', function () {
    it('should call originalRequire when called', function () {
      var arg;

      arg = 'some-arg';

      requireWrapper(arg);

      expect(originalRequire.withArgs(arg).callCount).toBe(1);
    });

    it('should preseve access to arbitary properties on originalRequire', function () {
      expect(requireWrapper.someProperty).toEqual('some-value');
    });

    it('should assign .config to requireConfigWrapper', function () {
      expect(requireWrapper.config).toBe(requireConfigWrapper);
    });
  });
});
