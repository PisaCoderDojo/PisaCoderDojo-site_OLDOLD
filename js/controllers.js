'use strict';

/* Controllers */

var coderDojoControllers = angular.module('coderDojoControllers', []);

coderDojoControllers.controller('homeCtrl', ['$scope',
  function($scope){
    $scope.test="sei in Home!";
  }]);


coderDojoControllers.controller('newsCtrl', function ($scope, $http) {
  $http.get('json/news.json').success(function(data) {
      $scope.news = data;
  });

  $scope.orderProp = 'age';
  });

coderDojoControllers.controller('calendarCtrl', ['$scope',
  function($scope){
      $scope.test="sei in calendar, con google calendar  !";
  }]);

coderDojoControllers.controller('aboutCtrl', ['$scope',
  function($scope){
      $scope.test="sei in Chi siamo !";
  }]);


coderDojoControllers.controller('contactCtrl', function ($scope, $http) {
    $http.get('json/contacts.json').success(function(data) {
      $scope.contacts = data;
    });

  });
