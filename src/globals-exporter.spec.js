define([
  'globals-exporter-impl',
  'window',
  'wrappers/define',
  'wrappers/require'
  ], function (globalsExporter, window, wrappedDefine, wrappedRequire) {
  'use strict';

  describe('when globalsExporter is called', function () {
    it('should set window.define to wrappedDefine', function () {
      globalsExporter();

      expect(window.define).toBe(wrappedDefine);
    });

    it('should set window.require to wrappedRequire', function () {
      globalsExporter();

      expect(window.require).toBe(wrappedRequire);
    });
  });
});
