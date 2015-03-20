'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:AboutCtrl
 * @description
 * # DashboardCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .factory('UserProfileFactory', function($http){ 
    return $http.get('/api/baseinfo/update/');
    })
  .controller('DashboardCtrl', function ($scope, $http, $timeout, UserProfileFactory, UsernameFactory){ 
    $scope.updateStatus = 'Save';
    $scope.incomeAdded = 'Add';

    UserProfileFactory.success(function(data){
      $scope.budgetArray = data;
      $scope.income = $scope.budgetArray['income'];
    })
    .error(function(err){
      console.log("This is a first time user");
    });

    UsernameFactory.getUser().then(function(data){
        $scope.loginId = data.id;
    });

    var updateProfile = function(){
      $http.get('/api/baseinfo/update/')
      .success(function(data){
        $scope.budgetArray = data;
        $scope.income = $scope.budgetArray['income'];
      })
    };

    $scope.updateClick = function(){
      $scope.incomeAmount = $scope.income;
    };

    $scope.updateSubmit = function(){
      var data = {
        "income": parseFloat(($scope.incomeAmount).toFixed(2)),
        "fixed_cost": parseFloat(($scope.incomeAmount * 0.6).toFixed(2)),
        "investment": parseFloat(($scope.incomeAmount * 0.1).toFixed(2)),
        "savings": parseFloat(($scope.incomeAmount * 0.1).toFixed(2)),
        "flex_money": parseFloat(($scope.incomeAmount * 0.2).toFixed(2))
      }

      function submitStatusTimeout(){
          $scope.updateStatus = 'Save';
      };

      $http.patch('/api/baseinfo/update/', data)
      .success(function(data){
        $scope.$broadcast('updateExpense', { message: 'msg from expense'});
        $scope.updateStatus ='Updating';
        $timeout(submitStatusTimeout, 2000);
        updateProfile();
      });
    };

    $scope.createIncome = function(){
      var data = {
        "income": parseFloat(($scope.incomeAmountNew).toFixed(2)),
        "fixed_cost": parseFloat(($scope.incomeAmountNew * 0.6).toFixed(2)),
        "investment": parseFloat(($scope.incomeAmountNew * 0.1).toFixed(2)),
        "savings": parseFloat(($scope.incomeAmountNew * 0.1).toFixed(2)),
        "flex_money": parseFloat(($scope.incomeAmountNew * 0.2).toFixed(2)),
        "user": $scope.loginId
      }

      $http.post('/api/baseinfo/create/', data)
      .success(function(data){
        $scope.$broadcast('updateExpense', { message: 'msg from expense'});
        $scope.incomeAdded ='';
        updateProfile();
      });
    };


  }); // End of controller
