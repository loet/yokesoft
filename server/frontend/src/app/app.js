angular.module('yokesoft', [
    'ngMaterial'
])

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('blue-grey');
    })

    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
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
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    })
    .controller('PersonListCtrl', function ($scope, $mdDialog, $http) {

        $scope.persons = [];
        $scope.persons.push({
            email: 'loet@swissonline.ch',
            firstname: 'Ueli',
            lastname: 'Loetscher',
            savedAt: new Date(1438351824624)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });


        $scope.navigateTo = function (to, event) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Navigating')
                    .content('Imagine being taken to ' + to)
                    .ariaLabel('Navigation demo')
                    .ok('Neat!')
                    .targetEvent(event)
            );
        };
    })
;

