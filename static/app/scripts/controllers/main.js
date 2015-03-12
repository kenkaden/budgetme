'use strict';

/**
 * @ngdoc function
 * @name budgetmeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the budgetmeApp
 */
angular.module('budgetmeApp')
  .service('ExpenseService', function($http){
    this.post = function(receiptName, amount, envelope) {
        var data = {
            'name': receiptName,
            'amount': amount,
            'envelope': envelope
        };

        $http.post('/api/expense/create_receipt/', data);
    };
  })
  .factory('EnvelopeFactory', function($http){ 
    return $http.get('/api/expense/list_envelope/');
    })
  .factory('UsernameFactory', function($http, $q){ 
    return {
        getUser: function() {
            var nameDeferred = $q.defer();
            $http.get('/api/baseinfo/update/').success(function(data){
                nameDeferred.resolve(data.user.username);
            });
            return nameDeferred.promise;
        }
      }
    })
  .controller('MainCtrl', function ($scope, ExpenseService, EnvelopeFactory, UsernameFactory, $q, $http) {
    $scope.problem = false; 
    $scope.loginName ='';

    $scope.$on('updateEnvelope', function(event, args){
        var updateDeferred = $q.defer();
        $scope.message = args.message;
        console.log($scope.message);
        $http.get('/api/expense/list_envelope/').success(function(data){
        $scope.envelopeArray = [];
            for (var i=0; i < data.length; i++) {
                $scope.envelopeArray.push(data[i].name);
                updateDeferred.resolve($scope.envelopeArray);
                }
        })
        return updateDeferred.promise;
    });

    
    UsernameFactory.getUser().then(function(data){
        $scope.loginName = data;
    });

    var getEnvelopes = function(){
    var deferred = $q.defer();  
    EnvelopeFactory.success(function(data){
        $scope.envelopeArray = [];
            for (var i=0; i < data.length; i++) {
                $scope.envelopeArray.push(data[i].name);
                deferred.resolve($scope.envelopeArray);
                }
        });
            return deferred.promise;
    };

    getEnvelopes().then(function(){
        $scope.envelopeOption = $scope.envelopeArray[0];
    });

    $scope.toggle = function() {
     var myEl = angular.element( document.querySelector( '#wrapper' ) );
     myEl.toggleClass('toggled');     
    };

    $scope.expenseSubmit = function(name, amount, envelope){
        if (name !== undefined || amount !== undefined) {
        console.log(name + ' ' + amount + ' ' + envelope);
        $scope.problem = false;
    } 
    else {
        console.log('Missing field');
        $scope.problem = true;
    }
    };

  });
