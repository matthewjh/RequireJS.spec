define([
  'sinon'
  ], function (sinon) {
  'use strict';

  var wrappedRequire;

  wrappedRequire = sinon.stub();

  afterEach(function () {
    wrappedRequire.reset();
  });

  return wrappedRequire;
})
