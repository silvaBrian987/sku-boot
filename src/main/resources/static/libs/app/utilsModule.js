(function() {
	var app = angular.module("utilsModule", []);

	app.service("utilsService", function(myConfig, $q, $http, $log, $msgbox, $uibModal) {
		var service = {
			isValidDate : isValidDate,
			hoursDifference : hoursDifference,
			minutesDifference : minutesDifference,
			timeDifference : timeDifference,
			addTime : addTime,
			httpGetWithoutDeferring : httpGetWithoutDeferring,
			errorMsgbox : errorMsgbox
		};
		return service;

		function isValidDate(d) {
			if (Object.prototype.toString.call(d) === "[object Date]") {
				// it is a date
				if (isNaN(d.getTime())) { // d.valueOf() could also work
					// date is not valid
					return false;
				} else {
					// date is valid
					return true;
				}
			} else {
				// not a date
				return false;
			}
		}

		function hoursDifference(d1, d2) {
			return timeDifference(d1, d2, 1000 * 60 * 60);
		}

		function minutesDifference(d1, d2) {
			return timeDifference(d1, d2, 1000 * 60);
		}

		function timeDifference(d1, d2, pivot_time) {
			if (typeof pivot_time === 'undefined')
				pivot_time = 1;

			if (isValidDate(d1) && isValidDate(d2)) {
				var date1_ms = d1.getTime();
				var date2_ms = d2.getTime();
				var difference_ms = date2_ms - date1_ms;
				return Math.round(difference_ms / pivot_time);
			} else {
				return 'NaN';
			}
		}

		function addTime(originalDate, years, months, days, hours, minutes, seconds, milliseconds) {
			var date = new Date(originalDate.toUTCString());
			if (years)
				date.setFullYear(date.getFullYear() + years);
			if (months)
				date.setMonth(date.getMonth() + months);
			if (days)
				date.setDate(date.getDate() + days);
			if (hours)
				date.setHours(date.getHours() + hours);
			if (minutes)
				date.setMinutes(date.getMinutes() + minutes);
			if (seconds)
				date.setSeconds(date.getSeconds() + seconds);
			if (milliseconds)
				date.setMilliseconds(date.getMilliseconds() + milliseconds);
			return date;
		}

		function httpGetWithoutDeferring(url, callback) {
			var url = myConfig.hostEndpoints[myConfig.ambiente] + url;

			$http.get(url).then(function successCallback(response) {
				callback(response);
			}, function errorCallback(response) {
				var error = FuncionesError.obtenerObjetoError(response);
				$log.error(error);
				throw error;
			});
		}

		function errorMsgbox(error, title, showStacktrace) {
			$uibModal.open({
				templateUrl : 'pages/utils/errorMsgbox.html',
				// scope : scope,
				controller : function($scope, $uibModalInstance) {
					$scope.title = title;
					$scope.exception = error;
					$scope.showStacktrace = showStacktrace;

					$scope.ok = function($event) {
						$event.preventDefault();
						$uibModalInstance.close();
					}
				},
				size : "md",
				backdrop : "static",
				keyboard : false
			});
		}
	});

	app.directive("mydatepicker", function() {
		return {
			restrict : "AE",
			templateUrl : "pages/utils/datepicker.html",
			scope : {
				dtModel : '=',
				dateOptions : '=',
				format : '='
			},
			replace : true,
			link : function($scope, elem, attr, ctrl) {
				$scope.opened = false;

				$scope.open = function(event) {
					event.preventDefault();
					event.stopPropagation();
					$scope.opened = !$scope.opened;
				}
			},
		// controllerAs : "datepickerCtrl"
		};
	});

	app.directive('downloadfile', function() {
		return {
			restrict : 'AE',
			templateUrl : 'pages/utils/downloadFile.html',
			scope : {
				linktext : '=',
				linkurl : '=',
				linkfilename : '='
			},
		// replace : true,
		};
	});

	app.directive("fileread", [ function() {
		return {
			scope : {
				fileread : "="
			},
			link : function(scope, element, attributes) {
				element.bind("change", function(changeEvent) {
					// var reader = new FileReader();
					// reader.onload = function (loadEvent) {
					// scope.$apply(function () {
					// scope.fileread = loadEvent.target.result;
					// });
					// }
					// reader.readAsDataURL(changeEvent.target.files[0]);

					scope.$apply(function() {
						scope.fileread = changeEvent.target.files[0];
					});
				});
			}
		}
	} ]);

	app.filter('trim', function() {
		return function(value) {
			return FuncionesGenerales.trim(value);
		};
	});

	app.directive('compile', [ '$compile', function($compile) {
		return function(scope, element, attrs) {
			scope.$watch(function(scope) {
				// watch the 'compile' expression for changes
				return scope.$eval(attrs.compile);
			}, function(value) {
				// when the 'compile' expression changes
				// assign it into the current DOM
				element.html(value);

				// compile the new DOM and link it to the current
				// scope.
				// NOTE: we only compile .childNodes so that
				// we don't get into infinite loop compiling ourselves
				$compile(element.contents())(scope);
			});
		};
	} ]);

	app.service('myHttpService', function() {
		var service = {
			get : get,
			post : post
		}
		return service;

		function httpObject(method, url, data, ok_callback, error_callback, async) {
			var req = new XMLHttpRequest();
			req.open(method, url, async);
			if (async) {
				req.onreadystatechange = function(aEvt) {
					if (req.readyState == 4) {
						if (req.status == 200) {
							ok_callback(req.responseText);
						} else {
							error_callback(req.responseText)
						}
					}
				};
				req.send(data);
			} else {
				req.send(data);
				if (req.status == 200) {
					ok_callback(req.responseText);
				} else {
					error_callback(req.responseText)
				}
			}
		}

		function get(url, ok_callback, error_callback, async) {
			httpObject('GET', url, null, ok_callback, error_callback, async);
		}

		function post(url, body, ok_callback, error_callback, async) {
			httpObject('POST', url, body, ok_callback, error_callback, async);
		}
	});

	app.directive('flappyGame', function($interval, $document) {
		return {
			restrict : 'A',
			templateUrl : 'pages/utils/flappyGame.html',
			scope : {},
			link : function(scope, element, attrs) {
				scope.start = function() {
					var canvasContainer = element.querySelectorAll('#canvasContainer')[0];
					scope.canvas = document.createElement('canvas');
					scope.context = scope.canvas.getContext('2d');

					scope.canvas = document.createElement('canvas');
					scope.canvas.width = canvasContainer.clientWidth;
					scope.canvas.height = 270;
					scope.context = this.canvas.getContext("2d");

					// document.body.insertBefore(game.canvas,
					// document.getElementById('canvas'));
					canvasContainer.append(scope.canvas);

					// scope.fps = 16.67;
					scope.fps = 10;
					scope.frameCount = 0;
					scope.playerComponent = scope.createComponent(30, 30, "red", 10, 120);

					$document.on('keyup', function($event) {
						$event.preventDefault();
						$event.stopPropagation();

						if ($event.keyCode == 32)
							scope.playerComponent.gravity = -1.5
					});

					scope.playerComponent.newPos();

					scope.obstacles = [];
					scope.gameInterval = $interval(function() {
						scope.update();
						scope.frameCount++;
					}, scope.fps);
				}
				scope.update = function() {
					var x, height, gap, minHeight, maxHeight, minGap, maxGap;
					for (i = 0; i < scope.obstacles.length; i += 1) {
						var obstacle = scope.obstacles[i];
						if (scope.playerComponent.crashWith(obstacle)) {
							if (obstacle.triggered != undefined) {
								if(!obstacle.triggered){
									scope.playerComponent.score += 10;
									obstacle.triggered = true;
								}
							} else {
								scope.gameOver();
								return;
							}
						}
					}

					scope.clear();

					if (scope.everyInterval(150)) {
						var x = scope.canvas.width;
						var minHeight = 20;
						var maxHeight = 200;
						var height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
						var minGap = 50;
						var maxGap = 200;
						var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
						scope.obstacles.push(new scope.createComponent(10, height, 'green', x, 0));
						scope.obstacles.push(new function() {
							var trigger = new scope.createComponent(10, gap, 'transparent', x, height)
							trigger.triggered = false;
							return trigger;
						});
						scope.obstacles.push(new scope.createComponent(10, x - height - gap, 'green', x, height + gap));
					}
					
					var toErase = [];
					for (i = 0; i < scope.obstacles.length; i += 1) {
						scope.obstacles[i].x += -1;
						scope.obstacles[i].update();
//						if(scope.obstacles[i].x == 0)
//							console.log(scope.obstacles[i]);
						if(scope.obstacles[i].x < -scope.canvas.width)
							toErase.push(i);
					}
					
					for(var i = 0; i < toErase.length; i++){
						//console.log(scope.obstacles[toErase[i]]);
						scope.obstacles.splice(toErase[i], 1);
					}

					scope.playerComponent.newPos();
					scope.playerComponent.update();

					scope.playerComponent.gravity = 0.05;
				}
				scope.clear = function() {
					scope.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				}
				scope.createComponent = function(width, height, color, x, y, type) {
					var component = {};
					component.type = type;
					component.score = 0;
					component.width = width;
					component.height = height;
					component.speedX = 0;
					component.speedY = 0;
					component.x = x;
					component.y = y;
					component.gravity = 0.05;
					component.gravitySpeed = 0;
					component.ctx = scope.context;
					component.update = function() {
						if (this.type == "text") {
							this.ctx.font = this.width + " " + this.height;
							this.ctx.fillStyle = color;
							this.ctx.fillText(this.text, this.x, this.y);
						} else {
							this.ctx.fillStyle = color;
							this.ctx.fillRect(this.x, this.y, this.width, this.height);
						}
					}
					component.newPos = function() {
						this.gravitySpeed += this.gravity;
						this.x += this.speedX;
						this.y += this.speedY + this.gravitySpeed;
						this.hitTop();
						this.hitBottom();
					}
					component.hitBottom = function() {
						var rockbottom = scope.canvas.height - this.height;
						if (this.y > rockbottom) {
							this.y = rockbottom;
							this.gravitySpeed = 0;
						}
					}
					component.hitTop = function() {
						var top = 0;
						if (this.y <= top) {
							this.y = top;
							this.gravitySpeed = 0;
						}
					}
					component.crashWith = function(otherobj) {
						var myleft = this.x;
						var myright = this.x + (this.width);
						var mytop = this.y;
						var mybottom = this.y + (this.height);
						var otherleft = otherobj.x;
						var otherright = otherobj.x + (otherobj.width);
						var othertop = otherobj.y;
						var otherbottom = otherobj.y + (otherobj.height);
						var crash = true;
						if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
							crash = false;
						}
						return crash;
					}
					return component;
				}
				scope.everyInterval = function(n) {
					if ((scope.frameCount / n) % 1 == 0) {
						return true;
					}
					return false;
				}
				scope.gameOver = function() {
					$interval.cancel(scope.gameInterval);
				}
				scope.start();
			}
		};
	});
})();