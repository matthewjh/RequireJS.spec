define([
  'globals-exporter-impl',
  'window',
  'wrappers/define'
  ], function (globalsExporter, window, wrappedDefine) {
  'use strict';

  describe('when globalsExporter is called', function () {
    it('should set window.define to wrappedDefine', function () {
      globalsExporter();

      expect(window.define).toBe(wrappedDefine);
    });
  });
});
