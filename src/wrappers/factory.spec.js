define([
  'wrappers/factory-impl',
  'wrappers/export-factory',
  'test-framework/run-before-test',
  'sinon'
  ], function (wrapFactory, exportFactory, runBeforeTest, sinon) {
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

        exportObjectGetValue = {};
        exportObject = {
          get: sinon.stub()
        };
        exportObject.get.returns(exportObject);
        exportFactory.returns(exportObject);

      });

      it('should return the value of exportObject.get()', function () {
        expect(wrappedFactory()).toBe(exportObjectGetValue);
      });

      describe('when called', function () {
        it('should add a runBeforeTest callback', function () {
          wrappedFactory();

          expect(runBeforeTest.withArgs(sinon.match.func).callCount).toBe(1);
        });
      });
    });
  });
