define([
  'window-impl'
  ], function (_window) {
  'use strict';

  describe('window', function () {
    it('should be the window global object', function () {
      expect(_window).toBe(window);
    });
  });
});
