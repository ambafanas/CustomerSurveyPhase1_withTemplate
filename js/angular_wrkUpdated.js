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
					var url='http://localhost:8080/RESTfulProject/REST/WebService/GetOraganizations' 
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
					var url='http://localhost:8080/RESTfulProject/REST/WebService/GetFirmDetails/' + surveyService.getUserID() ;
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
			
	});


myApp.factory('surveyService', function() {
  		var surveyData = [];
  		var userid='';
  		var FirmsData='';
  		var FirmID='';
		var OrganizationNames='';
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
    		getOrganizationNames:getOrganizationNames

  		};
	});


myApp.controller('SurveyForm',['$http','$scope','$location','surveyService', function($http,$scope,$location,surveyService,myVar) {
		
	   	$scope.surveyFormData=function(alldata){
        $scope.SurveyForm.firmID= surveyService.getFirmID();
		$scope.SurveyForm.userID= surveyService.getUserID();
    	var req={
 	method: 'POST',
 	url: 'http://localhost:8080/RESTfulProject/REST/WebService/WriteSurveyData',
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
			
			
			var url='http://localhost:8080/RESTfulProject/REST/WebService/GetLoginDetails/' + user.email +'/'+ user.password +'/' + user.Organization
			
						$scope.form1_data=angular.copy(user);
						//surveyService.addSurvey($scope.form1_data);
						$scope.test1= angular.toJson(user);
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



	


	
