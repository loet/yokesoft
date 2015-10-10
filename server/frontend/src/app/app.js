angular.module('yokesoft', [
    'yokesoft.socket',
    'ngRoute',
    'ngMaterial',
    'ngCordova',
    'templates-app', 'yokesoft.configuration',
    'yokesoft.person'
])

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('blue-grey');
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.tpl.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })


    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log, SocketIOListener) {
        SocketIOListener.connect();
        $scope.toggleLeft = buildToggler('left');
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 300);
            return debounceFn;
        }
    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.closeNavigation = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    })
;

