/* Controllers */
"use strict";
angular.module('coderDojoControllers', [])
.controller('homeCtrl', ['$scope','Event',
  function($scope,Event){
    Event.next().success(function(data){
      $scope.nextEvent = Math.floor(Event.getDay(data));
    });
}])
.controller('newsCtrl', ['$scope', 'news', 'tags', '$route',
  function($scope, news, tags, $route) {
    $scope.BASE_URL="http://pisacoderdojo.sfcoding.com/news/";
    $scope.news = news.data;
    $scope.tags = tags.data;
    $scope.currentTag = $route.current.params.tag || -1;
    $scope.orderProp = 'age';
}])
.controller('newCtrl', ['$scope', 'news', '$location',
  function($scope,news,$location){
    $scope.BASE_URL="http://pisacoderdojo.sfcoding.com/news/";
    news=news.data[0];
    if (news===undefined)
      $location.path('/news');
    else{
      $scope.new = news;
    }
}])
.controller('albumsCtrl', ['$scope', 'albums',
  function($scope,albums){
    $scope.albums=albums.data;
    console.log(albums.data);
    $scope.getImg = function(id){
      return 'https://graph.facebook.com/'+id+'/picture?type=album';
    };
}])
.controller('albumCtrl', ['$scope', 'album',
  function($scope,album){
    $scope.album=album.data;
    console.log(album.data);
}])
.controller('aboutCtrl', ['$scope', '$http',
  function($scope, $http){
    $http.get('json/about.json').success(function(data) {
      $scope.people = data;
    });
}])
.controller('contactCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.isSend = false;
    $scope.send = function(){
      //console.log($scope.mail+' '+$scope.subject+' '+$scope.text);
      $http({
        method:'POST',
        url: 'php/sendMail.php',
        data: {'mail':$scope.mail,
               'subject':$scope.subject,
               'text':$scope.text}
      }).success(function(data){
        //console.log(data);
        if(data == 'true')
          $scope.isSend=true;
      });
    };
}])
.controller('adminCtrl', ['$scope', 'news', 'newsService', '$location', '$cookies',
  function($scope, news, newsService, $location, $cookies){
    $scope.news = news.data;
    $scope.modify = function(id){
      $location.path('/admin/edit/'+id);
    };

    $scope.showDelModal = function(id,key){
      $scope.delNews = {key:key,
                        id:id,
                        title:$scope.news[key].title
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
}])
.controller('modCtrl', ['$scope', 'news', 'newsService', '$location',
  function($scope,news,newsService,$location){
    news=news.data[0];
    if (news===undefined)
      $location.path('/admin');
    else{
      var id = news.id;
      $scope.title=news.title;
      $scope.user=news.author;
      $scope.text=news.body;
    }
    $scope.submit = function(){
      var data = {id:id,
                  title:$scope.title,
                  user:$scope.user,
                  text:$scope.text
                  };
      newsService.modNews(data).success(function(data){
        if(data=='success'){
          $location.path('/admin');
        }
      });
    };
}])
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
          $location.path('/admin');
        }else{
          $scope.error = true;
        }
      });
    };
}])
.controller('addCtrl', ['$scope', 'newsService', '$location',
  function($scope, newsService, $location){
    $scope.submit = function(){
      if ($scope.title!=='' && $scope.text!=='' && $scope.user!==''){
        var tagArray = $scope.tags.split(',');
        console.log(tagArray);
        newsService.addNews({
          title: $scope.title,
          text: $scope.text,
          user: $scope.user,
          tag: tagArray
        }).success(function(data){
          if(data=='success')
            $location.path('/admin');
        });
      }
    };
}])
.controller('updateImageModal', ['$scope', '$modalInstance', 'imageService',
  function($scope,$modalInstance,imageService){
    $scope.ok = function (img) {
      imageService.upload(img).success(function(result) {
         console.log(result);
         $modalInstance.close(result);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
