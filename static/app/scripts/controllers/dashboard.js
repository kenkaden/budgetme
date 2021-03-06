'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .factory('ReceiptFactory', function($http){ 
    return $http.get('/api/expense/list_receipt/');
    })
  .controller('DashboardCtrl', function ($scope) {
    $scope.handleClick = function(msg){
    	$scope.$emit('updateEnvelope', { message: "msg from about"});
    	console.log("handleClick clicked");
    };
      $scope.$on('updateExpense', function(event, args){
        console.log("received from expense" + args.message);
      });
  });
