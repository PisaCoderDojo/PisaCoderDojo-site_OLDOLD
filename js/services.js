/* Services */
"use strict";

angular.module('coderDojoServices', [])
.factory('newsService', ['$http', 'tokenService', function($http, tokenService) {
  return {
    getNews: function(tag) {
      return $http({
        method: 'GET',
        url: (tag ? 'php/getNews.php?tag='+tag : 'php/getNews.php')
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
    },
    getTags: function(){
      return $http({
        method: 'GET',
        url: 'php/getTags.php'
      });
    }
  }
}])
.factory('albumsService', ['$http', function($http) {
  return {
    getAlbums: function() {
      return $http({
        method: 'GET',
        url: 'php/getAlbums.php'
      });
    },
    getAlbum: function(id) {
      return $http({
        method: 'GET',
        url: 'php/getAlbums.php?id='+id
      });
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
      //console.log('onStart: '+tokenValue);
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
.factory('Event',['$http', function($http){
  var mykey = 'AIzaSyBVnDL-urhPD8VD-hbSftKN6aZtyHLWJTY'; // typically like Gtg-rtZdsreUr_fLfhgPfgff
  var calendarid = '4kg73k4bcukgr81qfgvah9p9r0@group.calendar.google.com'; // will look somewhat like 3ruy234vodf6hf4sdf5sd84f@group.calendar.google.com
  return {
    next: function(){
      return $http({
        method: 'GET',
        url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?key=' + mykey
      });
    },
    getDay: function(data){
      var data = new Date(data.items[data.items.length-1].start.dateTime);
      var now = new Date().getTime();
      return (data - now)/(1000*60*60*24);
    }
  };
}]);
