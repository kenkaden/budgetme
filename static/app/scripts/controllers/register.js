'use strict';

angular.module('budgetmeApp')
  .controller('RegisterCtrl', function ($scope, $location, $window, djangoAuth, Validate) {
    var hideToggle = function(){
      $scope.$emit('hideMenu', {message:"msg from RegisterCtrl"});
    };

    hideToggle();

  	$scope.model = {'username':'','password':'','email':''};
  	$scope.complete = false;
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email)
        .then(function(data){
        	// success case
        	$scope.complete = true;
          alert("Thank you for registering");
          // $location.path("/login");
          $window.location.href = "#/login";
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });
