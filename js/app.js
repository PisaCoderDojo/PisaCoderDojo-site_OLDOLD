var myApp = angular.module('coderDojo',[
  'ngRoute',
  'coderDojoControllers',
  'coderDojoFilters'
  ]);

myApp.config(['$routeProvider' ,'$locationProvider',
function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'html/home.html',
    controller: 'homeCtrl'
  })
  .when('/news', {
    templateUrl: 'html/news.html',
    controller: 'newsCtrl'
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
