(function() {
	var app = angular.module("datosUsuarioModule", []);

	app.directive("datosusuarioMenu", function($rootScope, $interval) {
		return {
			restrict : "EA",
			templateUrl : "pages/datosUsuario/menu.html",
			link : function($scope, element, attrs) {
				$scope.status = {
					isopen : false
				};

				$scope.toggleDropdown = function($event) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.status.isopen = !$scope.status.isopen;
				};

				$scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

				//$scope.horario = new Date();
				//$interval(function() {
           		//	$scope.horario = new Date();
          		//}, 100);
			}
		};
	});
})();