angular.module('myController', [])
	.controller('mainController', ['$scope','$http', function($scope, $http) {
		$scope.formData = {};
		$scope.cards = []
		
		$scope.get()
			$http.get('/cards')
			.success(function(data) {
				$scope.cards = data;
			});
		
		$scope.addCard = function() {	
			$http.post('/addcard', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; 
					$scope.cards = data;
			});			
		};

		$scope.showCardDetails = function(card) {
			$scope.cards.forEach((p)=>{
				if(p.cardnumber===card.cardnumber){
				p.showTableflag = !p.showTableflag;
				}
			})		
		}

	}]);