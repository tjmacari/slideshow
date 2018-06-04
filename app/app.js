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
                .when('/tech', {
                    templateUrl: 'app/components/tech/techView.html',
                    controller: 'techCtrl'
                })
                .when('/canada', {
                    templateUrl: 'app/components/comingsoon/comingsoonView.html',
                    controller: 'comingsoonCtrl'
                })
                .when('/world', {
                    templateUrl: 'app/components/comingsoon/comingsoonView.html',
                    controller: 'comingsoonCtrl'
                })
                .when('/us', {
                    templateUrl: 'app/components/comingsoon/comingsoonView.html',
                    controller: 'comingsoonCtrl'
                })
                .when('/politics', {
                    templateUrl: 'app/components/comingsoon/comingsoonView.html',
                    controller: 'comingsoonCtrl'
                })
                .when('/business', {
                    templateUrl: 'app/components/comingsoon/comingsoonView.html',
                    controller: 'comingsoonCtrl'
                })
                .when('/sports', {
                    templateUrl: 'app/components/comingsoon/comingsoonView.html',
                    controller: 'comingsoonCtrl'
                })
                .otherwise({
                    redirectTo: '/tech'
                })
            ;
        }])
    ;
});
