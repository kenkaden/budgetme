'use strict';

angular.module('budgetmeApp')
  .controller('LoginCtrl', function ($scope, $location, $rootScope, djangoAuth, Validate) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
          console.log('login: ' + data);
        	$location.path("/");
            $rootScope.logname = $scope.model.username;
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
