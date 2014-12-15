angular.module('alienstreamApp')
    .controller('CommunityCtrl', ["$scope", "$state", "$stateParams","api","AlienPlayer",
   		function($scope, $state, $stateParams, api, AlienPlayer) {
   			$scope.AlienPlayer = AlienPlayer

   			var current_state = $state.$current.self.name;

   			if(current_state == "app.create.community") {
   				$scope.section_title = "Create A Community"


   				$scope.CreateCommunity = function() {
                  var source = {
                     Description: "",
                     Title: $scope.source,
                     Thumbnail: "",
                     Type: "reddit",
                     URL: $scope.source,
                  }

   					var community = {
   						name:$scope.name,
   						description:$scope.description,
   						thumbnail:$scope.thumbnail,
   						moderator:$scope.moderator,
   						sources:[source],
   					}

   					api.post("community/"+community.name+"/create",community)
   				}

   			}

   			if(current_state == "app.explore") {
   				$scope.section_title = "Discover Great New Music"
               api.get("community/trending").then(function(communities) {
                  $scope.communities = communities
               })
   			}

   			if(current_state == "app.mycommunities") {
   				$scope.section_title = "My Communities"
   			}

   			if(current_state == "app.community") {
   				$scope.section_title = $stateParams.community_name

			    var community = {}
		        community.name = $stateParams.community_name

		        //get info
		        api.get("community/" + community.name,"")
		 			.then(function(data) {
		 				for(var key in data){
						    community[key] = data[key];
						}
						console.log(community)
		 			});

		        //get tracks
		        api.get("community/" + community.name + "/tracks","sort=top&t=week")
		 			.then(function(data) {community.Tracks = data;console.log(data)});

		        $scope.community = community
   			}

		}
	]);
