define([
  'wrappers/factory-impl',
  'wrappers/Export',
  'test-framework/run-before-test',
  'sinon'
  ], function (wrapFactory, Export, runBeforeTest, sinon) {
    'use strict';

    describe('a wrapped factory function', function () {
      var actualModuleExport,
          exportObject,
          exportObjectGetValue,
          factory,
          wrappedFactory;

      beforeEach(function () {
        actualModuleExport = {};

        factory = sinon.stub();
        factory.returns(actualModuleExport);
        wrappedFactory = wrapFactory(factory);

        exportObject = {
          get: sinon.stub(),
          wireTo: sinon.stub()
        };
        exportObjectGetValue = {};
        exportObject.get.returns(exportObjectGetValue);

        Export.returns(exportObject);
      });

      it('should return the value of exportObject.get()', function () {
        expect(wrappedFactory()).toBe(exportObjectGetValue);
      });

      describe('when called', function () {
        it('should add a runBeforeTest callback', function () {
          wrappedFactory();

          expect(runBeforeTest.withArgs(sinon.match.func).callCount).toBe(1);
        });

        describe('when the runBeforeTest callback is called', function () {
          beforeEach(function () {
            actualModuleExport = {};
            factory.withArgs(1, 2, 3).returns(actualModuleExport)

            wrappedFactory(1, 2, 3);
            runBeforeTest.callArg(0);
          });

          it('should call through to the original factory', function () {
            wrappedFactory(1, 2, 3);

            expect(factory.withArgs(1, 2, 3).callCount).toBe(1);
          });

          it('should wire the export to the return value of the factory', function () {
            expect(exportObject.wireTo.withArgs(actualModuleExport).callCount).toBe(1);
          });
        });
      });
    });
  });
