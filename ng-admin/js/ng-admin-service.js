/* Controllers */
"use strict";
angular.module('ngAdminService', [])
.factory('tokenService', ['$cookies','Restangular', function($cookies,Restangular){
  var tokenValue;
  return {
    copyCookie: function(){
      tokenValue = $cookies.token;
      //console.log('onStart: '+tokenValue);
    },
    set: function(token){
      if(this.remember){
        $cookies.token=token;
      }
      Restangular.setDefaultHeaders({'token': token});
      tokenValue=token;
    },
    get: function(){
      return tokenValue;
    },
    isSet: function(){
      return tokenValue!==undefined;
    },
    remember: false
  };
}])
.factory('loginService', ['$http', function($http){
  return {
    login: function(pass){
      return $http({
        method:'POST',
        url: '/api/login',
        data: {'password':pass}
      });
    }
  };
}]);
