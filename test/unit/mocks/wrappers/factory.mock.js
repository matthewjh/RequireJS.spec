define([
  'sinon'
  ], function (sinon) {
  'use strict';

  var wrapFactory;

  wrapFactory = sinon.stub();

  afterEach(function () {
    wrapFactory.reset();
  });

  return wrapFactory;
})
