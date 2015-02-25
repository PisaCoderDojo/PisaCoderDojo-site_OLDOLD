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

coderDojoControllers.controller('adminCtrl', ['$scope', 'news', 'newsService', '$location',
  function($scope, news, newsService, $location){
    $scope.news = news.data;
    $scope.modify = function(id){
      $location.path('/admin/mod/'+id);
    };

    $scope.showDelModal = function(id,key){
      $scope.delNews = {key:key,
                        id:id,
                        title:$scope.news[key].TITLE
                        };
                        console.log('show');
      $('#deleteModal').modal('show');
    };

    $scope.delete = function(delNew){
      $('#deleteModal').modal('hide');
      newsService.delNews(delNew.id).success(function(data){
        console.log(data);
        if(data=='success')
          $scope.news.splice(delNew.key,1);
      });
    };
}]);

coderDojoControllers.controller('modCtrl', ['$scope', 'news',
  function($scope, news){
    console.log(news.data[0]);
    news=news.data[0];
    var id = news.ID;
    $scope.title=news.TITLE;
    $scope.user=news.AUTHOR;
    $scope.text=news.BODY;

}]);

coderDojoControllers.controller('loginCtrl', ['$scope', 'tokenValue', '$location', 'loginService',
  function($scope,tokenValue,$location,loginService){
    $scope.error = false;

    $scope.login = function(){
      loginService.login($scope.pass).success(function(data){
        console.log(data);
        if(data != 'error'){
          $scope.error = false;
          tokenValue.token=data;
          $location.path('/admin');
        }else{
          $scope.error = true;
        }
      });
    }
}]);

coderDojoControllers.controller('addCtrl', ['$scope', 'newsService', '$location',
  function($scope, newsService, $location){
    $scope.submit = function(){
      if ($scope.title!='' && $scope.text!='' && $scope.user!=''){
        newsService.addNews({
          title: $scope.title,
          text: $scope.text,
          user: $scope.user
        }).success(function(data){
          console.log(data);
          if(data=='success')
            $location.path('/admin');
        });
      }
    }

}]);
