/* Services */
"use strict";

angular.module('coderDojoServices', [])
.factory('newsService', ['$http', 'tokenService', function($http, tokenService) {
  return {
    getNews: function() {
      return $http({
        method: 'GET',
        url: 'php/getNews.php'
      });
    },
    getNew: function(id) {
      return $http({
        method: 'GET',
        url: 'php/getNews.php?id='+id
      });
    },
    modNews: function(news){
      news.token = tokenService.get();
      return $http({
        method: 'POST',
        url: 'php/modNews.php',
        data: news
      })
    },
    addNews: function(news){
      news.token = tokenService.get();
      return $http({
        method: 'POST',
        url: 'php/addNews.php',
        data: news
      })
    },
    delNews: function(id){
      return $http({
        method: 'POST',
        url: 'php/delNews.php',
        data: {id:id,token:tokenService.get()}
      })
    }
  }
}])
.factory('loginService', ['$http', function($http){
  return {
    login: function(pass){
      return $http({
        method:'POST',
        url: 'php/checkPass.php',
        data: {'password':pass}
      });
    }
  }
}])
.factory('tokenService', ['$cookies', function($cookies){
  var tokenValue = undefined;
  return {
    copyCookie: function(){
      tokenValue = $cookies.token;
      console.log('onStart: '+tokenValue);
    },
    set: function(token){
      if(this.remember){
        $cookies.token=token;
      }
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
//.values('tokenValue',{token:undefined,cookie:true});
