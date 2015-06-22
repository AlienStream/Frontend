'use strict';

angular.module('alienstreamApp')
  .controller('SignupCtrl', ['$scope', 'api', function ($scope, api) {
  	$scope.signUp = function(user) {
  		api.post("auth/register", user)
  			.then(function(result){
  				alert(result.status.message);
  			}, function(result){
  				alert(result.status.message);
  			})
  	}
  }]);
