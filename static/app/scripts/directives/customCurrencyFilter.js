'use strict';


angular.module('customCurrency', [])
.filter('customCurrency', function () {       
  return function(amount){
  	 var amount = amount.toString();
  	 var temp = '';

     var currency = ''; 

     if (amount.charAt(0) === '-' ){
     	amount.toString();
     	temp = (amount.replace('-', '-$')).split(".");
     	currency = temp[0] + "." + temp[1][0] + temp[1][1];
     } else {
     	temp = amount.split(".")
     	currency = '$' + temp[0] + "." + temp[1][0] + temp[1][1];
     }       
     return currency;
  };
});