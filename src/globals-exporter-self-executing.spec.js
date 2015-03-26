define([
  'globals-exporter-self-executing-impl',
  'globals-exporter'
  ], function (globalsExporterSelfExecuting, globalsExporter) {
  'use strict';

  describe('globalsExporterSelfExecuting', function () {
    it('should call globalsExporter', function () {
      expect(globalsExporter.callCount).toBe(1);
    });
  });
});
