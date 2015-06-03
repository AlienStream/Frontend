 angular
	.module('alienstreamApp')
		.service('AlienPlayer', ['api', 'utils', function(api, utils) {
			var AlienPlayer = this;

			//state variables
			AlienPlayer.current_track = {};
			AlienPlayer.playlist = [];
			AlienPlayer.played = [];


			//playlist control
			this.addSong = function(song) {
				AlienPlayer.playlist.push(song);
			}

			this.removeSong = function(song) {
				AlienPlayer.playlist.push(song);
			}

			this.clearPlaylist = function() {
				AlienPlayer.playlist = [];
			}

			//player control
			this.pause = function() {
				AlienPlayer.current_track.state = "paused";
			}

			this.play = function() {
				AlienPlayer.current_track.state = "resuming";
			}

			this.next = function() {
				if(AlienPlayer.playlist.length !== 0 ) {
					AlienPlayer.played.push(AlienPlayer.current_track);
					AlienPlayer.current_track = AlienPlayer.playlist.shift();
					AlienPlayer.current_track.state = "waiting";
				}
			}

			this.load = function(sub,sort) {
				api.get("community/"+sub+"/tracks",sort).then(function(response) {
					AlienPlayer.playlist = response.data
					AlienPlayer.played.push(AlienPlayer.current_track);
					AlienPlayer.current_track = AlienPlayer.playlist.shift();
					AlienPlayer.current_track.state = "waiting";
				});
			}

			this.prev = function() {
				if(AlienPlayer.played.length !== 0 ) {
					AlienPlayer.playlist.unshift(AlienPlayer.current_track);
					AlienPlayer.current_track = AlienPlayer.played.pop();
					AlienPlayer.current_track.state = "waiting";
				}
			}

			this.isPlaying = function() {
				if(AlienPlayer.current_track && AlienPlayer.current_track.state && AlienPlayer.current_track.state !== "paused") {
					return true
				} else {
					return false
				}
			}

			AlienPlayer.sorts = [{val:"",title:"Hot"},{val:"sort=top&t=week",title:"Top Week"},{val:"sort=top&t=month",title:"Top Month"},{val:"sort=top&t=year",title:"Top Year"},{val:"sort=top&t=all",title:"Top All"}]

		}]);
