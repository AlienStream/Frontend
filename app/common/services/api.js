 angular.
 	module('alienstreamApp')
 		.service('api', ['$http', '$q', function($http, $q) {
 			//meta data request functions
 			this.trending = function() {

 			}

 			this.get = function(url,params) {
 				var differed = $q.defer();
 				$http.get("http://api.alienstream.com/"+url+"/?"+params)
 					.success(function(result){
 						differed.resolve(result);
 					})
 				return differed.promise;
 			}


 			this.post = function(url, data) {
 				var differed = $q.defer();
 				$http.post("http://api.alienstream.com/"+url + "/",data)
 					.success(function(result){
 						differed.resolve(result);
 					})
 				return differed.promise;
 			}
 		}]);
