'use strict';

angular
  .module('alienstreamApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
	'ui.router',
    'routeStyles'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  
	$urlRouterProvider.otherwise("/");
	
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials=true;

    $stateProvider
      .state('parallax', {
		    url: '/', 
		    templateUrl: 'common/templates/parallax.html',
        controller: 'SignupCtrl'
      })

	    .state('app', {
        abstract:true, 
        url: '/app',
		    templateUrl: 'common/templates/app.html',
        controller: 'AppCtrl'
      })
	  
      .state('app.explore', {
        url: '/explore', 
        views: {
          "content@app": {
            templateUrl: 'community/community_list.html',
            controller: 'CommunityCtrl'
          }
        }  
      })

      .state('app.mycommunities', {
        url: '/communities', 
        views: {
          "content@app": {
            templateUrl: 'community/community_list.html',
            controller: 'CommunityCtrl'
          }
        }  
      })

      .state('app.community', {
        url: '/community/:community_name',
        views: {
          "content@app": {
            templateUrl: 'community/community.html',
            controller: 'CommunityCtrl'
          }
        }
      })

      .state('app.signup', {
        url: '/signup',     
        views: {
          "content": {
            templateUrl: 'user/signup.html',
          }
        } 
      })

      .state('app.playlist', {
        url: '/playlist', 
        views: {
          "content": {
            templateUrl: 'player/playlist.html'
          }
        }  
      })

      .state('app.create', {
        url: '/create',
        abstract:true, 
      })

      .state('app.create.community', {
        url: '/community',
        views: {
          "content@app": {
            templateUrl: 'community/create.html',
            controller: 'CommunityCtrl'
          }
        }
      })

      .state('app.track', {
        url: '/track/:id',
        views: {
          "content@app": {
            templateUrl: 'track/track.html',
            controller: 'TrackCtrl'
          }
        }
      })

      .state('app.artist', {
        url: '/artist/:id',
        views: {
          "content@app": {
            templateUrl: 'artist/artist.html',
            controller: 'ArtistCtrl'
          }
        }
      })

      

    
  })
  .run(function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
          // to be used for back button //won't work when page is reloaded.
          $rootScope.previousState_name = fromState.name;
          $rootScope.previousState_params = fromParams;
      });
      //back button function called from back button's ng-click="back()"
      $rootScope.back = function() {
          $state.go($rootScope.previousState_name,$rootScope.previousState_params);
      };
  });

;

