(function() {
	var app = angular.module("menuModule", ['ngRoute']);

	app.directive("menu", function($rootScope) {
		return {
			restrict : "AE",
			templateUrl : "pages/menu.html",
			link : function($scope, element, attrs) {
				
			}
		};
	});

	// Manejo de rutas (menu)
	// ngRoute
	app.config([ '$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		// Definicion de rutas
		$routeProvider
		.when("/", {
			templateUrl : "pages/home.html"
		})
		.when("/about", {
			templateUrl : "pages/about.html"
		})
		.when("/flappyGame", {
			template : "<div flappy-game></div>"
		})
		.otherwise({
			template : "<div class='jumbotron'><h1>Lo sentimos</h1><p>No se ha encontrado la pagina a la que intenta ingresar</p></div>"
		});

		// use the HTML5 History API
		// $locationProvider.html5Mode(true);

		/*
		 * Arreglo por issue 'aa077e8' Ver
		 * https://docs.angularjs.org/guide/migration#commit-aa077e8
		 */
		$locationProvider.hashPrefix('');
	} ]);
})();