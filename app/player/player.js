 angular
	.module('alienstreamApp')
		.service('AlienPlayer', ['api', 'utils', '$location', function(api, utils, $location) {
			var AlienPlayer = this;

			//state variables
			AlienPlayer.current_track = {};
			AlienPlayer.playlist = [];
			AlienPlayer.played = [];
			AlienPlayer.current_playlist = {};


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
					var stateObj = {};
					var current_location = decodeURIComponent(window.location.hash.split("?")[0].substring(1));
					var params = "track=" + AlienPlayer.current_track.id;
					params += "&" + "playlist=" + AlienPlayer.current_playlist.title;

					$location.path(current_location).search(params);
				}
			}

			this.load = function(sub,sort) {
				AlienPlayer.current_playlist = {
					"title": sub,
				}
				api.get("community/"+sub+"/tracks",sort).then(function(response) {
					AlienPlayer.playlist = response.data
					AlienPlayer.played.push(AlienPlayer.current_track);
					AlienPlayer.current_track = AlienPlayer.playlist.shift();
					AlienPlayer.current_track.state = "waiting";
				});
			}

			this.loadSingle = function(track) {
				AlienPlayer.current_playlist = {
					"title": track.title,
				}
				AlienPlayer.playlist = [];
				AlienPlayer.current_track = track;
				AlienPlayer.current_track.state = "waiting";
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

			AlienPlayer.sorts = [{val:"",title:"Hot"},{val:"sort=top&t=24",title:"Top Today"},{val:"sort=top&t=168",title:"Top Week"},{val:"sort=top&t=730",title:"Top Month"},{val:"sort=top&t=8765",title:"Top Year"},{val:"sort=top&t=999999",title:"Top All"}]

		}]);
