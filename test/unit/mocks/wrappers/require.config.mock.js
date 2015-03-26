define([
  'sinon'
  ], function (sinon) {
  'use strict';

  var wrappedRequireConfig;

  wrappedRequireConfig = sinon.stub();

  afterEach(function () {
    wrappedRequireConfig.reset();
  });

  return wrappedRequireConfig;
})
