angular.module('alienstreamApp')
  .controller('AppCtrl', ['$scope','api', 'user', function ($scope, api, user) {
  	$scope.user = user;
  }]);