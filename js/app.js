'use strict'

/* App module of Coder-Dojo */

var myApp = angular.module('coderDojo',[
    'ngRoute',
    'coderDojoControllers'
    ]);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'newsCtrl'
  }).
  when('/contact', {
    templateUrl: 'partials/contact.html',
    controller: 'ContactCtrl'
  }).
  when('/about', {
    templateUrl: 'partials/about.html',
    controller: 'AboutCtrl'
  }).
  when('/calendar', {
    templateUrl: 'partials/calendar.html',
    controller: 'CalendarCtrl'
  }).
  when('/insert', {
      templateUrl: 'partials/insertNews.html',
      controller: 'InsertCtrl'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});
