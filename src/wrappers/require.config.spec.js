define([
  'wrappers/require.config-impl',
  'original-require'
  ], function (requireConfigWrapper, originalRequire) {
  'use strict';

  describe('requireConfigWrapper', function () {
    it('should call through to originalRequire', function () {
      var arg;

      arg = 'some-arg';

      requireConfigWrapper(arg);

      expect(originalRequire.config.withArgs(arg).callCount).toBe(1);
    });
  });
});
