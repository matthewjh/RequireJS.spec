define([
  'config-impl'
  ], function (config) {
  'use strict';

  describe('config', function () {
    it('should have the default impl regex', function () {
      expect(config.implRegex).toEqual(/^impl\~/);
    });

    it('should have the default spec regex', function () {
      expect(config.specRegex).toEqual(/\.spec$/);
    });

    it('should have the default mock suffix', function () {
      expect(config.mockSuffix).toEqual('.mock');
    });

    it('should have the default verbose mode flag', function () {
      expect(config.verboseMode).toEqual(false);
    });

    it('should have the default neverMock list', function () {
      expect(config.neverMock).toEqual([]);
    });
  });
})
