(function() {
  "use strict";
  angular.module('coderDojoControllers', [])
    .controller('homeCtrl', ['$scope', 'Event',
      function($scope, Event) {
        /*Event.next().success(function(data){
          $scope.eventBrite = Event.getEventBrite(data);
          $scope.nextEvent = Event.getDay(data);
          $scope.eventIsSet = $scope.nextEvent>=0;
        });
        */
        var data = new Date('2015-12-10');
        var now = new Date().getTime();
        $scope.eventBrite = 'https://www.eventbrite.it/e/biglietti-pisa-coderdojo-12-19854207469?ref=elink';
        $scope.nextEvent = Math.floor((data - now) / (1000 * 60 * 60 * 24));
        $scope.eventIsSet = $scope.nextEvent >= 0;
      }
    ])
    .controller('newsCtrl', ['$scope', 'news', 'tags', '$route', '$timeout', '$http', 'ngProgress', 'TitleService', 'newsService',
      function($scope, news, tags, $route, $timeout, $http, ngProgress, TitleService, newsService) {
        $scope.BASE_URL = "http://pisa.coderdojo.it/news/";
        $scope.news = news.data;
        $scope.tags = tags.data;
        $scope.currentTag = $route.current.params.tag || -1;
        if ($scope.currentTag != -1)
          TitleService.set($scope.currentTag);

        $scope.orderProp = 'age';

        var httpSearch = function() {
          ngProgress.start();
          newsService.searchNews($scope.query).success(function(data) {
            console.log('success');
            ngProgress.complete();
            $scope.news = data;
          });
        };
        $scope.query = '';
        var searchActive = false;
        $scope.search = function(key) {
          //console.log(key);
          if ($scope.query === '') {
            console.log('empty');
            //empty input
            $scope.news = news.data;
          } else if (key == 13) {
            //press ENTER
            console.log('enter');
            httpSearch();
          } else if (!searchActive && $scope.query.length > 2) {
            //finish timeout and input large enough
            searchActive = true;
            httpSearch();
            $timeout(function() {
              console.log('timeout');
              searchActive = false;
            }, 3000);
          }
        };
      }
    ])
    .controller('newCtrl', ['$scope', 'news', '$location', 'TitleService',
      function($scope, news, $location, TitleService) {
        $scope.BASE_URL = "http://pisa.coderdojo.it/news/";
        news = news.data;
        TitleService.set(news.title);
        if (news === undefined)
          $location.path('/news');
        else {
          $scope.new = news;
        }
      }
    ])
    .controller('resourceCtrl', ['$scope', 'resource', 'resourceHelper', 'TitleService',
      function($scope, resource, resourceHelper, TitleService) {
        //TitleService.set(resource.title);
        if (resource) {
          $scope.allresource = resource.data;
        }

        for (var i = 0; i < $scope.allresource.length; i++) {
          $scope.allresource[i].resource = JSON.parse($scope.allresource[i].links);
        }
      }
    ])
    .controller('albumsCtrl', ['$scope', 'albums',
      function($scope, albums) {
        $scope.albums = albums.data;
        console.log(albums.data);
        $scope.getImg = function(id) {
          return 'https://graph.facebook.com/' + id + '/picture?type=album';
        };
      }
    ])
    .controller('albumCtrl', ['$scope', 'album',
      function($scope, album) {
        $scope.album = album.data;
        //console.log(album.data);
      }
    ])
    .controller('aboutCtrl', ['$scope', 'actualMentors', 'oldMentors',
      function($scope, actualMentors, oldMentors) {
        $scope.people = actualMentors.data;
        $scope.peopleOld = oldMentors.data;
        $scope.formatDate = function(date) {
          return '(' + date.begin + '-' + date.end + ')';
        };
      }
    ])
    .controller('mentorCtrl', ['$scope', '$http',
      function($scope, $http) {
        $scope.selection = [{
          name: "Informatica",
          value: false
        }, {
          name: "Didattica",
          value: false
        }, {
          name: "Esperienze con in bambini",
          value: false
        }, {
          name: "Marketing",
          value: false
        }, {
          name: "Organizazzione eventi",
          value: false
        }];
        $scope.howyouknow = [{
          name: "Giornali",
          value: false
        }, {
          name: "Social",
          value: false
        }, {
          name: "Amici",
          value: false
        }, {
          name: "Newsletter",
          value: false
        }];
        $scope.isSend = false;

        var getValue = function(array) {
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
        };
        $scope.send = function() {
          var t = '<b>name:</b> ' + $scope.name +
            '<br/> <b>age:</b> ' + $scope.age +
            '<br/> <b>selection:</b> ' + getValue($scope.selection) +
            '<br/> <b>aboutyou:</b> ' + $scope.aboutyou +
            '<br/> <b>howknow:</b> ' + getValue($scope.howyouknow);
          //console.log($scope.mail+' '+t);
          $http({
            method: 'POST',
            url: 'api/sendmail',
            data: {
              "mail": $scope.mail,
              'subject': "New mentor want to join us",
              'text': t
            }
          }).success(function(data) {
            //console.log(data);
            if (data == 'true')
              $scope.isSend = true;
          });
        };
      }
    ])
    .controller('schoolCtrl', ['$scope', 'mailService',
      function($scope, mailService) {
        $scope.howyouknow = [{
          name: "Giornali",
          value: false
        }, {
          name: "Social",
          value: false
        }, {
          name: "Amici",
          value: false
        }, {
          name: "Newsletter",
          value: false
        }];
        $scope.isSend = false;
        $scope.send = function() {
          mailService.send($scope.mail,
            'New School', [
              '<b>name:</b> ' + $scope.name,
              '<b>school:</b> ' + $scope.scuola,
              '<b>classi:</b> ' + $scope.classe,
              '<b>howknow:</b> ' + mailService.selectionToString($scope.howyouknow),
              '<b>note:</b> ' + $scope.note
            ]).success(function(data) {
            if (data == 'true')
              $scope.isSend = true;
          });
        };
      }
    ])
    .controller('contactCtrl', ['$scope', '$http',
      function($scope, $http) {
        $scope.isSend = false;
        $scope.send = function() {
          //console.log($scope.mail+' '+$scope.subject+' '+$scope.text);
          $http({
            method: 'POST',
            url: 'api/sendmail',
            data: {
              'mail': $scope.mail,
              'subject': $scope.subject,
              'text': $scope.text
            }
          }).success(function(data) {
            //console.log(data);
            if (data == 'true')
              $scope.isSend = true;
          });
        };
      }
    ]);
})();
