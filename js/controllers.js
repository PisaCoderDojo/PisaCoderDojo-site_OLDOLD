'use strict';

/* Controllers */


var coderDojoControllers = angular.module('coderDojoControllers',[]);


coderDojoControllers.controller('newsCtrl', ['$scope', '$http',
function($scope, $http) {
$http.get('news/news.json').success(function(data) {
  $scope.news = data;
});
$scope.test = 'Hola in news !';
$scope.orderProp = 'id';
}]);


coderDojoControllers.controller('ContactCtrl', function($scope) {
  $scope.test="sei in Contatti!";
});

coderDojoControllers.controller('AboutCtrl', function($scope) {
  $scope.test="sei in about!";
});

coderDojoControllers.controller('CalendarCtrl', function($scope) {
  $scope.test="sei in calendario!";
});
