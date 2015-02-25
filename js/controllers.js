/* Controllers */
"use strict";
var coderDojoControllers = angular.module('coderDojoControllers', []);

coderDojoControllers.controller('homeCtrl', ['$scope',
  function($scope){
    $scope.test="sei in Home!";
  }]);

/*
newsCtrl.resolve = {
  news: function($q, $http){
    var deferred = $q.defer();

    $http.get('php/getNews.php').
      success(function(data, status, headers, config) {
        deferred.resolve(data)
        console.log(data);
      }).
      error(function(data, status, headers, config) {
          console.log('error');
      });
    return deferred.promise;
  }
};
*/
coderDojoControllers.controller('newsCtrl', ['$scope', 'news',
  function($scope, news) {
    $scope.news = angular.fromJson(news.data);
    console.log(news.data);
    $scope.orderProp = 'age';
}]);

coderDojoControllers.controller('calendarCtrl', ['$scope', function($scope){
      $scope.test="sei in calendar, con google calendar  !";
  }]);

coderDojoControllers.controller('aboutCtrl', ['$scope', function($scope){
      $scope.test="sei in Chi siamo !";
  }]);


coderDojoControllers.controller('contactCtrl', function ($scope, $http) {
    $http.get('json/contacts.json').success(function(data) {
      $scope.contacts = data;
    });

  });
