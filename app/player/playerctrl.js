angular.module('alienstreamApp')
  .controller('PlayerCtrl', ['$scope', 'AlienPlayer','api', function ($scope, AlienPlayer, api) {
  	$scope.AlienPlayer = AlienPlayer;

	$scope.$watch("AlienPlayer.current_track.state", function(state) {
		if(state == "failed" || state == "ended") {
			$scope.AlienPlayer.next();
		}
	});

	$scope.load = function(subreddit) {
		AlienPlayer.load(subreddit,{t:"month"})
	}

	$scope.thumbnail = function(image) {
		if(image == "") {
			return("/assets/images/alienicon.jpg")
		}
		return image.replace('maxresdefault','default')
	}
	
  }]);
