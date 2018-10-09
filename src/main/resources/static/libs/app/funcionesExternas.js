"use strict";

var Constantes = {
	NEW_LINE_PATTERN : /(?:\r\n|\r|\n)/g,
	JSON_START : /^\s*(\[|\{[^\{])/,
	JSON_END : /[\}\]]\s*$/,
	HTML_PAGE_BREAK : '<br/>'
}

var FuncionesError = {
	obtenerObjetoError : function(error) {
		if (error)
			if (error.data) {
				return error.data;
			} else if (error.config) {
				return {
					message : error.statusText,
					cause : undefined,
					stackTrace : undefined
				};
			} else {
				if (error.message) {
					return error;
				}
			}
		return error.toString();
	},

	obtenerMensajeTrace : function(trace) {
		return trace.className + trace.methodName + "(" + trace.fileName + ":" + trace.lineNumber + ")"
	},

	obtenerStackTrace : function(error) {
		var msg = "";

		msg += "<div style=\"font-size: 10px\">";

		var stackTrace = error.stackTrace;

		for (var i = 0; i < stackTrace.length; i++) {
			msg += Constantes.HTML_PAGE_BREAK + FuncionesError.obtenerMensajeTrace(stackTrace[i]);
		}

		if (error.cause) {
			msg += Constantes.HTML_PAGE_BREAK + Constantes.HTML_PAGE_BREAK + "<label style=\"font-size: 12px\">Causado por: </label>" + FuncionesError.obtenerStackTrace(error.cause);
		}

		msg += "</div>";

		return msg;
	},

	obtenerMensajeCause : function(cause) {
		var msg = "'" + FuncionesError.obtenerMensajeError(cause) + "'";
		if (cause.cause) {
			msg += " causado por " + FuncionesError.obtenerMensajeCause(cause.cause);
		}
		return msg;
	},

	obtenerMensajeError : function(error) {
		if (error.message)
			return error.message;
		return 'Error desconocido';
	},

	generarMensaje : function(error) {
		var msg = "";

		if (error) {
			if (typeof error == 'object') {
				var errorObject = FuncionesError.obtenerObjetoError(error);
				msg += 'Mensaje: ' + FuncionesError.obtenerMensajeError(errorObject);

				if (errorObject.cause) {
					msg += Constantes.HTML_PAGE_BREAK + Constantes.HTML_PAGE_BREAK + "Causa: " + FuncionesError.obtenerMensajeCause(errorObject.cause);
				}

				if (errorObject.stackTrace) {
					msg += Constantes.HTML_PAGE_BREAK + Constantes.HTML_PAGE_BREAK + "StackTrace: " + Constantes.HTML_PAGE_BREAK + FuncionesError.obtenerStackTrace(errorObject);
				}
			} else {
				msg += error.toString();
			}
		} else {
			msg += "Error desconocido";
		}

		return msg;
	},

	generarAngularMsgboxSimple : function($msgbox, error, callback) {
		FuncionesGenerales.generarAngularMsgboxSimple($msgbox, FuncionesError.generarMensaje(error), 'ERROR', callback);
	}
};

var FuncionesGenerales = {
	appendTransform : function(defaults, transform) {

		// We can't guarantee that the default transformation is an array
		defaults = angular.isArray(defaults) ? defaults : [ defaults ];

		// Append the new transformation to the defaults
		return defaults.concat(transform);
	},

	customTransformResponse : function(data) {
		var response;
		if (Constantes.JSON_START.test(data) && Constantes.JSON_END.test(data)) {
			var newline = Constantes.NEW_LINE_PATTERN;
			var newResponse = data.replace(newline, "\\n");
			response = newResponse;
		} else {
			response = data;
		}
		return response;
	},

	tieneRol : function(roles, rol) {
		console.log(roles);
		if (roles instanceof Array) {
			for (var i = 0; i < roles.length; i++) {
				if (rol.toUpperCase() == roles[i].toUpperCase()) {
					return true;
				}
			}
		} else {
			if (rol.toUpperCase() == roles.toUpperCase()) {
				return true;
			}
		}

		return false;
	},

	trim : function(value) {
		if (Object.prototype.toString.call(value) === "[object String]") {
			return value.replace(/^\s+|\s+$/gm, '');
		} else {
			return value;
		}
	},
	
	generarAngularMsgboxSimple : function($msgbox, message, title, callback) {
		$msgbox.show(message, {
			title : title,
			size : 'lg'
		}).then(function() {
			if (callback)
				callback();
		});
	}
};