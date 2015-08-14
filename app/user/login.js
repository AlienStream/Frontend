'use strict';

angular.module('alienstreamApp')
  .controller('LoginCtrl', ['$scope', 'api', 'user', '$location', function ($scope, api, user, $location) {
  	$scope.signIn = function(old_user) {
  		api.post("auth/login", old_user)
  			.then(function(result){
          user.authenticate(result.data);
          $location.path("app/explore");
  			}, function(result){
  				alert(result.status.message);
  			})
  	}
  }]);
