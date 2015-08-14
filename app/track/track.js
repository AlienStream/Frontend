angular.module('alienstreamApp')
    .controller('TrackCtrl', ["$scope", "$state", "$stateParams","api","AlienPlayer", "user",
   		function($scope, $state, $stateParams, api, AlienPlayer, user) {
            $scope.AlienPlayer = AlienPlayer
            var current_state = $state.$current.self.name;

   			if(current_state == "app.track") {
               var track = {}
               track.id = $stateParams.id

               api.get("track/" + track.id,"")
                  .then(function(response) {
                  for(var key in response.data){
                     track[key] = response.data[key];
                     $scope.section_title = track.name
                  }
               });
               

               $scope.track = track
   			}
		   }
      ]
   );
