var myApp = angular.module('coderDojo',['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'home.html',
    controller: 'HomeController',
  })
  .when('/contatti', {
    templateUrl: 'contatti.html',
    controller: 'ContattiController'
  });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});

myApp.controller('MainController', ['$scope', function($scope) {
  $scope.test = 'Hola!';

}]);
