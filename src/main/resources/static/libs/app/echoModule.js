(function() {
	var app = angular.module("echoModule", []);

	app.service("echoService", function(myConfig, $q, $http, $log, utilsService) {
		var service = {
			hello : hello,
			enums : {
				type : undefined
			}
		};

		enums();

		return service;

		function hello(type, name) {
			var deferred = $q.defer();
			var url = myConfig.hostEndpoints[myConfig.ambiente] + '/echo/hello?';

			$http.post(url, {
				'name' : name,
				'type' : type
			}).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				$log.error("No se pudo obtener los datos por el siguiente problema:", response);
				$log.error(response);
				deferred.reject(response);
			});
			return deferred.promise;
		}

		function enums() {		
			utilsService.httpGetWithoutDeferring('/echo/types', function(response) {
				service.enums.type = response.data;
			});
		}
	});

	app.directive('echoMenu', function() {
		return {
			restrict : 'A',
			templateUrl : 'pages/echo/menu.html',
		}
	});

	app.directive('echoForm', function($filter, $msgbox, $uibModal, uiGridConstants, utilsService, echoService) {
		return {
			restrict : 'A',
			templateUrl : 'pages/echo/index.html',
			link : function(scope, element, attrs) {
				var vm = scope;

				vm.name = '';
				vm.type = undefined;
				vm.enums = echoService.enums;
				vm.response = undefined;

				vm.echo = function() {
					echoService.hello(vm.type, vm.name).then(function(data) {
						vm.response = data;
						alert(vm.response);
					}, function(error) {
						FuncionesError.generarAngularMsgboxSimple($msgbox, error);
						vm.response = "ERROR";
					});
				}
			}
		}
	});

	app.config(function($routeProvider) {
		$routeProvider.when("/echo/echo", {
			template : "<div echo-form></div>"
		});
	});
})();