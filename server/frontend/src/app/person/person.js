angular.module('yokesoft.person', [])

    .config(function ($routeProvider) {
        $routeProvider.
            when('/personlist', {
                templateUrl: 'person/personlist.tpl.html',
                controller: 'PersonListCtrl',
                resolve: {
                    refresh: function () {
                        return false;
                    }
                }
            });

        $routeProvider.
            when('/personlistrefresh', {
                templateUrl: 'person/personlist.tpl.html',
                controller: 'PersonListCtrl',
                resolve: {
                    refresh: function () {
                        return true;
                    }
                }
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
                        return {student: true};
                    }
                }
            });
    })
    .controller('PersonListCtrl', function ($scope, PersonIntegrationService, PersonCache, $location, $route, refresh) {

        $scope.persons = PersonCache.getPersons();

        $scope.$on('person', function (event, msg) {
            if ('created' === msg.action) {
                msg.data.realtime = true;
                PersonCache.addPerson(msg.data);
                $location.url('/personlistrefresh?' + new Date().getTime());
                $route.reload();
            }
        });

        if (!refresh) {
            PersonIntegrationService.getAllPersons()
                .then(function (persons) {
                    PersonCache.setPersons(persons);
                    $scope.persons = PersonCache.getPersons();
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.navigateTo = function (person) {
            $location.url('/person/' + person._id);
        };
    })

    .controller('PersonCtrl', function ($scope, $log, $mdToast, $mdDialog, $location, person, PersonIntegrationService) {
        var i;
        $scope.person = person;

        $scope.teacherqualifications = ['Denken', 'Handeln', 'Kochen', 'Tanzen', 'Korrigieren', 'Surfen'];
        $scope.selectedteacherqualification = {};

        for (i = 0; $scope.person.teacherqualifications && i < $scope.person.teacherqualifications.length; i++) {
            $scope.selectedteacherqualification[$scope.person.teacherqualifications[i]] = true;
        }

        $scope.processTeacherSelection = function () {
            if ($scope.person.teacher === false) {
                $scope.selectedteacherqualification = undefined;
                $scope.person.teacherqualifications = undefined;
            }
        };

        $scope.savePerson = function () {
            var personForm = $scope.personForm, prop;
            if (personForm.$valid) {
                //convert teacherqualifaction into array
                $scope.person.teacherqualifications = [];
                for (prop in $scope.selectedteacherqualification) {
                    if ($scope.selectedteacherqualification[prop] === true) {
                        $scope.person.teacherqualifications.push(prop);
                    }
                }
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

    .factory('PersonCache', function () {
        var personCache = [];

        function addPerson(person) {
            personCache.unshift(person);
        }

        function setPersons(persons) {
            personCache.length = 0;
            var i;
            for (i = 0; i < persons.length; i++) {
                personCache.push(persons[i]);
            }
        }

        function getPersons() {
            return personCache;
        }

        return {
            addPerson: addPerson,
            setPersons: setPersons,
            getPersons: getPersons
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