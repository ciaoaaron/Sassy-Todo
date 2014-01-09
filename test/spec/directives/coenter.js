'use strict';

describe('Directive: coEnter', function () {

  // load the directive's module
  beforeEach(module('checkoffApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<co-enter></co-enter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the coEnter directive');
  }));
});
