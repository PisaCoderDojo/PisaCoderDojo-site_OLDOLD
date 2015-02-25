"use strict";
var myApp = angular.module('coderDojo',[
  'ngRoute',
  'ngProgress',
  'coderDojoControllers',
  'coderDojoServices',
  'coderDojoFilters'
  ]);

myApp.controller('mainCtrl', ['$scope','ngProgress',
function($scope, ngProgress){
  $scope.isViewLoading = false;
  $scope.$on('$routeChangeStart', function() {
    $scope.isViewLoading = true;
    if(ngProgress.status()!= 0)
      ngProgress.reset();
    ngProgress.start();
  });
  $scope.$on('$routeChangeSuccess', function() {
    ngProgress.complete();
    $scope.isViewLoading = false;
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
    templateUrl: 'html/news.html',
    controller: 'newsCtrl',
    resolve: {
      news: function(newsService){
        console.log('inside resolve');
        return newsService.getNews();
      }
    }
  })
  .when('/contact', {
    templateUrl: 'html/contact.html',
    controller: 'contactCtrl'
  })
  .when('/about', {
    templateUrl: 'html/about.html',
    controller: 'aboutCtrl'
  })
  .when('/calendar', {
    templateUrl: 'html/calendar.html',
    controller: 'calendarCtrl'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
}]);
