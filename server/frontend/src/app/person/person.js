angular.module('yokesoft.person', [])

    .config(function ($routeProvider) {
        $routeProvider.
            when('/personlist', {
                templateUrl: 'person/personlist.tpl.html',
                controller: 'PersonListCtrl'
            });
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
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
        });
        $scope.persons.push({
            email: 'rado@swissonline.ch',
            firstname: 'Rado',
            lastname: 'Smar',
            savedAt: new Date(1438351824628)
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