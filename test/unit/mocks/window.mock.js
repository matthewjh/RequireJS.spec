define([
  'sinon'
  ], function (sinon) {
  var getWindowMock,
      windowMock;

  getWindowMock = function () {
    var mock;

    mock = {
      require: sinon.stub(),
      define: sinon.stub()
    };

    // https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property-
    mock.define.amd = {};

    return mock;
  };

  windowMock = getWindowMock();

  afterEach(function () {
    windowMock = getWindowMock();
  });

  return windowMock;
});
