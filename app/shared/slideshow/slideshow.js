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

        .directive('slideshow', ['DataFactory', 'SlideshowFactory', '$timeout', function(DataFactory, SlideshowFactory, $timeout) {
            return {
                restrict: 'E',
                templateUrl: 'app/shared/slideshow/slideshowView.html',
                scope: {
                    url: '@'
                },
                controller: function($scope) {


                    //////////////////////////////////////////////////
                    // Preload images
                    //////////////////////////////////////////////////

                    // To ensure the images are loaded in desired order, create a
                    // controlled queue instead of a simple ng-repeat with original
                    // slides array from json
                    $scope.queue = [];

                    function preloadImage(slides, index) {

                        SlideshowFactory.loadImage(slides[index].path).then(

                            // On success
                            function() {

                                // Populate queue with current slide info once image is preloaded
                                $scope.queue[index] = slides[index];

                                if(index === 0) {

                                    // If first image preloaded, display as hero image
                                    updateHero(null, slides[index], 0);

                                } else if(index === 1) {

                                    // Activate auto progression since we have 2+ images
                                    autoProgress = true;
                                }

                                // Recursively call this function if conditions are right
                                index++;
                                if(index < slides.length) {

                                    // Use a very slight delay to create nice loading effect
                                    $timeout(function() {
                                        preloadImage(slides, index);
                                    }, 100);
                                }

                            }, function(err) {
                                console.log('error');
                            }
                        );
                    }

                    // Load JSON for images and captions
                    DataFactory.loadItem($scope.url).then(
                        function(data) {

                            // Start preloading images and populating our queue array
                            preloadImage(data.slides, 0);
                        }, function(err) {
                            console.log(err);
                        }
                    );




                    //////////////////////////////////////////////////
                    // Update new hero image and caption
                    //////////////////////////////////////////////////

                    // Once we have 2+ images, initialize slide auto-progress
                    var autoProgress = false;

                    // Global timeout object, which will drive auto-progress of slides
                    var timeout = null;

                    // When a thumbnail is clicked, update hero image and caption
                    $scope.$on('newHero', updateHero);

                    // Display new hero image and caption
                    function updateHero(event, data, index) {

                        // Prevent robo-clicking, also don't reload current image and caption
                        if($scope.disableThumbs != true && data.path !== $scope.heroImg && data.caption !== $scope.heroCaption) {

                            // Update for template 'active' thumb
                            $scope.currIndex = index;

                            // Clear current interval
                            if(timeout != null) {
                                $timeout.cancel(timeout);
                            }

                            // Prevent robo-clicking while this is true
                            $scope.disableThumbs = true;

                            // Fade out our hero image, load next
                            var $hero = $('img#hero-img');
                            $hero.animate({opacity: 0.01}, 500, function() {

                                $scope.heroImg = data.path;

                                // Update our hero image caption
                                $scope.heroCaption = data.caption;

                                $timeout(function() {
                                    $hero.animate({opacity: 1}, 750, function() {

                                        // Make thumbs clickable again
                                        $scope.disableThumbs = false;

                                        // If 2+ slides, and autoProgress has been activated...
                                        if(autoProgress === true) {

                                            // Load next slide
                                            timeout = $timeout(function() {

                                                index++;
                                                if(index >= $scope.queue.length) {
                                                    index = 0;
                                                }
                                                updateHero(null, $scope.queue[index], index);

                                            }, 3000);
                                        }
                                    });
                                }, 10);

                            });
                        }
                    }

                    // When user clicks the hero image, open full size image in new tab
                    $scope.heroClick = function() {
                        window.open($scope.heroImg, "_blank");
                    };




                    //////////////////////////////////////////////////
                    // Scroll buttons and thumbnails
                    //////////////////////////////////////////////////

                    // Used in template to mark active thumb
                    $scope.currIndex = 0;

                    // Enable/disable scroll arrows, states are bound to scope booleans
                    function setArrowsState() {

                        $timeout(function() {

                            // Set boolean state vals for 'prev' / 'next' buttons
                            var newArrowState = SlideshowFactory.setArrowsState();
                            $scope.showPrevArrow = newArrowState[0];
                            $scope.showNextArrow = newArrowState[1];
                        });
                    }

                    // These two variables will be compared as window resizes
                    // to determine whether to show/hide arrow buttons
                    var thumbsContainerWidth;
                    var thumbsContainerParentWidth;

                    // Left/right scroll button click
                    $scope.scroll = function(direction) {

                        // Ignore if button is disabled
                        if(!
                            (
                                (direction === "prev" && $scope.showPrevArrow !== true) ||
                                (direction === "next" && $scope.showNextArrow !== true) ||
                                $scope.disableButtons === true
                            )
                        ) {

                            // "Only you can prevent robo-clicking"
                            $scope.disableButtons = true;

                            // Calculate new position
                            var left = SlideshowFactory.calcThumbsContainerLeftPos(direction);

                            // Animate our thumbs left/right
                            var thumbsContainer = $('#thumbs-container');
                            thumbsContainer.animate({'marginLeft': left + "px"}, 250, function() {

                                // Use factory to analyze slider state, and update arrows
                                setArrowsState();

                                // Remove boolean to disable buttons (to prevent robo-clicking)
                                $scope.disableButtons = false;
                            });
                        }
                    };

                    // Adjust the arrow buttons every time a new image is preloaded
                    $scope.$watch('queue.length', function(data) {
                        setArrowsState();
                    });

                    // Since slideshow is responsive/elastic, need to recalc everytime
                    // browser is resized
                    $(window).resize(function() {
                        setArrowsState();
                    });




                    //////////////////////////////////////////////////
                    // Cleanup
                    //////////////////////////////////////////////////

                    $scope.$on('$destroy', function(event) {
                        $timeout.cancel(timeout);
                    });

                }
            };
        }])
    ;
});
