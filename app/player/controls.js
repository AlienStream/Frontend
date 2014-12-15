'use strict';

angular.module('alienstreamApp')
  .directive('controls', function () {
    return {
      templateUrl:"player/controls.html",
      restrict: 'E',
	  link: function postLink(scope, element, attrs) {
	  	setInterval(function(){
			$(".center_content .progress .progress-bar").css("width",100*scope.AlienPlayer.current_track.progress + "%")
		},200)
      }
    };
  });
