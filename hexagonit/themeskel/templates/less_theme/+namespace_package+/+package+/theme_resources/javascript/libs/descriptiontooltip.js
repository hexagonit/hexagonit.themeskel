;(function ($) {

    $(function() {
        // === Description tooltip ===

        // Put the help text in a tooltip, show a help icon and when clicked
        // show the tooltip.
        $('.formHelp').each(function() {
            var $this = $(this),
                text,
                $helpIcon;
            text = $this.text();
            if (text !== '') {
                $this.text('');
                $helpIcon = $('<span class="help-icon"></span>');
                $helpIcon.attr('title', text);
                $helpIcon.tooltip({
                    position: "top right",
                    offset: [0, -15],
                    opacity: 0.95,
                    layout: '<div><span class="tip-close"></span></div>',
                    events: {
                        // default action: do nothing, action is taken elswhere
                        def: "'',''",
                        // tooltip does not need show or hide events
                        tooltip: "'',''"
                    }
                });
                // add the help icon to appropriate place
                $this.siblings('label').after($helpIcon);
            }
        });

        // On click toggle between show and hide tooltip
        $('.help-icon').click(function() {
            var tip = $(this).data("tooltip");
            if (tip.isShown(true)) {
                tip.hide();
            } else {
                tip.show();
            }
        });


        // Close all tooltips on close button or clicking outside of the tooltip
        $('html, .tip-close').live('click', function() {
            $('.help-icon').each(function() {
                $(this).data("tooltip").hide();
            });
        });

        // If clicked on the help icon or the tooltip, don't propagate to the
        // html element, as it will fire the closing action
        $('.help-icon, .tooltip').live('click', function(e) {
             e.stopPropagation();
        });

        // === End Description tooltip ===
    });
}(jQuery));