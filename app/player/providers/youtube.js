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

	  	scope.$watch("AlienPlayer.current_track",function(track) {
	  		if(track.state == "waiting") {
	  			if(track.Providers && track.Providers[0].URL.indexOf("youtube.com") > -1) {
	  				$(element).show()
	  				track.state = "loading";
	  				Youtube.play(track.Providers[0].URL)
	  			} else {
	  				$(element).hide()
	  				Youtube.stop()
	  			}
	      	} else {
	  			$(element).hide()
	  			if(track.Providers && track.Providers[0].URL.indexOf("youtube.com") == -1) {
	  				Youtube.stop()
	  			}
	  		}
	  	})

	  	Youtube.stop = function() {
	  		Youtube.player.stopVideo();
	  	}

	  	Youtube.play = function(url) {
	  		url = url.replace("&amp;","%26");
	  		url = url.replace("attribution_link","");
	  		url = decodeURIComponent(url);
			var video_id = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
			
			if(video_id != null) {
			   Youtube.player.loadVideoById(String(video_id[2]))
			   var apiurl = "https://gdata.youtube.com/feeds/api/videos/" + video_id[2] + "?v=2&alt=json"
			   $.getJSON(apiurl,function(data) {
					data = data.entry
					console.log(data);
					//$("#song_title").text(data.title.$t);
					//$("#artist").html("<a target='_blank' href='http://www.youtube.com/user/"+data.author[0].uri.$t.split("/")[data.author[0].uri.$t.split("/").length-1]+"'>"+data.author[0].name.$t+"</a>");
					//$("#bio").html(replaceURLWithHTMLLinks(data.media$group.media$description.$t.substr(0, 500)));
					//$("#thumbnail").attr("src",data.media$group.media$thumbnail[0].url);  
			   });
			} else { 
				console.log("The youtube url is not valid.");
				scope.AlienPlayer.current_track.state = "failed";
			}
		}

		setInterval(function(){
			if(scope.AlienPlayer.current_track.Providers && scope.AlienPlayer.current_track.Providers[0].URL.indexOf("youtube.com") > -1) {
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

			if (event.data == $window.YT.PlayerState.ENDED ) {
				scope.AlienPlayer.current_track.state = "ended"
			}
			scope.$apply();
		}
      }
    };
  }]);
