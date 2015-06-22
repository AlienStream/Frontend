'use strict';

angular.module('alienstreamApp')
  .controller('LoginCtrl', ['$scope', 'api', function ($scope, api) {
  	$scope.signIn = function(user) {
  		api.post("auth/login", user)
  			.then(function(result){
  				alert(result.status.message);
  			}, function(result){
  				alert(result.status.message);
  			})
  	}
  }]);
