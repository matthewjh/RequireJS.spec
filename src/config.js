define([
  'lodash'
  ], function (_) {
  'use strict';

  return {
    //Default values
    implRegex: /^impl\~/,
    mockSuffix: '.mock',
    neverMock: [],
    specRegex: /\.spec$/,
    verboseMode: false,

    /*
     * Returns true if the dependency is excluded from mocking and wrapping as per the neverMock array.
     */
    isExcludedModule: function (moduleId) {
      return _.contains(this.neverMock, moduleId);
    }
  };
});
