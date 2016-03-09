 angular.
 	module('alienstreamApp').
		 factory('user', function() {
		    var loggedIn = false;
		    var userName, userId;

		    return {
		    	isLoggedIn: function() {
		    		return loggedIn;
		    	},

		    	getUserName: function() {
		    		return userName;
		    	},

		    	getUserId: function() {
		    		return userId;
		    	},

		    	authenticate: function(user) {
		    		loggedIn = true;
		    		userName = user['name'];
		    		userId = user['id'];
		    	},
		    };
		  });