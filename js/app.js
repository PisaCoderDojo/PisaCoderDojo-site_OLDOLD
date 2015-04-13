"use strict";

var myApp = angular.module('coderDojo',[
  'ngRoute',
  'ngProgress',
  'ngCookies',
  'textAngular',
  'coderDojoControllers',
  'coderDojoServices',
  'coderDojoFilters',
  'angulike',
  'angulartics',
  'angulartics.google.analytics',
  'imageupload',
  'ngTagsInput'
  ]);

myApp.run(['$rootScope','ngProgress','$location','tokenService','TitleService',
  function($rootScope,ngProgress,$location,tokenService,TitleService){
    tokenService.copyCookie();
    $rootScope.$on('$routeChangeStart', function(data, current) {
      ngProgress.start();
      console.log(current.$$route.title);
      TitleService.set(current.$$route.title);
      //console.log('cookie_token '+tokenService.get());
      var route = current.$$route.originalPath.split('/')[1];
      $rootScope.home = route === "";
      $rootScope.sideBar=!(route == 'admin' || route == 'login');
      if (route == 'admin' && !tokenService.isSet()){
        $location.path('/login');
      }
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      ngProgress.complete();
    });
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        console.log(event);
    });
}]);

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
      news: function(newsService){
        return newsService.getNews();
      },
      tags: function(newsService){
        return newsService.getTags();
      }
    }
  })
  .when('/news/:id',{
    templateUrl: 'html/new.html',
    controller: 'newCtrl',
    resolve: {
      news: function(newsService, $route){
        return newsService.getNew($route.current.params.id);
      }
    }
  })
  .when('/news/tag/:tag',{
    templateUrl: 'html/news.html',
    controller: 'newsCtrl',
    resolve: {
      news: function(newsService, $route){
        return newsService.getNews($route.current.params.tag);
      },
      tags: function(newsService){
        return newsService.getTags();
      }
    }
  })
  .when('/contact', {
    title: 'contatti',
    templateUrl: 'html/contact.html',
    controller: 'contactCtrl'
  })
  .when('/about', {
    title:'chi siamo',
    templateUrl: 'html/about.html',
    controller: 'aboutCtrl'
  })
  .when('/calendar', {
    title:'calendario',
    templateUrl: 'html/calendar.html'
  })
  /*.when('/albums', {
    templateUrl: 'html/albums.html',
    controller: 'albumsCtrl',
    resolve: {
      albums: function(albumsService){
        return albumsService.getAlbums();
      }
    }
  })
  .when('/albums/:id', {
    templateUrl: 'html/album.html',
    controller: 'albumCtrl',
    resolve: {
      album: function(albumsService, $route){
        return albumsService.getAlbum($route.current.params.id);
      }
    }
  })*/
  .when('/admin',{
      templateUrl: 'html/admin.html',
      controller: 'adminCtrl',
      resolve: {
        news: function(newsService){
          //console.log('inside resolve');
          return newsService.getNews();
        }
      }
  })
  .when('/admin/edit',{
    templateUrl: 'html/edit.html',
    controller: 'addCtrl',
    resolve: {
      tags: function(newsService){
        return newsService.getTags();
      }
    }
  })
  .when('/admin/edit/:id',{
    templateUrl: 'html/edit.html',
    controller: 'modCtrl',
    resolve: {
      news: function(newsService, $route){
        //console.log('inside resolve');
        return newsService.getNew($route.current.params.id);
      },
      tags: function(newsService){
        return newsService.getTags();
      }
    }
  })
  .when('/login',{
    templateUrl: 'html/login.html',
    controller: 'loginCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
}]);

myApp.controller('CarouselCtrl', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    slides.push({
      image: 'http://lorempixel.com/g/1000/400/abstract/',
      text: ''
    });
  };
  slides.push({
    image:'img/SMS-biblio.jpg',
    text: ''
  });
  slides.push({
    image: 'img/tre-banner.jpg',
    text: ''
  });
  for (var i=0; i<1; i++) {
    $scope.addSlide();
  }
});

myApp.controller('titleController',['$scope','TitleService',
  function($scope,TitleService){
    $scope.title=TitleService;
}]);
