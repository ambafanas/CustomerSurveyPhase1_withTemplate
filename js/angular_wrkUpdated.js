	// create the module and name it scotchApp
	var myApp = angular.module('myApp', ['ngRoute']);

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			.when('/survey', {
				templateUrl : 'login.html',
				controller  : 'CustomerSurvey',
				resolve: {

			     
				myVar: function ($q,surveyService,$timeout,$http) {
					var defer = $q.defer();
					var url= surveyService.getRestAPIURL() + 'GetOraganizations' 
					var req={
				 	method: 'GET',
				 	url: url,
				 	headers: {
				  		  'Content-Type': 'application/json'	
				  		  
				  		  }
				   };
				   var firmdata='';
					 $http(req).then(function successCallback(response) {
					 	//debugger;
		 			firmdata=response.data;
		 			
		 			surveyService.setOrganizationNames(response);
		 			 defer.resolve('done');
		 			})
					 return defer.promise;
			}}
			})
			.when('/surveyForm', {
				templateUrl : 'surveyForm.html',
				controller  : 'SurveyForm'})

			.when('/AllFirmsByEvaluator', {
				templateUrl : 'AllFirmsByEvaluator.html',
				controller  : 'FirmDetails',
				resolve: {

			     
				myVar: function ($q,surveyService,$timeout,$http) {
					var defer = $q.defer();
					var url=surveyService.getRestAPIURL() +'GetFirmDetails/' + surveyService.getUserID() ;
					var req={
				 	method: 'GET',
				 	url: url,
				 	headers: {
				  		  'Content-Type': 'application/json'}
				   };
					var firmdata='';
					 $http(req).then(function successCallback(response) {
					 	//debugger;
		 			firmdata=response.data;
		 			surveyService.setFirmsData(response.data);
		 			 defer.resolve('done');
		 			})
					return defer.promise;
			  }}
			})
			.when('/reports', {
				templateUrl : 'reports.html'
				
			})

			.when('/thankQ', {
				templateUrl : 'thankQ.html'
				
			})
			.when('/', {
				templateUrl : 'home.html'
				
			})
			.when('/about_us', {
				templateUrl : 'about_us.html'
				
			})
			.when('/contact_us', {
				templateUrl : 'contact_us.html'
				
			})
			.when('/forgotPassword', {
				templateUrl : 'forgotPassword.html'
				
			})
			
	});


myApp.factory('surveyService', function() {
  		var surveyData = [];
  		var userid='';
  		var FirmsData='';
  		var FirmID='';
		var OrganizationNames='';
		var RestAPIURL='http://localhost:8080/RESTfulProject/REST/WebService/';
		var getRestAPIURL = function(){
     		return RestAPIURL;
  		};

		var setOrganizationNames = function(org) {
     		OrganizationNames=org.data;
  		};

  		var getOrganizationNames = function(){
     		return OrganizationNames;
  		};
  		var addSurvey = function(newObj) {
     		surveyData.push(newObj);
  		};

  		var getSurvey = function(){
     		return surveyData;
  		};
  		var setUserID=function(uid){
  				userid=uid;
  				console.log("Set User ID :>>>>>>>>>>>"+userid);
  		}
  		var getUserID=function(){
  			console.log("Get User ID :>>>>>>>>>>>"+userid);
  			return userid;
  		}

  		var setFirmsData=function(fdata){
  				FirmsData=fdata;
  				console.log("Set firmdata :>>>>>>>>>>>"+FirmsData);
  		}
  		var getFirmsData=function(){
  			console.log("Get FirmsData :>>>>>>>>>>>"+FirmsData);
  			return FirmsData;
  		}
  		var saveFirmID =function(firmid,uid){
  			FirmID=firmid
  		}
  		var getFirmID =function(){
  			return FirmID;
  		}
  		return {
    		addSurvey: addSurvey,
    		getSurvey: getSurvey,
    		getUserID:getUserID,
    		setUserID:setUserID,
    		getFirmsData:getFirmsData,
    		setFirmsData:setFirmsData,
    		saveFirmID:saveFirmID,
    		getFirmID:getFirmID,
    		setOrganizationNames:setOrganizationNames,
    		getOrganizationNames:getOrganizationNames,
    		getRestAPIURL:getRestAPIURL

  		};
	});


myApp.controller('SurveyForm',['$http','$scope','$location','surveyService', function($http,$scope,$location,surveyService,myVar) {
		
	   	$scope.surveyFormData=function(alldata){
        $scope.SurveyForm.firmID= surveyService.getFirmID();
		$scope.SurveyForm.userID= surveyService.getUserID();
    	var req={
 	method: 'POST',
 	url: surveyService.getRestAPIURL()+'WriteSurveyData',
 	headers: {
  		  'Content-Type': 'application/json'}, data:angular.toJson(alldata)
   };
 				
 		$http(req);
    		$location.path('/thankQ');
    	}
	}]);
myApp.controller('FirmDetails',['$http','$scope','$location','surveyService', function($http,$scope,$location,surveyService,myVar) {
		$scope.form1_data={};
		$scope.userdata={};
		$scope.firms= surveyService.getFirmsData();
		//alert(angular.toJson($scope.firms));
		console.log($scope.firms.data);
    	$scope.getSurveyDone=function(firmid,uid){

    		surveyService.saveFirmID(firmid);
    		//alert(firmid + " dsfdfd   >>>>>" + uid );
    		$location.path('/surveyForm');
    	}
	}]);


myApp.controller('CustomerSurvey',['$http','$timeout','$scope','$location','surveyService', function($http,$timeout,$scope,$location,surveyService) {
		$scope.form1_data={};
		$scope.userdata={};
		$scope.Organizations=surveyService.getOrganizationNames();
		$scope.SubmitLoginDetails = function(user)
		{  
			
			
			
			
						$scope.form1_data=angular.copy(user);
						//surveyService.addSurvey($scope.form1_data);
						$scope.test1= angular.toJson(user);
						var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

						
						// Encode the String
						var encodedString = Base64.encode(user.password);
						alert(encodedString);
						// Decode the String
						var decodedString = Base64.decode(encodedString);
						alert(decodedString);
						var url=surveyService.getRestAPIURL() + 'GetLoginDetails/' + user.email +'/'+encodedString +'/' + user.Organization
				 var req={
				 	method: 'GET',
				 	url: url,
				 	headers: {
				  		  'Content-Type': 'application/json'}
				   };
				 		
				 	 $timeout(function(){
			       	
				 		$http(req).then(function successCallback(response) {

				 			
				 			if(response.data.userID){
				 				
								    $scope.userdata=response.data;
								    surveyService.setUserID(response.data.userID);
								    $location.path('/AllFirmsByEvaluator');

		    					}
						  
				    else{
				    	alert("Invalid User ID or Password");
				    }
				  }, function errorCallback(response) {
				    
				  });

			          
			        },100);


        
    	}

    	
	}]);



	


	
