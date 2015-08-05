angular.module('yokesoft.person', [])

    .config(function ($routeProvider) {
        $routeProvider.
            when('/personlist', {
                templateUrl: 'person/personlist.tpl.html',
                controller: 'PersonListCtrl'
            });
    })
    .controller('PersonListCtrl', function ($scope, $mdDialog, PersonIntegrationService) {

        $scope.persons = [];

        PersonIntegrationService.getAllPersons()
            .then(function (persons) {
                $scope.persons = persons;
            }, function (error) {
                console.log(error);
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

    .factory('PersonIntegrationService', function ($q, $http) {

        function getAllPersons() {
            var dfd = $q.defer();
            $http.get('/api/persons').
                then(function (response) {
                    dfd.resolve(response.data);
                }, function (response) {
                    dfd.reject(response);
                });
            return dfd.promise;
        }


        return {
            getAllPersons: getAllPersons
        };
    })
;