define([
  'wrappers/define-impl',
  'wrappers/factory',
  'original-define',
  'logger',
  'config'
  ], function (defineWrapper, wrapFactory, originalDefine, logger, config) {
  'use strict';

  describe('define wrapper', function () {
    var noOpFactory,
        wrappedNoOpFactory;

    beforeEach(function () {
      noOpFactory = function () {};
      wrappedNoOpFactory = function () {};

      wrapFactory.withArgs(noOpFactory).returns(wrappedNoOpFactory);
    });

    it('should log when verbose mode is on', function () {
      config.verboseMode = true;

      defineWrapper();

      expect(logger.callCount).toBe(1);
    });

    it('should preserve access to the amd property', function () {
      expect(defineWrapper.amd).toBe(originalDefine.amd);
    });

    describe('when called with just a factory function', function () {
      it('should call originalDefine with the factory function', function () {
        defineWrapper(noOpFactory);

        expect(originalDefine.withArgs(wrappedNoOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with an id and a factory function', function () {
      it('should call originalDefine with the id and the factory function', function () {
        var id;

        id = 'some-module-id';

        defineWrapper(id, noOpFactory);

        expect(originalDefine.withArgs(id, wrappedNoOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with dependencies and a factory function', function () {
      it('should call originalDefine with the dependencies and factory function', function () {
        var dependencies;

        dependencies = [];

        defineWrapper(dependencies, noOpFactory);

        expect(originalDefine.withArgs(dependencies, wrappedNoOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with an id, dependencies and a factory function', function () {
      it('should call originalDefine with the id, dependencies, and factory function', function () {
        var dependencies,
            id;

        dependencies = [];
        id = 'some-module-id';

        defineWrapper(id, dependencies, noOpFactory);

        expect(originalDefine.withArgs(id, dependencies, wrappedNoOpFactory).callCount).toBe(1);
      });
    });

    describe('when called with dependencies including an impl module', function () {
      it('should call originalDefine with the correctly resolved dependencies', function () {
        var dependencies,
            id,
            resolvedDependencies;

        config.implRegex = /impl\~/;
        config.mockPath = 'mock/';
        config.mockSuffix = '.mock';
        config.neverMock = ['library'];

        id = 'some-module-id';
        dependencies = ['library', 'impl~unit-under-test', 'unit-not-under-test', 'unit-not-under-test2'];
        resolvedDependencies = ['module', 'library', 'unit-under-test', 'mock/unit-not-under-test.mock.js', 'mock/unit-not-under-test2.mock.js'];

        defineWrapper(id, dependencies, noOpFactory);

        expect(originalDefine.withArgs(id, resolvedDependencies, wrappedNoOpFactory).callCount).toBe(1);
      });
    });
  });
});
