angular.module('yokesoft.person', [])

    .config(function ($routeProvider) {
        $routeProvider.
            when('/personlist', {
                templateUrl: 'person/personlist.tpl.html',
                controller: 'PersonListCtrl'
            });

        $routeProvider.
            when('/person/:id', {
                templateUrl: 'person/person.tpl.html',
                controller: 'PersonCtrl',
                resolve: {
                    person: function (PersonIntegrationService, $route, $log, $mdToast, $location) {
                        return PersonIntegrationService.getPerson($route.current.params.id).then(
                            function (person) {
                                return person;
                            }, function (error) {
                                $log.error(error);
                                var toast = $mdToast.simple().position('top right').content('Error! ' + error.data.message);
                                $mdToast.show(toast);
                                $location.url('/personlist');
                            }
                        );
                    }
                }
            });
        $routeProvider.
            when('/person', {
                templateUrl: 'person/person.tpl.html',
                controller: 'PersonCtrl',
                resolve: {
                    person: function () {
                        return {};
                    }
                }
            });
    })
    .controller('PersonListCtrl', function ($scope, PersonIntegrationService, $location) {

        $scope.persons = [];

        PersonIntegrationService.getAllPersons()
            .then(function (persons) {
                $scope.persons = persons;
            }, function (error) {
                console.log(error);
            });


        $scope.navigateTo = function (person) {
            $location.url('/person/' + person._id);
        };
    })

    .controller('PersonCtrl', function ($scope, $log, $mdToast, $mdDialog, $location, person, PersonIntegrationService) {
        $scope.person = person;

        $scope.savePerson = function () {
            var personForm = $scope.personForm;
            if (personForm.$valid) {
                if ($scope.person._id) {
                    PersonIntegrationService.updatePerson($scope.person).then(function () {
                        $location.url('/personlist');
                    }, function (error) {
                        $log.error(error);
                        var toast = $mdToast.simple().position('top right').content('Error! ' + error.data.message);
                        $mdToast.show(toast);
                    });
                } else {
                    PersonIntegrationService.createPerson($scope.person).then(function () {
                        $location.url('/personlist');
                    }, function (error) {
                        $log.error(error);
                        var toast = $mdToast.simple().position('top right').content('Error! ' + error.data.message);
                        $mdToast.show(toast);
                    });
                }
            } else {
                $log.log('not valid');
                var toast = $mdToast.simple().position('top right').content('Bitte korrigieren Sie die markierten Felder!');
                $mdToast.show(toast);
            }
        };

        $scope.removePerson = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Person löschen')
                .content('Wollen Sie die Person wirklich löschen?')
                .ariaLabel('Lucky day')
                .ok('Löschen')
                .cancel('Nicht löschen')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function () {
                if ($scope.person._id) {
                    PersonIntegrationService.removePerson($scope.person._id).then(
                        function (result) {
                            $location.url('personlist');
                        }, function (err) {
                            $log.error(err);
                        }
                    );
                } else {
                    $log.error('can not remove unsaved person (no id found)');
                }
            }, function () {
                $log.log('no removal');
            });

        };
    })

    .factory('PersonIntegrationService', function ($q, $http) {

        function getAllPersons() {
            var dfd = $q.defer();
            $http.get('/api/persons')
                .then(function (response) {
                    dfd.resolve(response.data);
                }, function (response) {
                    dfd.reject(response);
                });
            return dfd.promise;
        }

        function getPerson(id) {
            var dfd = $q.defer();
            $http.get('/api/persons/' + id)
                .then(function (response) {
                    dfd.resolve(response.data);
                }, function (response) {
                    dfd.reject(response);
                });
            return dfd.promise;
        }

        function updatePerson(person) {
            var dfd = $q.defer();
            $http.put('/api/persons/' + person._id, person)
                .then(function (response) {
                    dfd.resolve(response.data);
                }, function (response) {
                    dfd.reject(response);
                });
            return dfd.promise;
        }

        function createPerson(person) {
            var dfd = $q.defer();
            $http.post('/api/persons', person)
                .then(function (response) {
                    dfd.resolve(response.data);
                }, function (response) {
                    dfd.reject(response);
                });
            return dfd.promise;
        }

        function removePerson(id) {
            var dfd = $q.defer();
            $http['delete']('/api/persons/' + id)
                .then(function (response) {
                    dfd.resolve(response.data);
                }, function (response) {
                    dfd.reject(response);
                });
            return dfd.promise;
        }

        return {
            getAllPersons: getAllPersons,
            getPerson: getPerson,
            updatePerson: updatePerson,
            createPerson: createPerson,
            removePerson: removePerson
        };
    })
;