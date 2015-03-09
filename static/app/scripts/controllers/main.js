'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.state = '';
    $scope.toggle =  function(){
    	if ($scope.state === ''){
    		$scope.state = 'toggled';
    		console.log('clicked');
    	}
    	else {
    		$scope.state = '';
		}
    };
  });
