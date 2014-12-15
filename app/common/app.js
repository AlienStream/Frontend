angular.module('alienstreamApp')
  .controller('AppCtrl', ['$scope','api', function ($scope, api) {
    $scope.menu_items = [
    {title:"test"},{title:"messy"},{title:"blank"},
    ];
  }]);