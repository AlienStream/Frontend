angular.module('alienstreamApp')
    .controller('ArtistCtrl', ["$scope", "$state", "$stateParams","api","AlienPlayer", "user",
   		function($scope, $state, $stateParams, api, AlienPlayer, user) {
            $scope.AlienPlayer = AlienPlayer
            var current_state = $state.$current.self.name;

   			if(current_state == "app.artist") {
               var artist = {}
               artist.id = $stateParams.id

               api.get("artist/" + artist.id,"")
                  .then(function(response) {
                  for(var key in response.data){
                     artist[key] = response.data[key];
                     $scope.section_title = artist.name
                  }
               });
               

               $scope.artist = artist
   			}
		   }
      ]
   );
