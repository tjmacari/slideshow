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

        .controller('techCtrl', ['$scope', 'DataFactory', function($scope, DataFactory) {
            DataFactory.loadItem('assets/json/tech.json').then(
                function(data) {
                    $scope.title = data.title;
                    $scope.author = data.author;
                    $scope.articleDate = data.articleDate;
                    $scope.paragraphs = data.paragraphs;
                    $scope.sideParagraphs = data.sideParagraphs;
                }, function(err) {
                    console.log(err);
                }
            );
        }])

    ;
});
