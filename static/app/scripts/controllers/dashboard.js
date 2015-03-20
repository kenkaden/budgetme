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

    var graph = function(){
      $http.get('/api/expense/graph/').success(function(data){
        $scope.graphData = data;
      });
    };

    graph();

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

    // D3 settings
    //for Pie Chart

    var pieData = function(data){
      $scope.flexleft = $scope.flexmoney;
      var deferred = $q.defer();
      for (var i=0; i < data.length; i++){
        $scope.pieArray.push({"key": data[i]['key'], "y": data[i]['spent']})
        $scope.flexleft -= data[i]['spent'];
        deferred.resolve($scope.pieArray);

      }
      $scope.pieArray.push({"key": "Flex Money", "y": $scope.flexleft});
      return deferred.promise;
    };

    $scope.xFunction = function(){
      return function(d){
        return d.key;
      };
    }

    $scope.yFunction = function(){
      return function(d){
        return d.y;
      };
    }

    var colorArray = ['#FF00CC', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
    $scope.colorFunction = function() {
      return function(d, i) {
          return colorArray[i];
        };
    }

    $scope.$on('updateExpense', function(){
      regetEnvelopes();
      graph();
    });

  }); // End of controller
