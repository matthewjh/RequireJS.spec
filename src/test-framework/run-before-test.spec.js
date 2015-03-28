define([
  'test-framework/run-before-test-impl',
  'window'
  ], function (runBeforeTest, window) {
    'use strict';

    it('should be window.beforeEach when the test framework is karma', function () {
      expect(runBeforeTest).toBe(window.beforeEach);
    });
  });
