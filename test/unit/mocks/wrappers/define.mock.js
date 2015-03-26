define([
  'sinon'
  ], function (sinon) {
  'use strict';

  var wrappedDefine;

  wrappedDefine = sinon.stub();

  afterEach(function () {
    wrappedDefine.reset();
  });

  return wrappedDefine;
})
