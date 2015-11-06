(function() {
  var myApp = angular.module('coderDojo', [
    'ngRoute',
    'ngProgress',
    'ngCookies',
    'ngSanitize',
    'coderDojoControllers',
    'coderDojoServices',
    'coderDojoFilters',
    'angulike',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap'
  ]);

  myApp.run(['$rootScope', 'ngProgressFactory', '$location', 'TitleService',
    function($rootScope, ngProgressFactory, $location, TitleService) {
      //tokenService.copyCookie();
      var ngProgress = ngProgressFactory.createInstance();
      $rootScope.$on('$routeChangeStart', function(data, current) {
        ngProgress.start();
        // console.log(current.$$route.title);
        TitleService.set(current.$$route.title);
        //console.log('cookie_token '+tokenService.get());
        var route = current.$$route.originalPath.split('/')[1];
        $rootScope.home = route === "";
        //$rootScope.sideBar=!(route == 'admin' || route == 'login');
        /*if (route == 'admin' && !tokenService.isSet()){
          $location.path('/login');
        }*/
      });
      $rootScope.$on('$routeChangeSuccess', function() {
        ngProgress.complete();
      });
      $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        console.log(event);
      });
    }
  ]);

  myApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'html/home.html',
          controller: 'homeCtrl'
        })
        .when('/news', {
          title: 'notizie',
          templateUrl: 'html/news.html',
          controller: 'newsCtrl',
          resolve: {
            news: function(newsService) {
              return newsService.getNews();
            },
            tags: function(newsService) {
              return newsService.getTags();
            }
          }
        })
        .when('/news/:id', {
          templateUrl: 'html/new.html',
          controller: 'newCtrl',
          resolve: {
            news: function(newsService, $route) {
              return newsService.getNew($route.current.params.id);
            }
          }
        })
        .when('/news/tag/:tag', {
          templateUrl: 'html/news.html',
          controller: 'newsCtrl',
          resolve: {
            news: function(newsService, $route) {
              return newsService.getNews($route.current.params.tag);
            },
            tags: function(newsService) {
              return newsService.getTags();
            }
          }
        })
        .when('/resource/:cat', {
          templateUrl: 'html/resource.html',
          controller: 'resourceCtrl',
          resolve: {
            resource: function(resourceService, $route) {
              return resourceService.getResources($route.current.params.cat);
            }
          }
        })
        .when('/contact', {
          title: 'contatti',
          templateUrl: 'html/contact.html',
          controller: 'contactCtrl'
        })
        .when('/mentor', {
          title: 'Collabora con noi',
          templateUrl: 'html/mentor.html',
          controller: 'mentorCtrl'
        })
        .when('/school', {
          title: 'Dojo nelle scuole',
          templateUrl: 'html/school.html',
          controller: 'schoolCtrl'
        })
        .when('/about', {
          title: 'Mentori',
          templateUrl: 'html/about.html',
          controller: 'aboutCtrl',
          resolve: {
            actualMentors: function($http) {
              return $http.get('json/mentors-actual.json');
            },
            oldMentors: function($http) {
              return $http.get('json/mentors-old.json');
            }
          }
        })
        .when('/calendar', {
          title: 'calendario',
          templateUrl: 'html/calendar.html'
        })
        .when('/albums', {
          title: 'Galleria',
          templateUrl: 'html/albums.html',
          controller: 'albumsCtrl',
          resolve: {
            albums: function(albumsService) {
              return albumsService.getAlbums();
            }
          }
        })
        .when('/albums/:id', {
          templateUrl: 'html/album.html',
          controller: 'albumCtrl',
          resolve: {
            album: function(albumsService, $route) {
              return albumsService.getAlbum($route.current.params.id);
            }
          }
        })
        .otherwise({
          redirectTo: '/'
        });
      $locationProvider.html5Mode(true);
    }
  ]);

  myApp.controller('CarouselCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    slides.push({
      image: 'img/carousel/carousel-IF.jpg',
      text: ''
    });
    slides.push({
      image: 'img/carousel/all-dojo.jpg',
      text: ''
    });
    slides.push({
      image: 'img/carousel/SMS-biblio.jpg',
      text: ''
    });
  }]);

  myApp.controller('menuController', ['$scope', '$http',
    function($scope, $http) {
      $http({
          method: 'GET',
          url: '/api/category'
        })
        .success(function(data) {
          $scope.category = data;
        });
    }
  ]);

  myApp.controller('titleController', ['$scope', 'TitleService',
    function($scope, TitleService) {
      $scope.title = TitleService;
    }
  ]);
}());
