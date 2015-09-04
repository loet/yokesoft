angular.module('yokesoft.socket', [])

    .factory('SocketIOListener', function ($window, $log, $rootScope, Configuration) {
        var socket;

        function connect() {
            socket = $window.io(Configuration.getBackendAddress());
            socket.on('connect', function () {
                $log.log('connected to socket.io');
            });
            socket.on('connections', function (msg) {
                $log.log(msg.msg);
            });
            socket.on('person', function (msg) {
                $log.log('person: ' + msg.action + ', data: ' + JSON.stringify(msg.data));
                $rootScope.$broadcast('person', msg);
            });
        }

        return {
            connect: connect
        };

    });