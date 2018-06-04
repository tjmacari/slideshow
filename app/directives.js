'use strict';

define([
        // Dependencies needed
        'angular'
    ], function(
        // Dependency objects available for use
        angular
    ) {

    // Directives module
    return angular.module('app.directives', [])

        .directive('navList', ['$location', 'DataFactory', function($location, DataFactory) {
            return {
                replace: true,
                restrict: 'E',
                templateUrl: 'app/components/nav/navView.html',
                scope: {
                    path: "@"
                },
                controller: ['$scope', function($scope) {

                    // Show blue underline with active link
                    $scope.$on('$locationChangeSuccess', function(event, newLoc, oldLoc) {
                        $scope.newPath = "/" + newLoc.split('/')[5]; // return /tech, /world, etc.
                    });
                    $scope.newPath = $location.path(); // Set init underline

                    DataFactory.loadItem($scope.path).then(
                        function(data) {
                            $scope.links = data.links;
                        }, function(err) {
                            console.log(err);
                        }
                    );

                }]
            }
        }])

    ;
});
