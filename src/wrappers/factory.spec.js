define([
  'wrappers/factory-impl',
  'sinon'
  ], function (wrapFactory, sinon) {
    'use strict';

    describe('a wrapped factory function', function () {
      var factory,
          wrappedFactory;

      beforeEach(function () {
        factory = sinon.stub();

        wrappedFactory = wrapFactory(factory);
      });

      describe('when called', function () {
        it('should call through to the original factory', function () {
          wrappedFactory(1, 2, 3);

          expect(factory.withArgs(1, 2, 3).callCount).toBe(1);
        });
      });
    });
  });
