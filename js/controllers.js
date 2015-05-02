/* Controllers */
"use strict";
angular.module('coderDojoControllers', [])
.controller('homeCtrl', ['$scope','Event',
  function($scope,Event){
    Event.next().success(function(data){
      $scope.nextEvent = Math.floor(Event.getDay(data));
      $scope.eventIsSet = $scope.nextEvent>=0;
    });
}])
.controller('newsCtrl', ['$scope','news','tags','$route','$timeout','$http','ngProgress','TitleService',
  function($scope, news, tags, $route,$timeout,$http,ngProgress,TitleService) {
    $scope.BASE_URL="http://pisacoderdojo.sfcoding.com/news/";
    $scope.news = news.data;
    $scope.tags = tags.data;
    $scope.currentTag = $route.current.params.tag || -1;
    if ($scope.currentTag!=-1)
      TitleService.set($scope.currentTag);

    $scope.orderProp = 'age';

    var httpSearch = function(){
      ngProgress.start();
      $http({
        method: 'GET',
        url: 'php/searchNews.php?text='+$scope.query
      }).success(function(data){
        console.log('success');
        ngProgress.complete();
        $scope.news = data;
      });
    };
    $scope.query='';
    var searchActive = false;
    $scope.search = function(key){
      //console.log(key);
      if ($scope.query==''){
        console.log('empty');
        //empty input
        $scope.news=news.data;
      }else if(key==13){
        //press ENTER
        console.log('enter');
        httpSearch();
      }else if (!searchActive && $scope.query.length>2){
        //finish timeout and input large enough
        searchActive=true;
        httpSearch();
        $timeout(function(){
          console.log('timeout');
          searchActive=false;
        }, 3000);
      }
    };
}])
.controller('newCtrl', ['$scope', 'news', '$location','TitleService',
  function($scope,news,$location,TitleService){
    $scope.BASE_URL="http://pisacoderdojo.sfcoding.com/news/";
    news=news.data[0];
    TitleService.set(news.title);
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
}]);
