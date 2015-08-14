angular.
 	module('alienstreamApp')
 		.service('api', ['$http', '$q', 'user', function($http, $q, user) {

 			var base_url = "http://api.alienstream.dev/"
 			//meta data request functions
 			this.trending = function() {

 			}

 			this.get = function(url, params, force_refresh) {
 				var differed = $q.defer();
 				var full_url = base_url+url;
 				if (params !== undefined) {
 					full_url+="/?"+params;
 				}

 				try {
 					var data = localStorage.getItem(full_url);
 				} catch(e) {
 					console.log(e);
 				}

 				if (force_refresh !== true && data !== null && data.expires <= Date.now()) {
 					differed.resolve(data);
 					return differed.promise
 				}

 				$http.get(full_url)
 					.success(function(result){
 						try {
 							result.expires = Date.now() + 1000*60*15;
 							localStorage.setItem(full_url, result);
 						} catch(e) {
 							console.log(e);
 						}
 						differed.resolve(result);
 					})
 					.error(function(result){
 						differed.reject(result);
 						user.clearUser();
 					})
 				return differed.promise;
 			}


 			this.post = function(url, data) {
 				var differed = $q.defer();
 				$http.post(base_url+url,data)
 					.success(function(result){
 						differed.resolve(result);
 					})
 					.error(function(result){
 						user.clearUser();
 						differed.reject(result);
 					})
 				return differed.promise;
 			}
 		}]);
