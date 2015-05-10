'use strict';

/* Directives */
angular.module('coderDojoDirectives', [])
.directive('admin-sidebar', function() {
  return {
    restrict: 'E',
    scope: {
      menuList: '=menu'
    },
    templateUrl: 'admin-sidebar.html'
  };
});
