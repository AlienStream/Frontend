'use strict';

angular.module('alienstreamApp')
  .directive('soundcloud', ['$window',"$q", function ($window,$q) {
    return {
      template:"",
      restrict: 'E',
	  link: function postLink(scope, element, attrs) {
	  	element = angular.element(element)
	  	scope.SoundCloud = {client_id: 'ff43d208510d35ce49ed972b01f116ab'};
	  	var SoundCloud = scope.SoundCloud;

	  	SoundCloud.init = function() {
	  		if ($window.SC) {
	  			$window.SC.initialize({
					client_id: SoundCloud.client_id
				});

				SoundCloud.api = $window.SC;
	  		}
	  	}


	  	SoundCloud.getEmbed = function(url) {
	  		var differed = $q.defer();	
			SoundCloud.api.oEmbed(url,{auto_play:true,buying:false,show_artwork:true},function(result){
					differed.resolve(result);
			})
			return differed.promise;
		}

		SoundCloud.Stop = function() {
			if(SoundCloud.widget) {
				SoundCloud.widget.pause()	
			}
		}

		SoundCloud.Pause = function() {
			if(SoundCloud.widget) {
				SoundCloud.widget.pause()
			}
		}

		SoundCloud.Resume = function() {
			if(SoundCloud.widget && scope.AlienPlayer.current_track.embeddable.url.indexOf("soundcloud.com") > -1) {
				SoundCloud.widget.play()
			}
		}

	  	SoundCloud.init();

		scope.$watch("AlienPlayer.current_track.state", function(state) {
			if(scope.AlienPlayer.current_track.embeddable && scope.AlienPlayer.current_track.embeddable.url.indexOf("soundcloud.com") > -1) {
				if (state === "paused") {
					SoundCloud.Pause()
				} else if (state === "resuming") {
					SoundCloud.Resume()
				}
			}
		})
	  	
	  	scope.$watch("AlienPlayer.current_track",function(track){
	  		if(track.embeddable && track.embeddable.url.indexOf("soundcloud.com") > -1) {
		  		if (track.state === "waiting") {
	  				$(element).show()
	  	
	  				SoundCloud.getEmbed(track.embeddable.url).then(function(result) {
	  					if(result === null) {
	  						track.state = "failed"
	  					} else {
	  						SoundCloud.widget = null;
		  					element.html(result.html)
		  					SoundCloud.widget = SoundCloud.api.Widget(element.find("iframe")[0])
		  					angular.element(element.find("iframe")[0]).attr("height","250px")

							SoundCloud.widget.bind(SoundCloud.api.Widget.Events.FINISH,function(){
								track.state = "ended"
								scope.$apply()			
							});

							SoundCloud.widget.bind(SoundCloud.api.Widget.Events.ERROR,function(){
								track.state = "failed"
								scope.$apply()			
							});

							SoundCloud.widget.bind(SoundCloud.api.Widget.Events.PAUSE,function(){
								track.state = "paused"
								scope.$apply()			
							});

							SoundCloud.widget.bind(SoundCloud.api.Widget.Events.PLAY,function(){
								track.state = "playing"
								scope.$apply()			
							});

							
	  					}
	  				})
	  			}
	      	} else {
  				$(element).hide()
  				SoundCloud.Stop()
	  		}
	  	})

		setInterval(function(){
			if(SoundCloud.widget && scope.AlienPlayer.current_track.embeddable && scope.AlienPlayer.current_track.embeddable.url.indexOf("soundcloud.com") > -1) {
				var duration = SoundCloud.widget.getDuration(function(duration){
					SoundCloud.widget.getPosition(function(current_time){
						if(duration == 0) {
							scope.AlienPlayer.current_track.progress = 0
						} else {
							scope.AlienPlayer.current_track.progress = current_time / duration
						}	
					})
				})
			}
		},200)

      }
    };
  }]);
