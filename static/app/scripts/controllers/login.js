'use strict';

angular.module('budgetmeApp')
  .controller('LoginCtrl', function ($scope, $location, $window, djangoAuth, Validate) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	// $location.path("/");
          $window.location.href = "#/dashboard";
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    };
  $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

  });
