angular.module('yokesoft.configuration', [])

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
