(function() {
  "use strict";

  angular.module('coderDojoServices', [])
    .factory('newsService', ['$http', 'tokenService', function($http, tokenService) {
      return {
        getNews: function(tag) {
          return $http({
            method: 'GET',
            url: (tag ? '/api/news?tag=' + tag : '/api/news')
          });
        },
        getNew: function(id) {
          return $http({
            method: 'GET',
            url: '/api/news/' + id
          });
        },
        modNews: function(id, news) {
          news.token = tokenService.get();
          return $http({
            method: 'PUT',
            url: '/api/news/' + id,
            data: news
          });
        },
        addNews: function(news) {
          news.token = tokenService.get();
          return $http({
            method: 'POST',
            url: '/api/news',
            data: news
          });
        },
        searchNews: function(text) {
          return $http({
            method: 'GET',
            url: 'api/news?search=' + text
          });
        },
        delNews: function(id) {
          return $http({
            method: 'DELETE',
            url: '/api/news/' + id,
            data: {
              token: tokenService.get()
            }
          });
        },
        getTags: function() {
          return $http({
            method: 'GET',
            url: '/api/tags'
          });
        }
      };
    }])
    .factory('resourceService', ['$http', 'tokenService', function($http, tokenService) {
      return {
        getResources: function(cat) {
          return $http({
            method: 'GET',
            url: '/api/resources?category=' + cat
          });
        },
        getResource: function(id) {
          return $http({
            method: 'GET',
            url: '/api/resources/' + id
          });
        },
        addResource: function(resource) {
          resource.token = tokenService.get();
          return $http({
            method: 'POST',
            url: '/api/resources',
            data: resource
          });
        },
        modResource: function(id, res) {
          res.token = tokenService.get();
          return $http({
            method: 'PUT',
            url: '/api/resources/' + id,
            data: res
          });
        },
        delResource: function(id) {
          return $http({
            method: 'DELETE',
            url: '/api/resources/' + id,
            data: {
              token: tokenService.get()
            }
          });
        }
      };
    }])
    .factory('categoryService', ['$http', 'tokenService', function($http, tokenService) {
      return {
        getCategory: function() {
          return $http({
            method: 'GET',
            url: '/api/category'
          });
        },
        addCategory: function(cat) {
          cat.token = tokenService.get();
          return $http({
            method: 'POST',
            url: '/api/category',
            data: cat
          });
        },
        delCategory: function(id) {
          return $http({
            method: 'DELETE',
            url: '/api/category/' + id,
            data: {
              token: tokenService.get()
            }
          });
        },
        modCategory: function(id, cat) {
          cat.token = tokenService.get();
          return $http({
            method: 'PUT',
            url: '/api/category/' + id,
            data: cat
          });
        }
      };
    }])
    .factory('resourceHelper', [function() {
      return {
        toArray: function(r) {
          //if (r!=='') r+=',';
          var resourceList = r.split(',');
          for (var i = 0; i < resourceList.length; i++) {
            resourceList[i] = ({
              link: resourceList[i]
            });
          }
          return resourceList;
        },
        toString: function(r) {
          var resourceList = [];
          for (var i = 0; i < r.length; i++) {
            if (r[i].link !== '')
              resourceList.push(r[i].link);
          }
          return resourceList.join(',');
        }
      };
    }])
    .factory('mailService', ['$http', function($http) {
      return {
        send: function(mail, subject, text) {
          return $http({
            method: 'POST',
            url: 'api/sendmail',
            data: {
              mail: mail,
              subject: subject,
              text: typeof text == 'string' ? text : text.join('<br/>')
            }
          });
        },
        selectionToString: function(array) {
          var stringa = "";
          var first = true;
          for (var i = 0; i < array.length; i++) {
            var object = array[i];
            if (object.value === true) {
              if (!first)
                stringa += ', ';
              stringa += object.name;
              first = false;
            }
          }
          return stringa;
        }
      }
    }])
    .factory('imageService', ['$http', 'tokenService', function($http, tokenService) {
      return {
        upload: function(img) {
          return $http({
            method: 'POST',
            url: '/api/photo',
            data: {
              img: img,
              token: tokenService.get()
            }
          });
        }
      };
    }])
    .factory('albumsService', ['$http', function($http) {
      return {
        getAlbums: function() {
          return $http({
            method: 'GET',
            url: '/api/album'
          });
        },
        getAlbum: function(id) {
          return $http({
            method: 'GET',
            url: '/api/album/' + id
          });
        }
      };
    }])
    .factory('loginService', ['$http', function($http) {
      return {
        login: function(pass) {
          return $http({
            method: 'POST',
            url: '/api/login',
            data: {
              'password': pass
            }
          });
        }
      };
    }])
    .factory('tokenService', ['$cookies', function($cookies) {
      var tokenValue;
      return {
        copyCookie: function() {
          tokenValue = $cookies.token;
          //console.log('onStart: '+tokenValue);
        },
        set: function(token) {
          if (this.remember) {
            $cookies.token = token;
          }
          tokenValue = token;
        },
        get: function() {
          return tokenValue;
        },
        isSet: function() {
          return tokenValue !== undefined;
        },
        remember: false
      };
    }])
    .factory('TitleService', [function() {
      var title = '';
      return {
        get: function() {
          return 'PisaCoderDojo' + title;
        },
        set: function(t) {
          title = t ? ' - ' + t : '';
        }
      };
    }])
    .factory('Event', ['$http', function($http) {
      var mykey = 'AIzaSyBVnDL-urhPD8VD-hbSftKN6aZtyHLWJTY'; // typically like Gtg-rtZdsreUr_fLfhgPfgff
      var calendarid = '4kg73k4bcukgr81qfgvah9p9r0@group.calendar.google.com'; // will look somewhat like 3ruy234vodf6hf4sdf5sd84f@group.calendar.google.com
      return {
        next: function() {
          return $http({
            method: 'GET',
            url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events?key=' + mykey
          });
        },
        getDay: function(data) {
          data = new Date(data.items[data.items.length - 1].start.dateTime);
          var now = new Date().getTime();
          return Math.floor((data - now) / (1000 * 60 * 60 * 24));
        },
        getEventBrite: function(data) {
          return data.items[data.items.length - 1].description;
        },
        getNote: function(data) {
          console.log(data.items);
        }
      };
    }]);
})();
