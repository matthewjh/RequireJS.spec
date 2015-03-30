define([
  'sinon'
  ], function (sinon) {
  'use strict';

  var exportFactory;

  exportFactory = sinon.stub();

  afterEach(function () {
    exportFactory.reset();
  });

  return exportFactory;
})
