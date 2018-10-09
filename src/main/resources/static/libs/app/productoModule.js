(function() {
	var app = angular.module("productoModule", []);

	app.service("productoService", function(myConfig, $q, $http, $log, utilsService) {
		var service = {
			save : save,
			findAll : findAll,
			enums : {
			}
		};

		enums();

		return service;

		function save(producto) {
			var deferred = $q.defer();
			var url = myConfig.hostEndpoints[myConfig.ambiente] + '/producto/save';

			$http.post(url, producto).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				$log.error("No se pudo obtener los datos por el siguiente problema:", response);
				$log.error(response);
				deferred.reject(response);
			});
			return deferred.promise;
		}
		
		function findAll() {
			var deferred = $q.defer();
			var url = myConfig.hostEndpoints[myConfig.ambiente] + '/producto/findAll';

			$http.get(url).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				$log.error("No se pudo obtener los datos por el siguiente problema:", response);
				$log.error(response);
				deferred.reject(response);
			});
			return deferred.promise;
		}

		function enums() {		
			
		}
	});

	app.directive('productoMenu', function() {
		return {
			restrict : 'A',
			templateUrl : 'pages/producto/menu.html',
		}
	});

	app.directive('altaProductoForm', function($filter, $msgbox, $uibModal, uiGridConstants, utilsService, productoService) {
		return {
			restrict : 'A',
			templateUrl : 'pages/producto/alta.html',
			link : function(scope, element, attrs) {
				var vm = scope;

				vm.producto = undefined;
				vm.enums = productoService.enums;

				vm.save = function() {
					productoService.save(vm.producto).then(function(data) {
						alert("Se ha grabado correctamente el producto");
					}, function(error) {
						FuncionesError.generarAngularMsgboxSimple($msgbox, error);
					});
				}
			}
		}
	});
	
	app.directive('consultaProductoForm', function($filter, $msgbox, $uibModal, uiGridConstants, utilsService, productoService) {
		return {
			restrict : 'A',
			templateUrl : 'pages/producto/consulta.html',
			link : function(scope, element, attrs) {
				var vm = scope;

				vm.enums = productoService.enums;
				
				vm.gridApi = {};
				vm.gridOptions = {
					enableFiltering : true,
					enableGridMenu : true,
					enableSorting : true,
					onRegisterApi : function(gridApi){
						vm.gridApi = {};
					},
					columnDefs : [
						{
							displayName : 'SKU',
							field : 'sku',
							type : 'text',
							width : '10%',
							visible : true
						},
						{
							displayName : 'Nombre',
							field : 'nombre',
							type : 'text'
						}
					]
				};

				vm.findAll = function() {
					productoService.findAll().then(function(data) {
						//vm.productos = data;
						vm.gridOptions.data = data;
					}, function(error) {
						FuncionesError.generarAngularMsgboxSimple($msgbox, error);
					});
				};
				
				vm.findAll();
			}
		}
	});

	app.config(function($routeProvider) {
		$routeProvider.when("/producto/alta", {
			template : "<div alta-producto-form></div>"
		}).when("/producto/consulta", {
			template : "<div consulta-producto-form></div>"
		});
	});
})();