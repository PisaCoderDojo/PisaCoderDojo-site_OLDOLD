/* Services */
"use strict";

angular.module('coderDojoServices', [])
.factory('newsService', ['$http', function($http) {
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
      return $http({
        method: 'POST',
        url: 'php/modNews.php',
        data: news
      })
    },
    addNews: function(news){
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
        data: {'id':id}
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
}]);
