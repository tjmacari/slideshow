'use strict';

require.config({

    // Define module paths
    paths: {
        less:             '../assets/libs/less.min',
        angular:          '../assets/libs/angular.min',
        jquery:           '../assets/libs/jquery-1.10.2.min',
        angularRoute:     '../assets/libs/angular-route.min',
        tech:             'components/tech/tech',
        comingsoon:       'components/comingsoon/comingsoon',
        slideshow:        'shared/slideshow/slideshow',
        thumbnail:        'shared/slideshow/thumbnail',
        slideshowFactory: 'shared/slideshow/slideshowFactory'
    },

    // Add any dependencies
    shim: {
        'angular':      {'exports': 'angular'},
        'angularRoute': ['angular']
    },

    // Set angular as priority to load
    priority: ['angular']

});

window.name = "NG_DEFER_BOOTSTRAP!";
require(['less', 'angular', 'app'], function(less, angular, app) {

    // Proceed with boostrapping 'app' after angular is ready
    angular.element().ready(function() {
        // Bootstrap the app manually
        angular.resumeBootstrap([app['name']]);
    });
});
