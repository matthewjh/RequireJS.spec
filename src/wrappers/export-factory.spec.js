define([
  'wrappers/export-factory-impl',
  'test-framework/run-before-test',
  'logger',
  'sinon'
  ], function (exportFactory, runBeforeTest, logger, sinon) {
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

      it('should log when exporting an undefined value', function () {
        var exportObject;

        exportObject = exportFactory(function () {
          return undefined;
        });

        runBeforeTest.callArg(0);

        exportObject.get();

        expect(logger.callCount).toBe(1);
      });

      describe('.get', function () {
        it('should call the getter once per time that the runBeforeTest callback has been invoked', function () {
          expect(getter.callCount).toBe(0);

          runBeforeTest.callArg(0);

          exportObject.get();
          // Get and cache value
          expect(getter.callCount).toBe(1);

          exportObject.get();
          // No more calls
          expect(getter.callCount).toBe(1);

          // Dirty the value
          runBeforeTest.callArg(0);

          exportObject.get();
          // Get and cache value
          expect(getter.callCount).toBe(2);

          exportObject.get();
          // No more calls
          expect(getter.callCount).toBe(2);
        });
      });
    });

  });
