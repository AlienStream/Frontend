'use strict';

describe('Controller: MyaccountCtrl', function () {

  // load the controller's module
  beforeEach(module('alienstreamApp'));

  var MyaccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyaccountCtrl = $controller('MyaccountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
