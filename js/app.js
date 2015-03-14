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
  'angulartics.google.analytics'
  ]);

myApp.run(['$rootScope','ngProgress','$location','tokenService',
  function($rootScope,ngProgress,$location,tokenService){
    tokenService.copyCookie();
    $rootScope.$on('$routeChangeStart', function(data, current) {
      ngProgress.start();
      console.log('cookie_token '+tokenService.get());
      var route = current.$$route.originalPath.split('/')[1];
      if (route == 'admin' || route == 'login')
        $rootScope.sideBar=false;
      else
        $rootScope.sideBar=true;
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
    templateUrl: 'html/news.html',
    controller: 'newsCtrl',
    resolve: {
      news: function(newsService){
        console.log('inside resolve');
        return newsService.getNews();
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
