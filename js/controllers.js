'use strict';

/* Controllers */

var coderDojoControllers = angular.module('coderDojoControllers', []);

coderDojoControllers.controller('homeCtrl', ['$scope',
  function($scope){
    $scope.test="sei in Home!";
  }]);


coderDojoControllers.controller('newsCtrl', ['$scope',
    function($scope){
      $scope.test="sei in Nws!";
    }]);

coderDojoControllers.controller('calendarCtrl', ['$scope',
      function($scope){
        $scope.test="sei in Home!";
      }]);

coderDojoControllers.controller('aboutCtrl', ['$scope',
                  function($scope){
                    $scope.test="sei in Home!";
      }]);


coderDojoControllers.controller('contactCtrl', ['$scope',
            function($scope){
              $scope.test="sei in Home!";
}]);
