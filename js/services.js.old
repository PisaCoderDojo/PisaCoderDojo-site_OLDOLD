/* Services */
"use strict";

angular.module('coderDojoServices', [])
.factory('newsService', ['$http', 'tokenService', function($http, tokenService) {
  return {
    getNews: function(tag) {
      return $http({
        method: 'GET',
        url: (tag ? '/php/getNews.php?tag='+tag : '/php/getNews.php')
      });
    },
    getNew: function(id) {
      return $http({
        method: 'GET',
        url: '/php/getNews.php?id='+id
      });
    },
    modNews: function(news){
      news.token = tokenService.get();
      return $http({
        method: 'POST',
        url: '/php/modNews.php',
        data: news
      });
    },
    addNews: function(news){
      news.token = tokenService.get();
      return $http({
        method: 'POST',
        url: '/php/addNews.php',
        data: news
      });
    },
    delNews: function(id){
      return $http({
        method: 'POST',
        url: '/php/delNews.php',
        data: {id:id,token:tokenService.get()}
      });
    },
    getTags: function(){
      return $http({
        method: 'GET',
        url: '/php/getTags.php'
      });
    }
  };
}])
.factory('resourceService', ['$http', 'tokenService', function($http, tokenService) {
  return {
    getResources: function(cat) {
      return $http({
        method: 'GET',
        url: '/php/getResource.php?cat='+cat
      });
    },
    getResource: function(id) {
      return $http({
        method: 'GET',
        url: '/php/getResource.php?id='+id
      });
    },
    getCategory: function(){
      return $http({
        method: 'GET',
        url: '/php/getCategory.php'
      });
    },
    addCategory: function(cat){
      cat.token = tokenService.get();
      return $http({
        method: 'POST',
        url: '/php/addCategory.php',
        data: cat
      });
    },
    addResource: function(resource){
      resource.token = tokenService.get();
      return $http({
        method: 'POST',
        url: '/php/addResource.php',
        data: resource
      });
    },
    delCategory: function(id){
      return $http({
        method: 'POST',
        url: '/php/delCategory.php',
        data: {id:id,token:tokenService.get()}
      });
    },
    modCategory: function(cat){
      cat.token = tokenService.get();
      return $http({
        method: 'POST',
        url: '/php/modCategory.php',
        data: cat
      });
    },
    modResource: function(res){
      res.token = tokenService.get();
      return $http({
        method: 'POST',
        url: '/php/modResource.php',
        data: res
      });
    },
    delResource: function(id){
      return $http({
        method: 'POST',
        url: '/php/delResource.php',
        data: {id:id,token:tokenService.get()}
      });
    }
  };
}])
.factory('tagHelper',[
  function(){
    return {
      fromArray: function(tagArray){
        var ris = [];
        tagArray.forEach(function(tag){
          ris.push({name:tag});
        });
        return ris;
      },
      toArray: function(tagObj){
        var ris=[];
        tagObj.forEach(function(tag){
          ris.push(tag.name);
        });
        return ris;
      }
    };
}])
.factory('imageService', ['$http','tokenService', function($http,tokenService){
  return {
    upload: function(img){
      return $http({
        method: 'POST',
        url: '/php/updateImg.php',
        data: {img:img,token:tokenService.get()}
      });
    }
  };
}])
.factory('albumsService', ['$http', function($http) {
  return {
    getAlbums: function() {
      return $http({
        method: 'GET',
        url: '/php/getAlbums.php'
      });
    },
    getAlbum: function(id) {
      return $http({
        method: 'GET',
        url: '/php/getAlbums.php?id='+id
      });
    }
  };
}])
.factory('loginService', ['$http', function($http){
  return {
    login: function(pass){
      return $http({
        method:'POST',
        url: '/php/checkPass.php',
        data: {'password':pass}
      });
    }
  };
}])
.factory('tokenService', ['$cookies', function($cookies){
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
.factory('TitleService', [function(){
  var title = '';
  return {
    get: function(){
      return 'PisaCoderDojo' + title;
    },
    set: function(t){
      title = t ? ' - '+t : '';
    }
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
      data = new Date(data.items[data.items.length-1].start.dateTime);
      var now = new Date().getTime();
      return Math.floor((data - now)/(1000*60*60*24));
    },
    getEventBrite: function(data){
      return data.items[data.items.length-1].description;
    },
    getNote:function(data){
      console.log(data.items);
    }
  };
}]);
