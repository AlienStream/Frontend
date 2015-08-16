'use strict';

angular.module('alienstreamApp')
  .directive('youtube', ['$window', function ($window) {
    return {
      template:'<div id="player"></div>',
      restrict: 'E',
	  link: function postLink(scope, element, attrs) {
	  	scope.Youtube = {"loaded":0};
	  	var Youtube = scope.Youtube;

	  	Youtube.init = function() {
	  		var tag = document.createElement('script');
			tag.src = "http://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	  	}

		$window.onYouTubeIframeAPIReady = function() {
			Youtube.loaded = 1;
		}

		Youtube.init();

		scope.$watch(function () {return Youtube.loaded;}, function(loaded){
				if(loaded) {
			  		Youtube.player = new $window.YT.Player('player', {
			  		  width: "250px",
			  		  height: "250px",
					  events: {
						'onReady': Youtube.onPlayerReady,
						'onStateChange': Youtube.onPlayerStateChange,
						'onError': Youtube.onError,
					  }
					});
			  	}
	  	})

		scope.$watch("AlienPlayer.current_track.state", function(state) {
			if(Youtube.trackCanBeHandled(scope.AlienPlayer.current_track)) {
				if (state === "paused") {
					Youtube.pause()
				} else if (state === "resuming") {
					Youtube.resume()
				}
			}
		})

	  	scope.$watch("AlienPlayer.current_track",function(track) {
  			if(Youtube.trackCanBeHandled(track)) {
  				if (track.state === "waiting") {
	  				$(element).show()
	  				track.state = "loading";
	  				Youtube.play(track.embeddable.url)
  				}
  			} else {
  				$(element).hide()
  				Youtube.stop()
  			}
	      	
	  	})

	  	Youtube.trackCanBeHandled = function(track) {
	  		if(track.embeddable && track.embeddable.url.indexOf("youtube.com") > -1) {
	  			return true;
  			}

  			if(track.embeddable && track.embeddable.url.indexOf("youtu.be") > -1) {
	  			return true;
  			}

  			return false
	  	}

	  	Youtube.stop = function() {
	  		if (Youtube.player) {
	  			Youtube.player.stopVideo();
  			}
	  	}

	  	Youtube.pause = function() {
	  		if (Youtube.player) {
	  			Youtube.player.pauseVideo();
	  		}
	  	}

	  	Youtube.resume = function() {
	  		if (Youtube.player && Youtube.trackCanBeHandled(scope.AlienPlayer.current_track)) {
	  			Youtube.player.playVideo();		
	  		}
	  	}

	  	Youtube.play = function(url) {
	  		url = url.replace("&amp;","%26");
	  		url = url.replace("attribution_link","");
	  		url = decodeURIComponent(url);
			var video_id = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
			
			while ( ! Youtube.loaded || ! Youtube.player.loadVideoById) {
				setTimeout(function() {
					Youtube.play(url)
				}, 500)
				return
			}

			if(video_id != null) {
			   Youtube.player.loadVideoById(String(video_id[2]))
			   var apiurl = "https://gdata.youtube.com/feeds/api/videos/" + video_id[2] + "?v=2&alt=json"
			   $.getJSON(apiurl,function(data) {
					data = data.entry
			   });
			} else { 
				console.log("The youtube url is not valid.");
				scope.AlienPlayer.current_track.state = "failed";
			}
		}

		setInterval(function(){
			if(Youtube.trackCanBeHandled(scope.AlienPlayer.current_track)) {
				var duration = Youtube.player.getDuration()
				var current_time = Youtube.player.getCurrentTime()

				if(duration == 0) {
					scope.AlienPlayer.current_track.progress = 0
				} else {
					scope.AlienPlayer.current_track.progress = current_time / duration
				}	
			}
		},200)

		Youtube.onError = function(error) {
			scope.AlienPlayer.current_track.state = "failed"
		}

		Youtube.onPlayerStateChange = function(event) {
			if (event.data == $window.YT.PlayerState.PLAYING) {
				scope.AlienPlayer.current_track.state = "playing"
			}

			if (event.data == $window.YT.PlayerState.PAUSED) {
				scope.AlienPlayer.current_track.state = "paused"
			}

			if (event.data == $window.YT.PlayerState.ENDED ) {
				scope.AlienPlayer.current_track.state = "ended"
			}
			scope.$apply();
		}
      }
    };
  }]);

