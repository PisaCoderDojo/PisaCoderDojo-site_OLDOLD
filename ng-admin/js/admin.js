// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', [
  'ng-admin',
  'ngCookies',
  'AdminControllers',
  'coderDojoServices'
]);

myApp.run(['$rootScope','$location','tokenService',
  function($rootScope,$location,tokenService){
    tokenService.copyCookie();
    $rootScope.$on('$stateChangeStart', function(data, current) {
      //ngProgress.start();
      if (!tokenService.isSet()){
        $location.path('/login');
      }
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      //ngProgress.complete();
    });
    $rootScope.$on("$stateChangeError", function(event, current, previous, rejection) {
      console.log(event);
    });
}]);

myApp.config(['$locationProvider',
function($locationProvider) {
  // configure html5 to get links working on jsfiddle
  //$locationProvider.html5Mode(true);
}]);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', '$stateProvider', function (nga,$stateProvider) {

  $stateProvider.state('login',{
      url:'/login',
      templateUrl: 'html/login.html',
      controller: 'loginCtrl'
    });
  // create an admin application
  var admin = nga.application('My First Admin')
    .baseApiUrl('/api/'); // main API endpoint
  // create a user entity
  // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id

  var news = nga.entity('news');
  // set the fields of the user entity list view
  news.listView().fields([
      nga.field('title').isDetailLink(true),
      nga.field('author'),
      nga.field('creation_date','datetime')
  ]);
  news.listView().filters([
    nga.field('search').label('Search').pinned(true)
  ]);

  news.listView().url(function(entityId) {
    console.log(entityId);
  });

  news.showView().fields([
    nga.field('title')
    .validation({ required: true, minlength: 3, maxlength: 100 }),,
    nga.field('body','wysiwyg'),
    nga.field('author'),
    nga.field('tags', 'json'),
    nga.field('creation_date','datetime')
  ]);
  news.editionView().fields(news.creationView().fields());
  // add the user entity to the admin application
  admin.addEntity(news);

  var category = nga.entity('category');
  // set the fields of the user entity list view
  category.listView().fields([
      nga.field('name').isDetailLink(true)
  ]);

  category.creationView().fields([
      nga.field('name')
  ]);

  category.editionView().fields(category.creationView().fields());
  // add the user entity to the admin application

  var resources = nga.entity('resources');
  // set the fields of the user entity list view
  resources.listView().fields([
      nga.field('title').isDetailLink(true),
      nga.field('category_id', 'reference')
        .label('Category')
        .targetEntity(category)
        .targetField(nga.field('name')),
      nga.field('creation_date','datetime')
  ]);

  resources.creationView().fields([
    nga.field('title'),
    nga.field('description','text'),
    nga.field('links','json')
      .map(function (value, entry) {
          return JSON.parse(value);
      })
      .transform(function (value, entry) {
          // the API expects upper case last names
          return JSON.stringify(value);
      }),
    nga.field('category_id', 'reference')
      .label('Category')
      .targetEntity(category)
      .targetField(nga.field('name')),
    nga.field('creation_date','datetime')
  ]);
  resources.editionView().fields(resources.creationView().fields());
  // add the user entity to the admin application
  admin.addEntity(resources);

  admin.addEntity(category);
  // attach the admin application to the DOM and execute it
  nga.configure(admin);


}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            // custom pagination params
            /*if (params._page) {
                params._start = (params._page - 1) * params._perPage;
                params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            // custom sort params
            if (params._sortField) {
                params._sort = params._sortField;
                params._order = params._sortDir;
                delete params._sortField;
                delete params._sortDir;
            }*/
            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
    });
}]);
