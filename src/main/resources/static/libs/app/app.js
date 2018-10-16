"use strict";

var angularDependencies = [ 'base64', 'ngSanitize', 'ngMessages', 'ngMaterial', 'ng-pros.directive.autocomplete' ];
var uiGridDependencies = [ 'ui.grid', 'ui.grid.edit', 'ui.grid.exporter', 'ui.grid.selection', 'ui.grid.pagination', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.bootstrap', 'ui.select' ];
var thirdPartyDependencies = [ 'msgbox' ];
var basicAppDependencies = [ 'utilsModule', 'validationModule', 'appModule', 'datosUsuarioModule', 'menuModule' ];
var businessAppDependencies = [ 'echoModule', 'productoModule', 'comboModule' ];
var dependencies = [];

(function() {
	dependencies = dependencies.concat(angularDependencies);
	dependencies = dependencies.concat(uiGridDependencies);
	dependencies = dependencies.concat(thirdPartyDependencies);
	dependencies = dependencies.concat(basicAppDependencies);
	dependencies = dependencies.concat(businessAppDependencies);

	var app = angular.module('app', dependencies);

	app.constant("myConfig", {
		url : "",
		port : "",
		ambiente : "PROD",
		hostEndpoints : {
			"LOCAL" : ".",
			"DESA" : ".",
			"PROD" : "."
		}
	});

	app.config(function($httpProvider) {
		$httpProvider.interceptors.push(function($q, $rootScope, $injector) {
			var STATUS_CODES = [400, 401, 403, 404];
			return {
				'request' : function(config) {
					$rootScope.requesting = true;
					return config || $q.when(config);
				},
				'response' : function(response) {
					$rootScope.requesting = false;
					return response || $q.when(response);
				},
				'responseError' : function(rejection) {
					$rootScope.requesting = false;
					angular.forEach(STATUS_CODES, function(code) {
						if (rejection.status == code) {
							FuncionesError.generarAngularMsgboxSimple($injector.get('$msgbox'), rejection);
							return;
						}
					});
					return $q.reject(rejection);
				}
			}
		});
	});

	app.run(function($rootScope, $q, $interval, $http, $base64, $msgbox, myConfig, appService, i18nService) {
		$rootScope.titulo = "SKU";
		
		// Setea el idioma de ui-grid
		i18nService.setCurrentLang('es');

		// Mejora en la transformacion de la respuesta http
		$http.defaults.transformResponse.unshift(FuncionesGenerales.customTransformResponse);

        // Seteo los tokens para la seguridad contra CSRF
        var header = angular.element('meta[name=\'_csrf_header\']').get(0).content;
        var token = angular.element('meta[name=\'_csrf\']').get(0).content;
        $http.defaults.headers.post[header] = token;

		// Datos del usuario
		$rootScope.usuario = {};
		appService.obtenerUsuarioActual().then(function(usuario) {
			if (appService.esUsuarioValido(usuario)) {
				$rootScope.msgError = "No se pudo obtener el usuario de la sesion";
				$msgbox.show($rootScope.msgError, {
					title : 'ERROR',
					size : 'lg'
				});
				return;
			}
			$rootScope.usuario = usuario;
		}, function(data) {
			console.log(data);
		});
	});
})();