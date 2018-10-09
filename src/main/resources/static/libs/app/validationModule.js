(function() {
	var app = angular.module("validationModule", []);
	var INTEGER_REGEXP = /^-?\d+$/;

	app.directive('documento', function() {
		return {
			require : 'ngModel',
			scope : {
				tipoDocumento : '@'
			},
			link : function(scope, element, attrs, ctrl) {
				ctrl.$validators.documento = function(modelValue, viewValue) {
					if (ctrl.$isEmpty(modelValue)) {
						return true;
					}

					if (isDocumentoValido(scope.tipoDocumento, viewValue)) {
						return true;
					}

					// it is invalid
					return false;
				};

				function isDocumentoValido(tipo, documento) {
					console.log(tipo + " - " + documento);

					if (!INTEGER_REGEXP.test(documento)) {
						return false;
					}

					if (tipo == 'DOCUMENTO_UNICO') {
						if (documento.length > 8)
							return false;
					} else if (tipo == 'CUIT') {
						return validaCuit(documento);
					}
					
					return true;
				}

				function validaCuit(sCUIT) {
					var aMult = '6789456789';
					var aMult = aMult.split('');
					var sCUIT = String(sCUIT);
					var iResult = 0;
					var aCUIT = sCUIT.split('');

					if (aCUIT.length == 11) {
						// La suma de los productos
						for (var i = 0; i <= 9; i++) {
							iResult += aCUIT[i] * aMult[i];
						}
						// El módulo de 11
						iResult = (iResult % 11);

						// Se compara el resultado con el dígito verificador
						return (iResult == aCUIT[10]);
					}
					return false;
				}
			}
		}
	});
})();