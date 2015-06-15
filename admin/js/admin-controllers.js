/* Controllers */
"use strict";
angular.module('AdminControllers', [])
.controller('adminNewsCtrl', ['$scope', 'news', '$location', '$cookies', 'newsService',
  function($scope, news, $location, $cookies, newsService){
    $scope.news = news.data;

    $scope.modify = function(id){
      $location.path('/edit/news/' + id);
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

    $scope.delete = function(item){
      $('#deleteModal').modal('hide');
      newsService.delNews(item.id).success(function(data){
        //console.log(data);
        if(data=='success')
          $scope.news.splice(item.key,1);
      });
    };
}])
.controller('adminResourceCtrl', ['$scope', 'actualCategoryId', 'category', 'resource', 'resourceService', 'categoryService', '$location', '$cookies',
  function($scope, actualCategoryId, category, resource, resourceService, categoryService, $location, $cookies){
    $scope.category = category.data;
    $scope.isModCat = false;
    $scope.isAddCat = false;

    $scope.changeCat = function(cat){
      if (cat){
        $location.path('resource/' + cat.id);
      }
    };

    if (actualCategoryId){
      $scope.category.forEach(function(item){
        if(item.id==actualCategoryId)
          $scope.actualCategory=item;
      });
      $scope.resource = resource.data;
      console.log($scope.resource);
    }else
      $scope.changeCat($scope.category[0]);

    $scope.addCategory = function(){
      $scope.inputModCat='';
      $scope.isAddCat = true;
    };

    $scope.modCategory = function(){
      $scope.inputModCat='';
      $scope.isModCat = true;
      $scope.inputModCat = $scope.actualCategory.name;
    };

    $scope.saveAddCat = function(){
      if($scope.isAddCat){
        categoryService.addCategory({name:$scope.inputModCat}).success(function(data){
            data = parseInt(data);
            if(!isNaN(data)){
              $scope.isAddCat = false;
              $location.path('resource/' + data);
            }else
              console.log('error: '+data);
        });
      }else if($scope.isModCat){
        categoryService.modCategory($scope.actualCategory.id,{name:$scope.inputModCat})
          .success(function(data){
            if(data=='success'){
              $scope.isModCat=false;
              $scope.actualCategory.name = $scope.inputModCat;
            }else
              console.log('error: '+data);
          });
      }
    };

    $scope.delCategory = function(){
      categoryService.delCategory(actualCategoryId).success(function(data){
        if(data=='success'){
          $location.path('resource');
        }else
          console.log('error: '+data);
      });
    };

    $scope.modify = function(id){
      $location.path('/edit/resource/cat/'+actualCategoryId+'/id/' + id);
    };

    $scope.showDelModal = function(id,key){
      $scope.delNews = {key:key,
                        id:id,
                        title:$scope.resource[key].title
                        };
                        //console.log($scope.delNews);
      $('#deleteModal').modal('show');
    };

    $scope.delete = function(item){
      $('#deleteModal').modal('hide');
      resourceService.delResource(item.id).success(function(data){
        //console.log(data);
        if(data=='success')
          $scope.resource.splice(item.key,1);
      });
    };
}])
.controller('modNewsCtrl', ['$scope','news','newsService','$location','tagHelper','tags',
  function($scope,news,newsService,$location,tagHelper,tags){
    news=news.data;
    if (news===undefined)
      $location.path('/admin');
    else{
      console.log(news);
      var id = news.id;
      $scope.title=news.title;
      $scope.user=news.author;
      $scope.text=news.body;
      $scope.tags=tagHelper.fromArray(news.tags);
    }
    $scope.submit = function(){
      var data = {title:$scope.title,
                  user:$scope.user,
                  text:$scope.text,
                  tags:tagHelper.toArray($scope.tags)
                  };
      newsService.modNews(id,data).success(function(data){
        if(data=='success'){
          $location.path('/admin');
        }
      });
    };
    $scope.loadTags = function(query) {
      console.log(tags.data);
      return tags.data;
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
.controller('addNewsCtrl', ['$scope', 'newsService', '$location', 'tagHelper','tags',
  function($scope, newsService, $location, tagHelper,tags){
    $scope.submit = function(){
      if ($scope.title!=='' && $scope.text!=='' && $scope.user!==''){
        console.log(tagHelper.fromArray($scope.tags));
        newsService.addNews({
          title: $scope.title,
          text: $scope.text,
          user: $scope.user,
          tags: tagHelper.fromArray($scope.tags)
        }).success(function(data){
          if(data=='success')
            $location.path('/admin');
        });
      }
    };
    $scope.loadTags = function(query) {
      return tags.data;
    };
}])
.controller('addResourceCtrl', ['$scope', 'categoryId', 'resource', 'resourceService', 'resourceHelper','$location',
  function($scope, categoryId, resource, resourceService, resourceHelper, $location){

    $scope.editRes = {resource:[{link:''}], category_id: categoryId};

    $scope.keydown = function(key,item){
      if (item.link === ''){
        $scope.editRes.resource.splice(key,1);
        console.log('key: '+key);
      }
      var last = $scope.editRes.resource.length-1;
      if($scope.editRes.resource[last].link !== ''){
        $scope.editRes.resource.push({link:''});
      }

    };

    $scope.submit = function(){
      if ($scope.editRes.title && $scope.editRes.description){

        var stringRes = resourceHelper.toString($scope.editRes.resource);
        $scope.editRes.resource = stringRes;

        //add resource
        resourceService.addResource(categoryId,$scope.editRes).success(function(data){
          if (data=='success')
            $location.path('resource/'+categoryId);
          else
            console.log('error: '+data);
        });
      }else
        console.log('missed name or description');
    };
}])
.controller('modResourceCtrl', ['$scope', 'categoryId', 'resource', 'resourceService', 'resourceHelper', '$location',
  function($scope, categoryId, resource, resourceService, resourceHelper, $location){
    if (resource){
      resource = resource.data;
      $scope.editRes = {
        title: resource.title,
        description: resource.description,
        resource: resourceHelper.toArray(resource.resource),
        category_id: categoryId
      };
    }

    $scope.keydown = function(key,item){
      if (item.link === ''){
        $scope.editRes.resource.splice(key,1);
        console.log('key: '+key);
      }
      var last = $scope.editRes.resource.length-1;
      if($scope.editRes.resource[last].link !== ''){
        $scope.editRes.resource.push({link:''});
      }

    };

    $scope.submit = function(){
      if ($scope.editRes.title && $scope.editRes.description){

        var stringRes = resourceHelper.toString($scope.editRes.resource);
        $scope.editRes.resource = stringRes;

        //Modify resource
        resourceService.modResource(resource.id, $scope.editRes)
          .success(function(data){
            if (data=='success')
              $location.path('resource/'+categoryId);
            else
              console.log('error: '+data);
          });
      }else
        console.log('missed name or description');
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
