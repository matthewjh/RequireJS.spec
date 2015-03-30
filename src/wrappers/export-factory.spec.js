define([
  'wrappers/export-factory-impl',
  'sinon'
  ], function (exportFactory, sinon) {
    'use strict';

    describe('export object', function () {
      var exportObject,
          getter,
          object;

      beforeEach(function () {
        object = 'some-object';
        getter = sinon.stub();
        getter.returns(object);
        exportObject = exportFactory(getter);
      });

      describe('.get', function () {
        it('should return the cached object returned by the getter', function () {
          expect(exportObject.get()).toBe(object);

          getter.returns('some-other-object');
          expect(exportObject.get()).toBe(object);
        });

        it('should return a new object returned by the getter after .reset is called', function () {
          var otherObject = 'some-other-object';

          getter.returns(otherObject);

          exportObject.reset();
          expect(exportObject.get()).toBe(otherObject);
        });
      });
    });

  });
