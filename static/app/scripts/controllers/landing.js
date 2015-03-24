'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:AboutCtrl
 * @description
 * # LandingCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .controller('LandingCtrl', function ($scope) {
    var hideToggle = function(){
      $scope.$emit('hideMenu', {message:"msg from LandingCtrl"});
    };

    hideToggle();

    $scope.handleClick = function(msg){
    	$scope.$emit('updateEnvelope', { message: "msg from about"});
    	console.log("handleClick clicked");
    };
      $scope.$on('updateExpense', function(event, args){
        console.log("received from expense" + args.message);
      });
  });
