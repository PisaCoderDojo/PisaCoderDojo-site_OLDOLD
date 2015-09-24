/* Controllers */
"use strict";
angular.module('AdminControllers', [])
.controller('loginCtrl', ['$scope', '$location', 'loginService','tokenService',
  function($scope,$location,loginService,tokenService){
    $scope.error = false;
    $scope.remember = tokenService.remember;
    $scope.login = function(){
      loginService.login($scope.pass).success(function(data){
        console.log(data);
        if(data != 'error'){
          tokenService.remember = $scope.remember;
          $scope.error = false;
          tokenService.set(data);
          $location.path('/dashboard');
        }else{
          $scope.error = true;
        }
      });
    };
}])
