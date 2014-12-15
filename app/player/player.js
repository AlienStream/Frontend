 angular
	.module('alienstreamApp')
		.service('AlienPlayer', ['api', 'utils', function(api, utils) {
		
			//state variables
			this.current_track = {};
			this.playlist = [];
			this.played = [];


			//playlist control
			this.addSong = function(song) {
				this.playlist.push(song);
			}

			this.removeSong = function(song) {
				this.playlist.push(song);
			}

			this.clearPlaylist = function() {
				this.playlist = [];
			}

			//player control
			this.pause = function() {
				this.current_track.state = "paused";
			}

			this.play = function() {
					this.next();
			}

			this.next = function() {
				if(this.playlist.length !== 0 ) {
					this.played.push(this.current_track);
					this.current_track = this.playlist.shift();
					this.current_track.state = "waiting";
				}
			}

			this.load = function(sub,sort) {
				var AlienPlayer = this;
				api.get("community/"+sub+"/tracks",sort).then(function(result) {
					AlienPlayer.playlist = result
					AlienPlayer.played.push(AlienPlayer.current_track);
					AlienPlayer.current_track = AlienPlayer.playlist.shift();
					AlienPlayer.current_track.state = "waiting";
				});
			}

			this.prev = function() {
				if(this.played.length !== 0 ) {
					this.playlist.unshift(this.current_track);
					this.current_track = this.played.pop();
					this.current_track.state = "waiting";
				}
			}

			this.isPlaying = function() {
				if(this.current_track && this.current_track.state && this.current_track.state !== "paused") {
					return true
				} else {
					return false
				}
			}

			this.sorts = [{val:"",title:"Hot"},{val:"sort=top&t=week",title:"Top Week"},{val:"sort=top&t=month",title:"Top Month"},{val:"sort=top&t=year",title:"Top Year"},{val:"sort=top&t=all",title:"Top All"}]

		}]);
