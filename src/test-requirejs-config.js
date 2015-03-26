'use strict';

var allImplFiles,
    allTestFiles,
    getMockMap,
    getPathToModule,
    implModuleSuffix,
    implFileRegex,
    mockModulesPath,
    mockModuleSuffix,
    onRequireJsReady,
    testFileRegex;

allImplFiles = [];
allTestFiles = [];
implModuleSuffix = '-impl';
implFileRegex = /^\/base\/src.*\.js$/i;
mockModulesPath = '../test/unit/mocks/';
mockModuleSuffix = '.mock';
testFileRegex = /(spec|test)\.js$/i;

getPathToModule = function getPathToModule (path) {
  return path.replace(/^\/base\/src\//, '').replace(/\.js$/, '');
};

// generate requirejs map so that mock modules can be injected into units under test
getMockMap = function getMockMap (testFiles) {
  var map;

  map = {
    '*': {}
  };

  testFiles.forEach(function (testModuleName) {
    map['*'][testModuleName] = mockModulesPath + testModuleName + mockModuleSuffix;
    map['*'][testModuleName + implModuleSuffix] = testModuleName;
  });

  return map;
};

onRequireJsReady = function onRequireJsReady () {
  require(allTestFiles, function () {
    window.__karma__.start();
  });
};

Object.keys(window.__karma__.files).forEach(function (file) {
  if (testFileRegex.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(getPathToModule(file));
  } else if (implFileRegex.test(file)) {
    allImplFiles.push(getPathToModule(file));
  }
});

require.config({
  baseUrl: '/base/src',
  paths: {
    'sinon': '../bower_components/sinon/index'
  },
  shim: {
    'sinon': {
      exports: 'sinon'
    }
  },
  map: getMockMap(allImplFiles),
  callback: onRequireJsReady
});
