(function () {
    var app = angular.module("comboModule", []);

    app.service("comboService", function (myConfig, $q, $http, $log, utilsService) {
        var service = {
            save: save,
            findAll: findAll,
            enums: {}
        };

        enums();

        return service;

        function save(combo) {
            var deferred = $q.defer();
            var url = myConfig.hostEndpoints[myConfig.ambiente] + '/combo/save';

            $http.post(url, combo).then(function successCallback(response) {
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
            var url = myConfig.hostEndpoints[myConfig.ambiente] + '/combo/findAll';

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

    app.directive('comboMenu', function () {
        return {
            restrict: 'A',
            templateUrl: 'pages/combo/menu.html',
        }
    });

    app.directive('altaComboForm', function ($filter, $msgbox, $uibModal, uiGridConstants, utilsService, comboService) {
        return {
            restrict: 'A',
            templateUrl: 'pages/combo/alta.html',
            link: function (scope, element, attrs) {
                var vm = scope;

                vm.combo = undefined;
                vm.enums = comboService.enums;

                vm.gridApi = {};
                vm.gridOptions = {
                    enableFiltering: true,
                    enableGridMenu: true,
                    enableSorting: true,
                    onRegisterApi: function (gridApi) {
                        vm.gridApi = {};
                    },
                    columnDefs: [{
                        displayName: 'SKU',
                        field: 'producto.sku',
                        type: 'text',
                        width: '10%',
                    }, {
                        displayName: 'Producto',
                        field: 'producto.nombre',
                        type: 'text',
                        width: '70%',
                    }, {
                        displayName: 'Cantidad',
                        field: 'cantidad',
                        type: 'number',
                        width: '15%',
                    }, {
                        displayName: '',
                        name: 'quitarItemButton',
                        cellTemplate: 'quitarItemButton.tpl.html',
                        width: '5%',
                    }]
                };

                vm.save = function () {
                    if(!vm.combo) vm.combo = {};

                    vm.combo.itemBase = vm.gridOptions.data.shift();
                    vm.combo.items = vm.gridOptions.data;

                    vm.gridOptions.data = [];

                    comboService.save(vm.combo).then(function (data) {
                        alert("Se ha grabado correctamente el combo");
                        vm.combo = undefined;
                    }, function (error) {
                        FuncionesError.generarAngularMsgboxSimple($msgbox, error);
                    });
                }

                vm.agregarItemAGrilla = function () {
                    // console.log("agregarItemAGrilla");
                    var comboItem = {
                        producto: vm.productoSeleccionado,
                        cantidad: vm.cantidad
                    }

                    if (comboItem.producto === undefined || comboItem.producto === null) {
                        FuncionesError.generarAngularMsgboxSimple($msgbox, "No se a seleccionado un producto");
                        return;
                    }


                    if (comboItem.cantidad === undefined || comboItem.cantidad == 0) {
                        FuncionesError.generarAngularMsgboxSimple($msgbox, "Cantidad incorrecta");
                        return;
                    }

                    if (vm.gridOptions.data.indexOf(comboItem) != -1) {
                        FuncionesError.generarAngularMsgboxSimple($msgbox, "Item ya existente");
                        return;
                    }

                    vm.gridOptions.data.push(comboItem);
                }

                vm.quitarItem = function (row) {
                    var index = vm.gridOptions.data.indexOf(row.entity);
                    vm.gridOptions.data.splice(index, 1);
                }
            },
            controller: function ($scope) {
                $scope.npAutocompleteOptions = {
                    url: './producto/search',
                    delay: 1000,
                    minlength: 1,
                    // dataHolder : 'items',
                    // limitParam : 'per_page',
                    searchParam: 'name',
                    // loadStateClass : 'has-feedback',
                    itemTemplateUrl: 'itemTemplate.tpl.html',
                    highlightExactSearch: 'false',
                    nameAttr: 'nombre'
                };
            }
        }
    });

    app.directive('consultaComboForm', function ($filter, $msgbox, $uibModal, uiGridConstants, utilsService, comboService) {
        return {
            restrict: 'A',
            templateUrl: 'pages/combo/consulta.html',
            link: function (scope, element, attrs) {
                var vm = scope;

                vm.enums = comboService.enums;

                vm.gridApi = {};
                vm.gridOptions = {
                    enableFiltering: true,
                    enableGridMenu: true,
                    enableSorting: true,
                    onRegisterApi: function (gridApi) {
                        vm.gridApi = {};
                    },
                    columnDefs: [{
                        displayName: 'SKU',
                        field: 'sku',
                        type: 'text',
                        width: '10%',
                    }, {
                        displayName: 'Nombre',
                        field: 'nombre',
                        type: 'text',
                        width: '90%',
                    },]
                };

                vm.findAll = function () {
                    comboService.findAll().then(function (data) {
                        // vm.combos = data;
                        vm.gridOptions.data = data;
                    }, function (error) {
                        FuncionesError.generarAngularMsgboxSimple($msgbox, error);
                    });
                };

                vm.findAll();
            }
        }
    });

    app.config(function ($routeProvider) {
        $routeProvider.when("/combo/alta", {
            template: "<div alta-combo-form></div>"
        }).when("/combo/consulta", {
            template: "<div consulta-combo-form></div>"
        });
    });
})();