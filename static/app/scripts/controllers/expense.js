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
  .controller('ExpenseCtrl', function ($scope, $q, $http, $location, $timeout, ReceiptFactory) {
    $scope.editStatus = false;
    $scope.receiptSaved = "Save";

    var getReceipts = function(){
      var deferred = $q.defer();
      ReceiptFactory.success(function(data){
        $scope.receiptArray = [];
        for (var i=0; i < data.length; i++){
          var detail = {
            "id": data[i]['id'],
            "name": data[i]['name'],
            "amount": parseFloat(parseFloat(data[i]['amount']).toFixed(2)),
            "date": data[i]['date'],
            "user": data[i]['user'],
            "envelope": data[i]['envelope']
          };
          $scope.receiptArray.push(detail);
        }
        deferred.resolve($scope.receiptArray);
      });
      return deferred.promise;
    };

    getReceipts();

    var regetReceipts = function(){
      var deferred = $q.defer();
      $http.get('/api/expense/list_receipt/').success(function(data){
        $scope.receiptArray = [];
        for (var i=0; i < data.length; i++){
          var detail = {
            "id": data[i]['id'],
            "name": data[i]['name'],
            "amount": parseFloat(parseFloat(data[i]['amount']).toFixed(2)),
            "date": data[i]['date'],
            "user": data[i]['user'],
            "envelope": data[i]['envelope']
          };
          $scope.receiptArray.push(detail);
        }
        deferred.resolve($scope.receiptArray);
      });
      return deferred.promise;
      regetReceipts();
    };

    $scope.editClick = function(){
      if ($scope.editStatus === false){
      $scope.editStatus = true;
      }
      else {
        $scope.editStatus = false;
      }
    };

    $scope.updateClick = function(index){
      $scope.receiptName = $scope.receiptArray[index]['name'];
      $scope.receiptAmount = $scope.receiptArray[index]['amount'];
      $scope.receiptEnvelope = $scope.receiptArray[index]['envelope'];
      $scope.receiptId = $scope.receiptArray[index]['id'];
    };

    $scope.receiptPatch = function(){
      var data={
        "name": $scope.receiptName,
        "amount": $scope.receiptAmount,
        "envelope": $scope.receiptEnvelope
      };

      $http.patch('/api/expense/update_receipt/' + $scope.receiptId, data)
      .success (function(){
      $scope.receiptSaved = 'Updated';

      function submitStatusTimeout(){
        $scope.receiptSaved = 'Save';
      };

      $timeout(submitStatusTimeout, 3000);
      regetReceipts();
      })
    };

    $scope.receiptDelete = function(id){
        console.log("delete clicked id: " + id);
        $http.delete('/api/expense/delete_receipt/' + id)
        .success(function(){
          regetReceipts();
      })
    };


  }); //end of scope
