var genText = function(){
  var i =0;
  var alf = "   qwertyuioplkjhgfdsazxcvbnm.,";
  console.log();
  var ris = '';
  while(i<501){
    ris += alf[Math.floor(Math.random()*(alf.length-1))];
    i++;
  }
  return ris;
};




var myApp = angular.module('coderDojo');

myApp.controller('HomeController', function($scope, $http) {
    $http.get('php/getNews.php').success(function(data){// vederee per far ritornare il file -son
      //qui non funziona, deve ritornare dat = .json
      echo " DATA JSON:";
     echo data ;
      $scope.news = data;
    }

    $scope.test="sei in Home!";

/*
    var i=0;
    var news=[];
    while(i<11){
      news[i]={};
      news[i].title="sample news "+i;
      news[i].date=i+" marzo 2015";
      news[i].text=genText();
      i++;
    }
    $scope.news=news;
*/

});
