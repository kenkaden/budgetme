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
  .controller('EnvelopeCtrl', function ($scope, $http, $timeout, EnvelopeFactory, UsernameFactory) {
    $scope.envelopeSaved = "Save";

        UsernameFactory.getUser().then(function(data){
        $scope.loginId = data.user.id;
    });

    $scope.getEnvelope = function (){
      EnvelopeFactory.success(function(data){
        $scope.envelopeArray = data;
      })
    }();

    var regetEnvelopes = function(){
      $http.get('/api/expense/list_envelope/').success(function(data){
        $scope.envelopeArray = data;
      });
    };

    $scope.updateClick = function(envelope){
      $scope.envelopeName = envelope['name'];
      $scope.envelopeAmount = envelope['amount'];
      $scope.envelopePercentage = envelope['percentage'];
      $scope.envelopeId = envelope['id'];
    };

    $scope.envelopePatch = function(){
      var data={
        "name": $scope.envelopeName,
        "amount": $scope.envelopeAmount,
        "percentage": $scope.envelopePercentage,
    };

      $http.patch('/api/expense/update_envelope/' + $scope.envelopeId, data)
      .success (function(){
      $scope.envelopeSaved = 'Updated';

      function submitStatusTimeout(){
        $scope.envelopeSaved = 'Save';
      };

      $timeout(submitStatusTimeout, 1000);      
      regetEnvelopes();
      $scope.$emit('updateEnvelope', { message: 'msg from expense'});
      })
    };

    $scope.createEnvelope = function(){
      var data={
        "name": $scope.envelopeName,
        "amount": $scope.envelopeAmount,
        "percentage": $scope.envelopePercentage,
        "user": $scope.loginId
    };

      $http.post('/api/expense/create_envelope/', data)
      .success (function(){
      $scope.envelopeSaved = 'Created';

      function submitStatusTimeout(){
        $scope.envelopeSaved = 'Save';
      };

      $timeout(submitStatusTimeout, 1000);      
      regetEnvelopes();
      $scope.$emit('updateEnvelope', { message: 'msg from expense'});
      })
    };

    $scope.envelopeDelete = function(id){
      $http.delete('/api/expense/delete_envelope/' + id)
      .success(function(){
        regetEnvelopes();
        $scope.$emit('updateEnvelope', { message: 'msg from expense'});
      })
    };

    $scope.filterClick = function (type){
      if ($scope.filterType === type && $scope.filterType !== "-" + type){
        $scope.filterType = '-' + type;
      }
      else{
        $scope.filterType = type;
      } 
    };

    $scope.handleClick = function(msg){
    	$scope.$emit('updateEnvelope', { message: "msg from about"});
    	console.log("handleClick clicked");
    };
      $scope.$on('updateExpense', function(event, args){
        console.log("received from expense" + args.message);
      });
  });
