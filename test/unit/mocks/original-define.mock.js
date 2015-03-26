define([
  'sinon',
  ], function (sinon) {
    var originalDefine;

    originalDefine = sinon.stub();

    afterEach(function () {
      originalDefine.reset();
    });

    return originalDefine;
  });
