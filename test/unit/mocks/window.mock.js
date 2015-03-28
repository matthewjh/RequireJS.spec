define([
  'sinon'
  ], function (sinon) {
  var windowMock;

  windowMock = {
    require: sinon.stub(),
    define: sinon.stub(),
    beforeEach: sinon.stub()
  };

  // https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property-
  windowMock.define.amd = {};

  afterEach(function () {
    windowMock.require.reset();
    windowMock.define.reset();
    windowMock.define.amd = {};

    windowMock.beforeEach.reset();
  });

  return windowMock;
});
