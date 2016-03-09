'use strict';

angular.module('alienstreamApp')
  .controller('LoginCtrl', ['$scope', 'api', '$location', function ($scope, api, $location) {
  	$scope.signIn = function(old_user) {
  		api.post("auth/login", old_user)
  			.then(function(result){
          $scope.user.authenticate(result.data);
          $location.path("app/explore");
  			}, function(result){
  				alert(result.status.message);
  			})
  	}
  }]);
