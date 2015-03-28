define([
  'wrappers/factory-impl',
  'wrappers/Export',
  'sinon'
  ], function (wrapFactory, Export, sinon) {
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
          get: sinon.stub()
        };
        exportObjectGetValue = {};
        exportObject.get.returns(exportObjectGetValue);

        Export.returns(exportObject);
      });

      it('should return the value of exportObject.get()', function () {
        expect(wrappedFactory()).toBe(exportObjectGetValue);
      });

      describe('when called', function () {
        it('should call through to the original factory', function () {
          wrappedFactory(1, 2, 3);

          expect(factory.withArgs(1, 2, 3).callCount).toBe(1);
        });
      });
    });
  });
