'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .factory('EnvelopeFactory', function($http){ 
    return $http.get('/api/expense/list_envelope/');
    })
  .controller('EnvelopeCtrl', function ($scope, EnvelopeFactory) {

    $scope.getEnvelope = function (){
      EnvelopeFactory.success(function(data){
        console.log(data);
        $scope.envelopeArray = data;
      })
    }();

    $scope.handleClick = function(msg){
    	$scope.$emit('updateEnvelope', { message: "msg from about"});
    	console.log("handleClick clicked");
    };
      $scope.$on('updateExpense', function(event, args){
        console.log("received from expense" + args.message);
      });
  });
