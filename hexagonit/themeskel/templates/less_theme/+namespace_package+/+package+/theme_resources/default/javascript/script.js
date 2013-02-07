(function ($) {
    $(function () {
        $('#mobile-globalnav').bind('click', function() {
            var $menu = $('#portal-globalnav');
            $menu.toggleClass('visible');
            $('#portal-searchbox').removeClass('visible');
            // show quicklinks only when the menu is closed
            $('#quicklinks').toggle(!$menu.hasClass('visible'));
        });

        $('#mobile-search').bind('click', function() {
            var $search = $('#portal-searchbox');
            $search.toggleClass('visible');
            $('#portal-globalnav').removeClass('visible');
            // show quicklinks only when the search is closed
            $('#quicklinks').toggle(!$search.hasClass('visible'));
        });
    
        $('#mobile-page-settings').bind('click', function() {
            $('#edit-bar').toggleClass('visible');
            $(this).toggleClass('selected');
        });
    });
    
}(jQuery));