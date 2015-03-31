define([
  'logger-impl',
  'window',
  ], function (logger, window) {
  'use strict';

  describe('logger', function () {

    it('should call through to window.console.log', function () {
      logger(0, 1, 2);

      expect(window.console.log.withArgs(0, 1, 2).callCount).toBe(1);
    });

  });
});
