angular.module('alienstreamApp')
    .controller('CommunityCtrl', ["$scope", "$state", "$stateParams","api","AlienPlayer", "user",
   		function($scope, $state, $stateParams, api, AlienPlayer, user) {
   			$scope.AlienPlayer = AlienPlayer

   			var current_state = $state.$current.self.name;

   			if(current_state == "app.create.community") {
   				$scope.section_title = "Create A Community"


   				$scope.CreateCommunity = function() {
                  var source = {
                     description: "",
                     title: $scope.source,
                     thumbnail: "",
                     url: $scope.source,
                  }

   					var community = {
   						name:$scope.name,
   						description:$scope.description,
   						thumbnail:$scope.thumbnail,
   						moderator:$scope.moderator,
   						sources:[source],
   					}

   					api.post("community/"+community.name,community)
   				}

   			}

   			if(current_state == "app.explore") {
   				$scope.section_title = "Discover Great New Music"
               api.get("communities/trending").then(function(communities) {
                  $scope.communities = communities.data
               })
   			}

   			if(current_state == "app.mycommunities") {
   				$scope.section_title = "My Communities";
               $scope.communities = [];
               api.get("user/"+user.getUserId()+"/favorited_communities").then(function(communities) {         
                  communities.data.forEach(function(community) {
                     for (var i = 0; i < $scope.communities.length; i++) {
                        if ($scope.communities[i].id === community.id) return;
                     }     
                     $scope.communities.push(community)
                  });
               })
               api.get("user/"+user.getUserId()+"/moderated_communities").then(function(communities) {
                  communities.data.forEach(function(community) {
                     for (var i = 0; i < $scope.communities.length; i++) {
                           if ($scope.communities[i].id === community.id) return;
                     }
                     $scope.communities.push(community)
                  });
               })
               $scope.show_create = true;
   			}

   			if(current_state == "app.community") {
   				$scope.section_title = $stateParams.community_name

			    var community = {}
		        community.name = $stateParams.community_name

		        //get info
		        api.get("community/" + community.name,"")
		 			.then(function(response) {
		 				for(var key in response.data){
						    community[key] = response.data[key];
						}
		 			});


		        $scope.community = community
   			}
		   }
      ]
   );
