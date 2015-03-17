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
  .controller('ExpenseCtrl', function ($scope, $http, $location, $timeout, ReceiptFactory) {
    $scope.receiptSaved = "Save";
    $scope.filterType = 'date';
    $scope.datePositive = true;

    var getReceipts = function(){
      ReceiptFactory.success(function(data){
        $scope.receiptArray = data;
      });
    }();

    var regetReceipts = function(){
      $http.get('/api/expense/list_receipt/').success(function(data){
        $scope.receiptArray = data;
      });
    };

    $scope.updateClick = function(receipt){
      $scope.receiptName = receipt['name'];
      $scope.receiptAmount = receipt['amount'];
      $scope.receiptEnvelope = receipt['envelope'];
      $scope.receiptId = receipt['id'];
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

      $timeout(submitStatusTimeout, 1000);
      regetReceipts();
      })
    };

    $scope.receiptDelete = function(id){
      $http.delete('/api/expense/delete_receipt/' + id)
      .success(function(){
        regetReceipts();
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

    $scope.$on('updateExpense', function(){
      regetReceipts();
    });

  }); //end of scope
