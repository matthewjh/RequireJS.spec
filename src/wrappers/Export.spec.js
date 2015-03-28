define([
  'wrappers/Export-impl',
  'sinon'
  ], function (Export, sinon) {
    'use strict';

    describe('an export wired to an object', function () {
      var wiredObject,
          wrappedExport;

      beforeEach(function () {
        wiredObject = {
          a: 5,
          b: 6
        };

        wrappedExport = new Export();
        wrappedExport.wireTo(wiredObject);
      });

      describe('return value of .get', function () {
        var object;

        beforeEach(function () {
          object = wrappedExport.get();
        });

        it('should be an object that allows access to the original object\'s properties', function () {
          _.forOwn(wiredObject, function (value, key) {
            expect(object[key]).toBe(value);
          });
        });

        describe('after wiring to a different object', function () {
          var newWiredObject;

          beforeEach(function () {
            newWiredObject = {
              a: 6,
              b: 2,
              c: 'hello'
            };
            wrappedExport.wireTo(newWiredObject);
          });

          it('should no longer be an object allows access to the original object\'s properties', function () {
            _.forOwn(wiredObject, function (value, key) {
              expect(object[key]).not.toBe(value);
            });
          });

          it('should be an object that allows access to the new object\'s properties', function () {
            _.forOwn(newWiredObject, function (value, key) {
              expect(object[key]).toBe(value);
            });
          });
        });

        describe('after wiring to a function', function () {
          var wiredFunction,
              wiredFunctionReturnValue;

          beforeEach(function () {
            wiredFunction = sinon.stub();
            wiredFunction.a = 6;

            wiredFunctionReturnValue = {};
            wiredFunction.returns(wiredFunctionReturnValue);

            wrappedExport.wireTo(wiredFunction);
          });

          it('should call through to the wired function when called', function () {
            object(1, 2, 3);

            expect(wiredFunction.withArgs(1, 2, 3).callCount).toBe(1);
          });

          it('should return the same value as the wired function when called', function () {
            var returnValue;

            returnValue = object();

            expect(returnValue).toBe(wiredFunctionReturnValue);
          });

          it('should be an object that allows access to the wired function\'s properties', function () {
            _.forOwn(wiredFunction, function (value, key) {
              expect(object[key]).toBe(value);
            });
          });
        });
      });
    });
  });
