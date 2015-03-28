define([
  'sinon'
  ], function (sinon) {
  'use strict';

  var Export;

  Export = sinon.stub();

  afterEach(function () {
    Export.reset();
  });

  return Export;
})
