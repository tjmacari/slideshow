'use strict';

define([
        // Dependency libs
        'angular',
        'angularRoute',
        'controllers',
        'directives',
        'factories',
        'filters',
        'tech',
        'comingsoon',
        'slideshow',
        'thumbnail',
        'slideshowFactory'
    ], function(
        // Dependency objects from libs
        angular, angularRoute, controllers, directives, factories, filters, tech, comingsoon, slideshow, thumbnail, slideshowFactory
    ) {

    // Define our module and list any dependent modules via array        
    return angular.module('app', [
            'ngRoute',
            'app.controllers',
            'app.directives',
            'app.factories',
            'app.filters',
            'slideshowFactories'
        ])

        .config(['$routeProvider', function($routeProvider) {

            /* Assign templates and controllers based on current route
               in this case we only have 2 states, but setup for more
               in future
            */
            $routeProvider
                .when('/foo', {
                    templateUrl: 'app/components/tech/techView.html',
                    controller: 'techCtrl'
                })
                .when('/bar', {
                    templateUrl: 'app/components/comingsoon/comingsoonView.html',
                    controller: 'comingsoonCtrl'
                })
                .otherwise({
                    redirectTo: '/foo'
                })
            ;
        }])
    ;
});
