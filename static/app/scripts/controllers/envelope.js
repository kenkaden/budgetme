'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .controller('EnvelopeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.handleClick = function(msg){
    	$scope.$emit('updateEnvelope', { message: "msg from about"});
    	console.log("handleClick clicked");
    };
      $scope.$on('updateExpense', function(event, args){
        console.log("received from expense" + args.message);
      });
  });
