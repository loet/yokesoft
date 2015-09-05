angular.module('yokesoft.configuration', [])

    .config(function ($routeProvider) {
        $routeProvider.
            when('/configuration', {
                templateUrl: 'configuration.tpl.html',
                controller: 'ConfigurationCtrl',
                controllerAs: 'configurationCtrl'
            });
    })

    .controller('ConfigurationCtrl', function (Configuration) {
        var ctrl = this;

        ctrl.configuration = {backendAddress: Configuration.getBackendAddress()};

        ctrl.saveBackendAddress = function () {
            Configuration.setBackendAddress(ctrl.configuration.backendAddress);
        };
    })

    .factory('Configuration', function () {

        var backendAddress = 'http://104.236.216.125:8000';

        function setBackendAddress(address) {
            backendAddress = address;
        }

        function getBackendAddress() {
            return backendAddress;
        }

        return {
            setBackendAddress: setBackendAddress,
            getBackendAddress: getBackendAddress
        };

    });
