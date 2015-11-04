	// create the module and name it scotchApp
	var myApp = angular.module('myApp', ['ngRoute']);

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl : 'user_account-creation.html',
				controller  : 'user_account'
			})
			.when('/customer_satisfaction', {
				templateUrl : 'customer_satisfaction.html',
				controller  : 'customer_satisfaction'
			})
			.when('/customer_support_follow_up', {
				templateUrl : 'customer_support_follow_up.html',
				controller  : 'customer_follow_up'
			})
			.when('/thankQ', {
				templateUrl : 'thankQ.html'
				
			})
			.when('/about_us', {
				templateUrl : 'about_us.html'
				
			})
			 .when('/contact_us', {
                templateUrl : 'contact_us.html',
               
            })
			 .when('/login', {
				templateUrl : 'login.html'
				
			});
	});

	myApp.factory('surveyService', function() {
  		var surveyData = [];

  		var addSurvey = function(newObj) {
     		surveyData.push(newObj);
  		};

  		var getSurvey = function(){
     		return surveyData;
  		};

  		return {
    		addSurvey: addSurvey,
    		getSurvey: getSurvey
  		};
	});

	myApp.controller('user_account',['$scope','$location','surveyService', function($scope,$location,surveyService) {
		$scope.form1_data={};
		$scope.user_account_data = function(user){  
		$scope.form1_data=angular.copy(user);
		surveyService.addSurvey($scope.form1_data);
		//console.log($scope.form1_data);
		 user_account_creation(); 
        $location.path('/customer_satisfaction');
    	}
    	
	}]);

/*	myApp.controller('user_account',function($scope,$http){
		$http.get('js/state.json').success(function(response){
			$scope.myData = response;
		});
	});*/

	
	myApp.controller('customer_satisfaction',['$scope', '$location','surveyService', function($scope,$location,surveyService) {
		$scope.form2_data={};
		$scope.customer_satisfaction_data = function(customer_satisfaction){  
		$scope.form2_data=angular.copy(customer_satisfaction);
		surveyService.addSurvey($scope.form2_data);
		//console.log($scope.form2_data);
		cust_satisfaction();
        $location.path('/customer_support_follow_up');
    	}
    	
	}]);

	myApp.controller('customer_follow_up',['$scope', '$location','surveyService', function($scope,$location,surveyService) {
		$scope.form3_data={};
		$scope.customer_follow_up_data = function(followupData){  
			$scope.form3_data=angular.copy(followupData);
			surveyService.addSurvey($scope.form3_data);
			console.log(surveyService.getSurvey());
			customer_support_follow_up();
			$location.path('/thankQ');
    	}
    	
	}]);
	// myApp.controller('about_usController', function($scope) {
 //        $scope.message = 'Look! I am an about page.';
 //    });

 //    myApp.controller('contact_usController', function($scope) {
 //        $scope.message = 'Contact us! JK. This is just a demo.';
 //    });
	
