angular.module('alienstreamApp')
  .controller('AppCtrl', ['$scope','api', 'user', '$location', function ($scope, api, user, $location) {
  	$scope.user = user;

    api.get("user/me").then(function(result) {
      if (result.status.code === 200) {
        $scope.user.authenticate(result.data);
      }
    })

  	$scope.showTrack = function(track_id) {
  		$location.path('app/track/'+track_id);
  	}

  	$scope.showArtist = function(artist_id) {
  		$location.path('app/artist/'+artist_id);
  	}
  }]);