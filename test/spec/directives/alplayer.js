'use strict';

describe('Directive: alplayer', function () {

  // load the directive's module
  beforeEach(module('alienstreamApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<alplayer></alplayer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the alplayer directive');
  }));
});
