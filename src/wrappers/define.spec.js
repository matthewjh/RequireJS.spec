define([
  'wrappers/define-impl',
  'window'
  ], function (defineWrapper, window) {
  'use strict';

  describe('define wrapper', function () {
    it('should preserve access to the amd property', function () {
      expect(defineWrapper.amd).toBe(window.define.amd);
    });
  });
});
