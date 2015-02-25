/* Services */
"use strict";

angular.module('coderDojoServices', [])
.factory('newsService', ['$http', function($http) {
  return {
    getNews: function() {
      var promise = $http({
        method: 'GET',
        url: 'php/getNews.php'
      });
      /*promise.success(function(data, status, headers, conf) {
        return data;
      });*/
      return promise;
    }
  }
}]);
