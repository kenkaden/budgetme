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
  .controller('MainCtrl', function ($scope, ExpenseService, EnvelopeFactory, $q) {
    $scope.state = '';

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

    getEnvelopes();

    $scope.toggle =  function(){
    	if ($scope.state === ''){
    		$scope.state = 'toggled';
    	}
    	else {
    		$scope.state = '';
		}
    };

    $scope.expenseSubmit = function(name){console.log(name)};

  });
