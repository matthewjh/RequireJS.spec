define([
  'config-impl'
  ], function (config) {
  'use strict';

  describe('config', function () {
    it('should have the default impl regex', function () {
      expect(config.implRegex).toEqual(/^impl\~/);
    });

    it('should have the default mock suffix', function () {
      expect(config.mockSuffix).toEqual('.mock');
    });
  });
})
