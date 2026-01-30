// CL Flipbox JS - Basic flipbox functionality
(function($) {
    'use strict';

    $(document).ready(function() {
        // Initialize flipboxes
        $('.flip-box-wrap').each(function() {
            var $this = $(this);
            var $box = $this.find('.flip-box');

            // Set height based on content
            var frontHeight = $this.find('.flip-box-front').outerHeight();
            var backHeight = $this.find('.flip-box-back').outerHeight();
            var maxHeight = Math.max(frontHeight, backHeight, 250);

            $box.css('height', maxHeight + 'px');
        });
    });
})(jQuery);
