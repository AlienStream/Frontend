 angular.
 	module('alienstreamApp').
		 factory('user', function() {
		    var loggedIn = false;
		    var userName, userId;

		    if(localStorage.getItem('user')) {
		    	var user = JSON.parse(localStorage.getItem('user'))
		    	loggedIn = true;
		    	userName = user['name'];
		    	userId = user['id'];	
		    }

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
		    		this.storeUser(user)
		    	},

		    	clearUser: function() {
		    		localStorage.setItem('user', '')
		    	},

		    	storeUser: function(user) {
		    		localStorage.setItem('user', JSON.stringify(user));
		    	}
		    };
		  });