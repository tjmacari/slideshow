'use strict';

define([
    // Dependencies needed
    'angular',
    'jquery'
], function(
    // Dependency objects available for use
    angular, jquery
) {

    // Define our module and list any dependent modules via array
    return angular.module('slideshowFactories', [])

        // Using a factory instead of a service since I need multiple methods
        .factory('SlideshowFactory', ['$q', function($q) {

            return {

                // Load image via promise / $q
                loadImage: function(url) {

                    var deferred = $q.defer(),
                        image = new Image();

                    image.src = url;

                    if(image.complete) {
                        deferred.resolve();
                    } else {
                        image.addEventListener('load', function() {
                            deferred.resolve();
                        });
                        image.addEventListener('error', function() {
                            deferred.reject();
                        });
                    }
                    return deferred.promise;
                },

                // Calculate the maximum hidden width of slides (ie. 700px slides - 400px mask = 300px)
                calcMaxHidden: function() {

                    // Calc thumbsContainer actual width (must traverse through children to find TRUE width
                    // since it's being masked by parent)
                    var thumbsContainerWidth = 0;
                    var slidesList = $('#thumbs-container').find('thumbnail');
                    for(var i = 0; i < slidesList.length; i++) {
                        var slide = $(slidesList[i]);
                        thumbsContainerWidth += slide.outerWidth(true);
                    }

                    // Current widths of thumbs container parent
                    var thumbsContainerParentWidth =  parseInt($('#thumbs-container-parent').css('width'));

                    // Calc current max negative distance from 0
                    // ie. 700px slide container - 400px parent masking it = 300px max hidden
                    return thumbsContainerWidth - thumbsContainerParentWidth;
                },

                // Once animation complete, update left/right arrows states
                setArrowsState: function(maxHidden) {

                    /*
                     Find state of 'next' button
                     */

                    // Set default values, evaluate and change if necessary
                    var nextEnabled = false;

                    // Current left position (ie. -150px if 150px from origin) of thumbs container
                    var thumbsContainerLeftPos = parseInt($('#thumbs-container').css('margin-left'));

                    // Find tot width of thumbs container hidden by parent mask
                    var maxHidden = this.calcMaxHidden();

                    // If the thumbs container is not as far over as possible, then keep it enabled
                    if(thumbsContainerLeftPos > (-(maxHidden))) {

                        // Ie. if it's at -80px (80px from original 0), and parent width is 100, still have 20px to go
                        nextEnabled = true;
                    }

                    /*
                     Find state of 'prev' button
                     */

                    // If thumbs container is at 0, disable the 'prev' button, otherwise, set to true
                    var prevEnabled = thumbsContainerLeftPos === 0 ? false : true;

                    // Return both states
                    var state = [prevEnabled, nextEnabled];
                    //console.log(state);
                    return state;
                },

                // Calculate new thumbnails position
                calcThumbsContainerLeftPos: function(direction) {

                    // How far we scroll with each click
                    var animStep = 200;

                    // Current left position (ie. -150px if 150px from origin) of thumbs container
                    var thumbsContainerLeftPos = parseInt($('#thumbs-container').css('margin-left'));

                    var newLeft;
                    if(direction === "next") {

                        // SCROLL RIGHT (NEXT)

                        // Slide thumbs over X pixels
                        newLeft = thumbsContainerLeftPos - animStep;

                        // Find tot width of thumbs container hidden by parent mask
                        var maxHidden = this.calcMaxHidden();

                        // If thumbs overshoots maxHidden, then stick at maxHidden
                        if(newLeft < (-(maxHidden))) {
                            newLeft = -(maxHidden);
                        }

                    } else {

                        // SCROLL LEFT (PREV)

                        // Slide thumbs over X pixels
                        newLeft = thumbsContainerLeftPos + animStep;
                        if(newLeft > 0) newLeft = 0; // If overshoots, lock back to origin
                    }
                    return newLeft;
                }
            };
        }])
    ;
});
