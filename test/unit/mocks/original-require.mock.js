define([
  'sinon',
  ], function (sinon) {
    var originalRequire;

    originalRequire = sinon.stub();
    originalRequire.config = sinon.stub();
    originalRequire.someProperty = 'some-value';

    afterEach(function () {
      originalRequire.reset();
      originalRequire.config = sinon.stub();
    });

    return originalRequire;
  });
