define([
  'wrappers/factory-impl',
  'wrappers/export-factory',
  'config',
  'logger',
  'sinon'
  ], function (wrapFactory, exportFactory, config, logger, sinon) {
    'use strict';

    describe('a wrapped factory function', function () {
      var actualModuleExport,
          dependency1,
          dependency2,
          excludedDependency,
          factory,
          wrappedExport,
          wrappedFactory;

      beforeEach(function () {
        actualModuleExport = {};

        factory = sinon.stub();
        factory.returns(actualModuleExport);
        wrappedFactory = wrapFactory(factory);

        wrappedExport = {
          get: sinon.stub()
        };
        exportFactory.returns(wrappedExport);

        excludedDependency = 'excluded-dependency';
        config.isExcludedModule.withArgs('excluded-dependency').returns(true);

        dependency1 = {
          get: function () {
            return 'dependency-1';
          },
          isRJSSExport: true
        };

        dependency2 = {
          get: function () {
            return 'dependency-2';
          },
          isRJSSExport: true
        };

        config.specRegex = /\.spec$/;
      });

      describe('when the module is a spec', function () {
        var specModule;

        beforeEach(function () {
          specModule = {
            id: 'some-module-id.spec'
          };
        });

        it('should call through to the wrapped factory with the correct dependencies', function () {
          var exportValue = wrappedFactory(specModule, dependency1, dependency2);

          expect(factory.withArgs(dependency1, dependency2).callCount).toBe(1);
          expect(exportValue).toBe(actualModuleExport);
        });

        it('should log', function () {
          wrappedFactory(specModule);

          expect(logger.callCount).toBe(1);
        });
      });

      describe('when the module is a library', function () {
        var module;

        beforeEach(function () {
          config.isExcludedModule.withArgs('library').returns(true);
          module = {
            id: 'library'
          };
        });

        it('should call through to the wrapped factory with the correct dependencies', function () {
          var exportValue = wrappedFactory(module, dependency1, dependency2);

          expect(factory.withArgs(dependency1, dependency2).callCount).toBe(1);
          expect(exportValue).toBe(actualModuleExport);
        });

        it('should log', function () {
          wrappedFactory(module);

          expect(logger.callCount).toBe(1);
        });
      });

      describe('when the module isn\'t a test spec or a library', function () {
        var module;

        beforeEach(function () {
          config.isExcludedModule.withArgs('some-module-id').returns(false);
          module = {
            id: 'some-module-id'
          };
        });

        it('should return a wrapped export', function () {
          var exportObject = wrappedFactory(module);

          expect(exportObject).toBe(wrappedExport);
        });

        describe('the export getter function passed to exportFactory', function () {
          it('should call through to the wrapped factory with the correct dependencies', function () {
            var getterReturnValue;

            wrappedFactory(module, dependency1, dependency2, excludedDependency);

            getterReturnValue = exportFactory.firstCall.args[0]();

            expect(factory.withArgs(dependency1.get(), dependency2.get(), excludedDependency).callCount).toBe(1);
            expect(getterReturnValue).toBe(actualModuleExport);
          });

          it('should log', function () {
            wrappedFactory(module);

            exportFactory.callArg(0);

            expect(logger.callCount).toBe(1);
          });
        });
      });

    });
  });
