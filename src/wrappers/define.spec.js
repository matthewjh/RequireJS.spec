define([
  'wrappers/define-impl',
  'original-define'
  ], function (defineWrapper, originalDefine) {
  'use strict';

  describe('define wrapper', function () {
    var noOpFactory;

    beforeEach(function () {
      noOpFactory = function () {};
    });

    it('should preserve access to the amd property', function () {
      expect(defineWrapper.amd).toBe(originalDefine.amd);
    });

    describe('when called with just a factory function', function () {
      it('should call originalDefine with the factory function', function () {
        defineWrapper(noOpFactory);

        expect(originalDefine.withArgs(noOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with an id and a factory function', function () {
      it('should call originalDefine with the id and the factory function', function () {
        var id;

        id = 'some-module-id';

        defineWrapper(id, noOpFactory);

        expect(originalDefine.withArgs(id, noOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with dependencies and a factory function', function () {
      it('should call originalDefine with the dependencies and factory function', function () {
        var dependencies;

        dependencies = [];

        defineWrapper(dependencies, noOpFactory);

        expect(originalDefine.withArgs(dependencies, noOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with an id, dependencies and a factory function', function () {
      it('should call originalDefine with the id, dependencies, and factory function', function () {
        var dependencies,
            id;

        dependencies = [];
        id = 'some-module-id';

        defineWrapper(id, dependencies, noOpFactory);

        expect(originalDefine.withArgs(id, dependencies, noOpFactory).callCount).toBe(1);
      });
    });
  });
});
