/* Controllers */
"use strict";
var coderDojoControllers = angular.module('coderDojoControllers', []);

coderDojoControllers.controller('homeCtrl', ['$scope','Event',
  function($scope,Event){
    Event.next().success(function(data){
      $scope.nextEvent = Math.floor(Event.getDay(data));
    });
}]);

coderDojoControllers.controller('newsCtrl', ['$scope', 'news',
  function($scope, news) {
    $scope.BASE_URL="http://pisacoderdojo.sfcoding.com/news/";
    $scope.news = angular.fromJson(news.data);
    //console.log(news.data);
    $scope.orderProp = 'age';
}]);

coderDojoControllers.controller('newCtrl', ['$scope', 'news', '$location',
  function($scope,news,$location){
    $scope.BASE_URL="http://pisacoderdojo.sfcoding.com/news/";
    news=news.data[0];
    if (news===undefined)
      $location.path('/news');
    else{
      $scope.new = news;
    }
}]);

coderDojoControllers.controller('albumsCtrl', ['$scope', 'albums',
  function($scope,albums){
    $scope.albums=albums.data;
    console.log(albums.data);
    $scope.getImg = function(id){
      return 'https://graph.facebook.com/'+id+'/picture?type=album';
    }
}]);

coderDojoControllers.controller('albumCtrl', ['$scope', 'album',
  function($scope,album){
    $scope.album=album.data;
    console.log(album.data);
}]);

coderDojoControllers.controller('aboutCtrl', ['$scope', '$http',
  function($scope, $http){
    $http.get('json/about.json').success(function(data) {
      $scope.people = data;
    });
}]);

coderDojoControllers.controller('contactCtrl', ['$scope', '$http', function ($scope, $http) {
  /*$http.get('json/contacts.json').success(function(data) {
    $scope.contacts = data;
  });*/
  $scope.isSend = false;
  $scope.send = function(){
    //console.log($scope.mail+' '+$scope.subject+' '+$scope.text);
    $http({
      method:'POST',
      url: 'php/sendMail.php',
      data: {'mail':$scope.mail,'subject':$scope.subject,'text':$scope.text}
    }).success(function(data){
      //console.log(data);
      if(data == 'true')
        $scope.isSend=true;
    });
  }
}]);

coderDojoControllers.controller('adminCtrl', ['$scope', 'news', 'newsService', '$location', '$cookies',
  function($scope, news, newsService, $location, $cookies){
    $scope.news = news.data;
    $scope.modify = function(id){
      $location.path('/admin/mod/'+id);
    };

    $scope.showDelModal = function(id,key){
      $scope.delNews = {key:key,
                        id:id,
                        title:$scope.news[key].TITLE
                        };
                        //console.log($scope.delNews);
      $('#deleteModal').modal('show');
    };

    $scope.logout = function(){
      delete $cookies['token'];
      $location.path('/');
    };

    $scope.delete = function(delNew){
      $('#deleteModal').modal('hide');
      newsService.delNews(delNew.id).success(function(data){
        //console.log(data);
        if(data=='success')
          $scope.news.splice(delNew.key,1);
      });
    };
}]);

coderDojoControllers.controller('modCtrl', ['$scope', 'news', 'newsService', '$location',
  function($scope,news,newsService,$location){
    news=news.data[0];
    if (news===undefined)
      $location.path('/admin');
    else{
      var id = news.ID;
      $scope.title=news.TITLE;
      $scope.user=news.AUTHOR;
      $scope.text=news.BODY;
      //console.log(id);
    }
    $scope.submit = function(){
      var data = {id:id,
                  title:$scope.title,
                  user:$scope.user,
                  text:$scope.text
                  };
      newsService.modNews(data).success(function(data){
        //console.log(data);
        if(data=='success'){
          $location.path('/admin');
        }
      });
    };
}]);

coderDojoControllers.controller('loginCtrl', ['$scope', '$location', 'loginService','tokenService',
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

coderDojoControllers.controller('updateImageModal', ['$scope', '$modalInstance', '$http',
  function($scope,$modalInstance,$http){
    $scope.ok = function (img) {
      $http({
        method: 'POST',
        url: 'php/updateImg.php',
        data: {img:img}
      }).success(function(result) {
         console.log(result);
         $modalInstance.close(result);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
