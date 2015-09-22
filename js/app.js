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
  .when('/resource/:cat',{
    templateUrl: 'html/resource.html',
    controller: 'resourceCtrl',
    resolve: {
      resource: function(resourceService, $route){
        return resourceService.getResources($route.current.params.cat);
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
  .when('/albums', {
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
  })
  .otherwise({
    redirectTo: '/'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
}]);

myApp.controller('CarouselCtrl', ['$scope', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  slides.push({
    image: 'img/all-dojo.jpg',
    text: ''
  });
  slides.push({
    image:'img/SMS-biblio.jpg',
    text: ''
  });
  slides.push({
    image: 'img/tre-banner.jpg',
    text: ''
  });
}]);

myApp.controller('menuController', ['$scope', '$http',
function($scope, $http){
  $http({
    method: 'GET',
    url: '/api/category'
  }).success(function(data){
    $scope.category = data;
  });
}]);

myApp.controller('titleController',['$scope','TitleService',
  function($scope,TitleService){
    $scope.title=TitleService;
}]);
