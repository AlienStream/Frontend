'use strict';

angular.module('alienstreamApp')
  .directive('navback', function () {
    return {
      template:'<a ng-click="back()"><i class="fa fa-chevron-left"></i> Back</a>',
      restrict: 'E',
	  link: function postLink(scope, element, attrs) {
	  	if(!scope.previousState_name) {
 			element.css("display","none")
 		}
      }
    };
  });