'use strict';

define([
        // Dependencies needed
        'angular'
    ], function(
        // Dependency objects available for use
        angular
    ) {

    // Define our module and list any dependent modules via array        
    return angular.module('app.factories', [])

        // Keep all business logic in services/factories
        .factory('DataFactory', ['$q', '$http', function($q, $http) {

            return {

                loadItem: function(url) {

                    var deferred = $q.defer();
                    $http.get(url)
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function() {
                            deferred.reject();
                        })
                    ;
                    return deferred.promise;
                }
            };
        }])

    ;
});
