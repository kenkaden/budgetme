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
     	if (temp[1][1] === undefined){
     	currency = temp[0] + "." + temp[1][0] + '0';
     	} else {
     		currency = temp[0] + "." + temp[1][0] + temp[1][1];
     	}
     } else if (temp === undefined){
     	currency = '0.00';
     } 
     else {
     	temp = amount.split(".")
	     	if (temp[1][1] === undefined){
	     		currency = temp[0] + "." + temp[1][0] + '0'
	     	} else {
	     		currency = temp[0] + "." + temp[1][0] + temp[1][1];
	     	}
     }       
     return currency;
  };
});