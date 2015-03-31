define([
  'logger-impl',
  'window',
  'config',
  ], function (logger, window, config) {
  'use strict';

  describe('logger', function () {

    it('should call through to window.console.log if verbose mode is on', function () {
      config.verboseMode = true;

      logger(0, 1, 2);

      expect(window.console.log.withArgs(0, 1, 2).callCount).toBe(1);
    });

    it('should not call through to window.console.log if verbose mode is off', function () {
      config.verboseMode = false;

      logger();

      expect(window.console.log.callCount).toBe(0);
    });

  });
});
