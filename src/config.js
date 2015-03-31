define([], function () {
  'use strict';

  return {
    //Default values
    implRegex: /^impl\~/,
    mockSuffix: '.mock',
    neverMock: [],
    specRegex: /\.spec$/
  };
})
