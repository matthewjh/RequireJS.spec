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

        it('should be an object allows access to the original object\'s properties', function () {
          _.forOwn(wiredObject, function (value, key) {
            expect(object[key]).toBe(value);
          });
        });

        describe('after wiring to a different object', function () {
          var newWireObject;

          beforeEach(function () {
            newWireObject = {
              a: 6,
              b: 2,
              c: 'hello'
            };
            wrappedExport.wireTo(newWireObject);
          });

          it('should no longer be an object allows access to the original object\'s properties', function () {
            _.forOwn(wiredObject, function (value, key) {
              expect(object[key]).not.toBe(value);
            });
          });

          it('should be an object allows access to the original object\'s properties', function () {
            _.forOwn(newWireObject, function (value, key) {
              expect(object[key]).toBe(value);
            });
          });
        });
      });
    });
  });
