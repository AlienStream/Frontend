 angular
	.module('alienstreamApp')
		.service('utils', function() {

			this.isEmptyObject = function(obj) {
			    var name;
			    for (name in obj) {
			        return false;
			    }
			    return true;
			}

		});