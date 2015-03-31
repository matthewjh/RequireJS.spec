define([
  'sinon',
  ], function (sinon) {
    var logger;

    logger = sinon.stub();

    afterEach(function () {
      logger.reset();
    });

    return logger;
  });
