/* Controllers */

var coderDojoControllers = angular.module('coderDojoControllers', []);

coderDojoControllers.controller('homeCtrl', ['$scope',
  function($scope){
    $scope.test="sei in Home!";
  }]);


coderDojoControllers.controller('newsCtrl', function ($scope, $http) {
  $http.get('php/getNews.php').
    success(function(data, status, headers, config) {
      $scope.news = angular.fromJson(data);
      console.log($scope.news);
    }).
    error(function(data, status, headers, config) {
        console.log('error');
    });

  $http.post('php/addNews.php', {body:'hello word!',
                                  author:'pippa',
                                  bdaytime:'3333'}).
    success(function(data, status, headers, config) {
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log('error');
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
