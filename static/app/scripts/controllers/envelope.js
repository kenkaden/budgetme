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
    return $http.get('/api/expense/expense_total/');
    })
  .factory('BasicInfoFactory', function($http){ 
    return $http.get('/api/baseinfo/update/');
    })
  .controller('EnvelopeCtrl', function ($scope, $http, $q, $timeout, EnvelopeFactory, UsernameFactory, BasicInfoFactory) {
    $scope.envelopeSaved = "Save";
    $scope.pieArray = [];

    UsernameFactory.getUser().then(function(data){
        $scope.loginId = data.id;
    });

    BasicInfoFactory.success(function(data){
      $scope.flexmoney = data.flex_money;
    });

    $scope.getEnvelope = function (){
      EnvelopeFactory.success(function(data){
        $scope.envelopeArray = data;
      });
    }();

    var regetEnvelopes = function(){
      $http.get('api/expense/expense_total/').success(function(data){
        $scope.envelopeArray = data;
      }).then(function(data){
        pieData(data['data']);
        flexAllocation(data['data']);
      })
    };

    regetEnvelopes();

    var graph = function(){
      $http.get('/api/expense/graph/').success(function(data){
        $scope.graphData = data;
      });
    };

    graph();

    var flexAllocation = function(data){
      var deferred = $q.defer();
      $scope.flexAllocate = $scope.flexmoney;
      for (var i=0; i < data.length; i++){
        $scope.flexAllocate -= data[i]['amount'];
        deferred.resolve($scope.flexAllocate);
        console.log($scope.flexAllocate);
      }
      return deferred.promise;
    }

    $scope.updateClick = function(envelope){
      $scope.envelopeName = envelope['name'];
      $scope.envelopeAmount = envelope['amount'];
      $scope.envelopeId = envelope['id'];
    };

    $scope.envelopePatch = function(){
      var data={
        "name": $scope.envelopeName,
        "amount": $scope.envelopeAmount,
    };

      $http.patch('/api/expense/update_envelope/' + $scope.envelopeId, data)
      .success (function(){
      $scope.envelopeSaved = 'Updated';

      function submitStatusTimeout(){
        $scope.envelopeSaved = 'Save';
      };

      $timeout(submitStatusTimeout, 1000);      
      regetEnvelopes();
      graph();
      $scope.$emit('updateEnvelope', { message: 'msg from expense'});
      })
    };

    $scope.createEnvelope = function(){
      var data={
        "name": $scope.envelopeName,
        "amount": $scope.envelopeAmount,
        "user": $scope.loginId
    };

      $http.post('/api/expense/create_envelope/', data)
      .success (function(){
      $scope.envelopeSaved = 'Created';
      $scope.envelopeName = '';
      $scope.envelopeAmount = '';


      function submitStatusTimeout(){
        $scope.envelopeSaved = 'Save';
      };

      $timeout(submitStatusTimeout, 1000);      
      regetEnvelopes();
      graph();
      $scope.$emit('updateEnvelope', { message: 'msg from expense'});
      })
    };

    $scope.envelopeDelete = function(id){
      $http.delete('/api/expense/delete_envelope/' + id)
      .success(function(){
        regetEnvelopes();
        graph();
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

    // D3 settings
    // $scope.exampleData = [
    //      { key: "Flex Money", y: 230.12 },
    //      { key: "Groceries", y: 100.56 },
    //      { key: "Transportation", y: 100.25 },
    //      { key: "Dining Out", y: 50.26 },
    //      { key: "Movies", y: 50.67 },
    //  ];

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

  }); //end of controller
