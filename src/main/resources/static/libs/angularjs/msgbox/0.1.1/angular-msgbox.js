angular.module("msgbox", [ "ui.bootstrap" ]).service("$msgbox", [ '$rootScope', '$uibModal', '$q', function($rootScope, $modal, $q) {
	var success_tpl = '';
	success_tpl += '<div class="modal-header" data-ng-show="{{title.length}}">';
	success_tpl += '<div class="row">';
	success_tpl += '<div class="col-md-11">';
	success_tpl += '<h4 class="modal-title">{{title}}</h4>';
	success_tpl += '</div>';
	success_tpl += '<div class="col-md-1">';
	success_tpl += '<a class="pull-right" data-ng-click="ok($event)" href=""><span class="glyphicon glyphicon-remove"></span></a>';
	success_tpl += '</div>';
	success_tpl += '</div>';
	success_tpl += '</div>';
	success_tpl += '<div class="modal-body" style="font-size: 18px" compile="message">';
	success_tpl += '</div>';
	success_tpl += '<div class="modal-footer">';
	success_tpl += '<button class="btn btn-primary" ng-if="show_ok" data-ng-click="ok($event)">Ok</button>';
	success_tpl += '<button class="btn btn-default" ng-if="show_cancel" data-ng-click="cancel($event)">Cancel</button>';
	success_tpl += '</div>';

	var scope = $rootScope.$new();

	return {
		show : function(msg, opts) {
			opts = opts || {};
			var defer = opts.defer || $q.defer();

			$modal.open({
				template : success_tpl,
				scope : scope,
				controller : function($scope, $uibModalInstance) {
					$scope.title = opts.title;
					$scope.message = msg;
					$scope.show_ok = true;
					$scope.show_cancel = typeof opts.cancel !== 'undefined';

					$scope.ok = function($event) {
						$event.preventDefault();
						$uibModalInstance.close();
						defer.resolve();
					};
					$scope.cancel = function($event) {
						$event.preventDefault();
						$uibModalInstance.close();
						defer.reject();
					};
				},
				size : opts.size ? opts.size : "sm",
				backdrop : "static",
				keyboard : false
			});
			return defer.promise;
		}
	}
} ]);