'use strict';

define([
    // Dependencies needed
    'angular',
    'jquery'
], function(
    // Dependency objects available for use
    angular, jquery
) {

    // Controllers defined in route provider
    return angular.module('app.directives')

        .directive('thumbnail', [function() {
            return {
                restrict: 'E',
                replace: true,

                // Manipulate element, it's score, or attributes
                link: function(scope, elem, attrs) {
                    $(elem).hide();
                    elem.css({"background-image": "url('" + scope.slide.path + "')"});
                    $(elem).fadeIn(500);
                },

                controller: function($scope, $rootScope) {

                    // Thumbnail clicked, broadcast event so hero and caption update
                    $scope.thumbClick = function() {
                        $rootScope.$broadcast('newHero', $scope.slide, $scope.$index);
                    };
                }
            };
        }]
    );
});
