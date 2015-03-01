"use strict";
var myApp = angular.module('coderDojo',[
  'ngRoute',
  'ngProgress',
  'ngCookies',
  'textAngular',
  'coderDojoControllers',
  'coderDojoServices',
  'coderDojoFilters'
  ]);

myApp.controller('mainCtrl', ['$scope',
function($scope){
}]);

myApp.run(['$rootScope','ngProgress','$location','$cookies',
  function($rootScope,ngProgress,$location,$cookies){
    $rootScope.$on('$routeChangeStart', function(data, current) {
      ngProgress.start();
      console.log(current.$$route.originalPath.split('/')[1]);
      console.log('cookie_token '+$cookies.token);
      if (current.$$route.originalPath.split('/')[1] == 'admin' && $cookies.token===undefined){
        console.log($cookies.token);
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
  })
  .when('/admin',{
      templateUrl: 'html/admin.html',
      controller: 'adminCtrl',
      resolve: {
        news: function(newsService){
          console.log('inside resolve');
          return newsService.getNews();
        }
      }
  })
  .when('/admin/add',{
    templateUrl: 'html/add.html',
    controller: 'addCtrl'
  })
  .when('/admin/mod/:id',{
    templateUrl: 'html/mod.html',
    controller: 'modCtrl',
    resolve: {
      news: function(newsService, $route){
        console.log('inside resolve');
        return newsService.getNew($route.current.params.id);
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
