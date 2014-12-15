'use strict';

angular.module('alienstreamApp')
  .directive('soundcloud', ['$window',"$q", function ($window,$q) {
    return {
      template:"",
      restrict: 'E',
	  link: function postLink(scope, element, attrs) {
	  	element =  angular.element(element)
	  	scope.SoundCloud = {client_id: 'ff43d208510d35ce49ed972b01f116ab'};
	  	var SoundCloud = scope.SoundCloud;

	  	SoundCloud.init = function() {
	  		$window.SC.initialize({
				client_id: SoundCloud.client_id
			});

			SoundCloud.api = $window.SC;
	  	}


	  	SoundCloud.getEmbed = function(url) {
	  		var differed = $q.defer();	
			SoundCloud.api.oEmbed(url,{auto_play:true,buying:false,show_artwork:true},function(result){
					console.log(result);
					differed.resolve(result);
			})
			return differed.promise;
		}

		SoundCloud.Stop = function() {
			SoundCloud.widget.pause()
		}

	  	SoundCloud.init();
	  	
	  	scope.$watch("AlienPlayer.current_track",function(track){
	  		if(track.state == "waiting") {
	  			if(track.Providers && track.Providers[0].URL.indexOf("soundcloud.com") > -1) {
	  				$(element).show()
	  				track.state = "loading";
	  				SoundCloud.getEmbed(track.Providers[0].URL).then(function(result) {
	  					if(result == null) {
	  						track.state = "failed"
	  						scope.$apply()
	  					}
	  					element.html(result.html)
	  					SoundCloud.widget = SoundCloud.api.Widget(element.find("iframe")[0])
	  					angular.element(element.find("iframe")[0]).attr("height","250px")
						SoundCloud.widget.bind(SoundCloud.api.Widget.Events.PLAY_PROGRESS,function(event){

						});
						SoundCloud.widget.bind(SoundCloud.api.Widget.Events.FINISH,function(){
							track.state = "ended"
							scope.$apply()
						});
	  				})
	  			} else {
	  				$(element).hide()
	  				SoundCloud.Stop()
	  			}
	      	} else {
	  				$(element).hide()
	  				if(track.Providers && track.Providers[0].URL.indexOf("soundcloud.com") == -1) {
	  					SoundCloud.Stop()
	  				}
	  		}
	  	})

		setInterval(function(){
			if(scope.AlienPlayer.current_track.Providers && scope.AlienPlayer.current_track.Providers[0].URL.indexOf("soundcloud.com") > -1) {
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
