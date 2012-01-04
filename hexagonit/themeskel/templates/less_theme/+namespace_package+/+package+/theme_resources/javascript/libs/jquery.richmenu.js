/*
 *  Project: Rich Menu for Plone
 *  Description: A rich drop-down-style submenu implementation that is designed
 *               to be used with hexagonit.themeskel.
 *  Author: Vilmos Somogyi, HexagonIT Oy
 *  License: 
 */


;(function ( $, window, document, undefined ) {
    
    // Create the defaults once
    var pluginName = 'richmenu',
        defaults = {
            //propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {

        // Menu actions
        $(this.element).find('a').bind('click', function(e) {
            
            // The li element is the one that we want to edit so we get the 
            // parent of the clicked element and calling it 'this'
            var $this = $(this).parent(),
                id, $popup;
            
            // each menu item has a popup with id="popup-"+id of the menu item
            id = '#popup-' + $this.attr('id');
            $popup = $(id);
            
            if ($popup.length > 0) {
                e.preventDefault();
                
                $('.selected').addClass('current');
                
                // if popup is already opened, close it
                if ($popup.is(':visible')) {
                    hidePopup();
                    return false;
                }

                // if the mobile menu is present, copy the appropriate element 
                // within the globalnav's li.
                if ($('#mobile-menu').is(':visible')) {

                    // if the clicked item already has submenu, remove it
                    if($this.find('#navigation-column').length) {
                        hidePopup();
                        return false;
                    }

                    // remove all submenues that are left behind
                    $('#portal-globalnav li #navigation-column').remove();

                    $('.selected').removeClass('selected');
                    $this.addClass('selected');
                    $popup.find('#navigation-column')
                          .clone()
                          .removeClass()
                          .appendTo($this);

                } else {
                    // hide every popup and show only the clicked one
                    $('.popup-menu').addClass('hidden');

                    // show the clicked popup.
                    $popup.toggleClass('hidden');
                    $('.selected').removeClass('selected');
                    $this.addClass('selected');
                }
            }
            
        });
        
        // on mouse click outside of the overlay or on the close button, close it
        $('html, #popup-close-row').click(function() {
            hidePopup();
        });
        $('.popup-menu, #portal-globalnav li').click( function(e) {
             e.stopPropagation();
        });

    };
    
    hidePopup = function() {
        //Hide the menus if visible
        $('.selected').removeClass('selected');
        $('.current').addClass('selected');
        $('.popup-menu').addClass('hidden');
        // mobile: remove all submenues that are left behind
        $('#portal-globalnav li #navigation-column').remove();
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})(jQuery, window, document);
