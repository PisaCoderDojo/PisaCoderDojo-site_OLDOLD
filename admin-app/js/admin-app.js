"use strict";

var myApp = angular.module('coderDojo-admin',[
  'ngRoute',
  'ngProgress',
  'ngCookies',
  'textAngular',
  'AdminControllers',
  'coderDojoServices',
  'coderDojoFilters',
  'imageupload',
  'ngTagsInput'
  ]);

myApp.run(['$rootScope','ngProgress','$location','tokenService',
  function($rootScope,ngProgress,$location,tokenService){
    tokenService.copyCookie();
    $rootScope.$on('$routeChangeStart', function(data, current) {
      ngProgress.start();
      if (!tokenService.isSet()){
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
  .when('/news', {
    templateUrl: 'html/admin-news.html',
    controller: 'adminNewsCtrl',
    resolve: {
      news: function(newsService){
        //console.log('inside resolve');
        return newsService.getNews();
      }
    }
  })
  .when('/resource',{
      templateUrl: 'html/admin-resource.html',
      controller: 'adminResourceCtrl',
      resolve: {
        category: function(resourceService){
          //console.log('inside resolve');
          return resourceService.getCategory();
        },
        resource: function(){
          return null;
        }
      }
  })
  .when('/resource/:id',{
      templateUrl: 'html/admin-resource.html',
      controller: 'adminResourceCtrl',
      resolve: {
        category: function(resourceService){
          //console.log('inside resolve');
          return resourceService.getCategory();
        },
        resource: function(resourceService, $route){
          //console.log('inside resolve');
          return resourceService.getResources($route.current.params.id);
        }
      }
  })
  .when('/news/edit',{
    templateUrl: 'html/news-edit.html',
    controller: 'addNewsCtrl',
    resolve: {
      tags: function(newsService){
        return newsService.getTags();
      }
    }
  })
  .when('/news/edit/:id',{
    templateUrl: 'html/news-edit.html',
    controller: 'modNewsCtrl',
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
  .when('/resource/edit',{
      templateUrl: 'html/edit-resource.html',
      controller: 'addResourceCtrl',
      resolve: {
        category: function(resourceService){
          return resourceService.getCategory();
        }
      }
  })
  .when('/resource/edit/:id',{
      templateUrl: 'html/edit-resource.html',
      controller: 'modResourceCtrl',
      resolve: {
        resource: function(resourceService, $route){
          //console.log('inside resolve');
          return resourceService.getResource($route.current.params.id);
        },
        category: function(resourceService){
          return resourceService.getCategory();
        }
      }
  })
  .when('/login',{
    templateUrl: 'html/login.html',
    controller: 'loginCtrl'
  })
  .otherwise({
    redirectTo: '/news'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
}]);
