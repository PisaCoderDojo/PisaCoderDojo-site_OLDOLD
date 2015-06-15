
angular.module('coderDojoAdminServices', [])
.factory('tagHelper',[function(){
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
}]);
