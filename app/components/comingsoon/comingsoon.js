'use strict';

define([
    // Dependencies needed
    'angular'
], function(
    // Dependency objects available for use
    angular
) {

    // Controllers defined in route provider
    return angular.module('app.controllers')

        .controller('comingsoonCtrl', ['$scope', 'DataFactory', function($scope, DataFactory) {
            DataFactory.loadItem('assets/json/comingsoon.json').then(
                function(data) {
                    $scope.title = data.title;
                    $scope.paragraphs = data.paragraphs;
                }, function(err) {
                    console.log(err);
                }
            );
        }])

    ;
});
