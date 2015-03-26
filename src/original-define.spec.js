define([
  'original-define-impl',
  'window',
  ], function (originalDefine, window) {
  'use strict';

  describe('originalDefine', function () {
    it('should be window.define', function () {
      expect(originalDefine).toBe(window.define);
    });
  });
});
