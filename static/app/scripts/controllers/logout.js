'use strict';

angular.module('budgetmeApp')
  .controller('LogoutCtrl', function ($scope, $window, djangoAuth) {
    djangoAuth.logout();
    $window.location.href = "/";
   });
