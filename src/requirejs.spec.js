define([
  'requirejs-impl',
  'window'
  ], function (requirejs, window) {
  'use strict';

  describe('requirejs', function () {
    it('should have a require property that is window.require', function () {
      expect(requirejs.require).toBe(window.require);
    });

    it('should have a define property that is window.define', function () {
      expect(requirejs.define).toBe(window.define);
    });
  });
})
