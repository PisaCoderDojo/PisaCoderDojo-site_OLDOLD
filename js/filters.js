'use strict';

/* Filters */
var coderDojoFilters = angular.module('coderDojoFilters', [])

coderDojoFilters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
