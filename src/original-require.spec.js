define([
  'original-require-impl',
  'window',
  ], function (originalRequire, window) {
  'use strict';

  describe('originalRequire', function () {
    it('should be window.require', function () {
      expect(originalRequire).toBe(window.require);
    });
  });
});
