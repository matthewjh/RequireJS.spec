define([
  'sinon',
  ], function (sinon) {
    var runBeforeTest;

    runBeforeTest = sinon.stub();

    afterEach(function () {
      runBeforeTest.reset();
    });

    return runBeforeTest;
  });
