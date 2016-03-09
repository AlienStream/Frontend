'use strict';

angular.module('alienstreamApp')
  .controller('FavoritesCtrl', ['$scope', 'AlienPlayer','api', function ($scope, AlienPlayer, api) {
		$scope.AlienPlayer = AlienPlayer	
		
  		$scope.favorites = {
  			'communities': [],
  			'tracks': [],
  		}

  		$scope.$watch('user.getUserId()', function() {
  			if ($scope.user.getUserId() !== undefined) {
		  		api.get('user/' + $scope.user.getUserId() + "/favorited_tracks").then(function(result) {
		  			$scope.favorites.tracks = result.data;
		  		});

		  		api.get('user/' + $scope.user.getUserId() + "/favorited_communities").then(function(result) {
		  			$scope.favorites.communities = result.data;
		  		});
  			}
  		});
	
  }]);
