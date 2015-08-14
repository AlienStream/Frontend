angular.module('alienstreamApp')
  .controller('AppCtrl', ['$scope','api', 'user', '$location', function ($scope, api, user, $location) {
  	$scope.user = user;

  	$scope.showTrack = function(track_id) {
  		$location.path('app/track/'+track_id);
  	}

  	$scope.showArtist = function(artist_id) {
  		$location.path('app/artist/'+artist_id);
  	}
  }]);