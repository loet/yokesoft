angular.module('yokesoft.configuration', [])

    .factory('Configuration', function () {

        var backendAddress = 'http://192.168.0.11:8000';

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
