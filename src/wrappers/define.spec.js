define([
  'wrappers/define-impl',
  'window'
  ], function (defineWrapper, window) {
  'use strict';

  describe('define wrapper', function () {
    var noOpFactory;

    beforeEach(function () {
      noOpFactory = function () {};
    });

    it('should preserve access to the amd property', function () {
      expect(defineWrapper.amd).toBe(window.define.amd);
    });

    describe('when called with just a factory function', function () {
      it('should call window.define with the factory function', function () {
        defineWrapper(noOpFactory);

        expect(window.define.withArgs(null, null, noOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with an id and a factory function', function () {
      it('should call window.define with the id and the factory function', function () {
        var id;

        id = 'some-module-id';

        defineWrapper(id, noOpFactory);

        expect(window.define.withArgs(id, null, noOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with dependencies and a factory function', function () {
      it('should call window.define with the dependencies and factory function', function () {
        var dependencies;

        dependencies = [];

        defineWrapper(dependencies, noOpFactory);

        expect(window.define.withArgs(null, dependencies, noOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with an id, dependencies and a factory function', function () {
      it('should call window.define with the id, dependencies, and factory function', function () {
        var dependencies,
            id;

        dependencies = [];
        id = 'some-module-id';

        defineWrapper(id, dependencies, noOpFactory);

        expect(window.define.withArgs(id, dependencies, noOpFactory).callCount).toBe(1);
      });
    });
  });
});
