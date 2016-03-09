angular.
 	module('alienstreamApp')
 		.service('api', ['$http', '$q', 'user', function($http, $q, user) {

 			var base_url = "http://api.alienstream.com/"

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

 				$http.get(full_url, {withCredentials: true})
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
 					})
 				return differed.promise;
 			}


 			this.post = function(url, data) {
 				var differed = $q.defer();
 				$http.post(base_url+url,data, {withCredentials: true})
 					.success(function(result){
 						differed.resolve(result);
 					})
 					.error(function(result){
 						differed.reject(result);
 					})
 				return differed.promise;
 			}

 			this.delete = function(url, data) {
 				var differed = $q.defer();
 				$http.delete(base_url+url, {withCredentials: true})
 					.success(function(result){
 						differed.resolve(result);
 					})
 					.error(function(result){
 						differed.reject(result);
 					})
 				return differed.promise;
 			}
 		}]);
