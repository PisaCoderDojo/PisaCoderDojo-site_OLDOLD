var myApp = angular.module('coderDojo',['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'angular/views/home.html',
    controller: 'HomeController',
  })
  .when('/news', {
    templateUrl: 'angular/views/news.html',
    controller: 'NewsController'
  })
  .when('/contact', {
    templateUrl: 'angular/views/contact.html',
    controller: 'ContactController'
  })
  .when('/about', {
    templateUrl: 'angular/views/about.html',
    controller: 'AboutController'
  })
  .when('/calendar', {
    templateUrl: 'angular/views/calendar.html',
    controller: 'CalendarController'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});

myApp.controller('MainController', function($scope) {
  $scope.test = 'Hola!';
});

myApp.controller('NavController', function($scope, $location){
  $scope.isActive = function (viewLocation) {
       return viewLocation === $location.path();
   };
});
