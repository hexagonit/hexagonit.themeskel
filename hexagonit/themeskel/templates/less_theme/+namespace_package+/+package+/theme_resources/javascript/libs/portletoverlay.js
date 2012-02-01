(function ($) {

    $(function() {
        // === Portlet Overlay ===
        
        // Only on manage portlets page
        if ($('.template-manage-portlets').length > 0) {
        
            function initEditor() {
                // If CKEditor
                if($('.ckeditor_plone').length > 0 && $('#cke_form\\.text').length === 0) {
                    if(CKEDITOR.instances) {
                        var inst = CKEDITOR.instances[$('.ckeditor_plone').attr('id')];
                        CKEDITOR.remove(inst);
                    }
                    launchCKInstances();
                }
                // If TinyMCE
                if($('.mce_editable').length > 0) {
                    var initfunc = kukit && kukit.actionsGlobalRegistry.get("init-tinymce");

                    if (initfunc && $('#form\\.text .mce_editable')) {
                        initfunc({node:{id:'form.text'}});
                    }
                }
            }
        
            // Configure the overlay
            var conf = {
                subtype: 'ajax',
                filter: '#content',
                closeselector: '#form\\.actions\\.cancel',
                formselector: 'form',
                noform: 'reload'
            };
        
            // On every ajax request reinitialize the wysiwyg editor
            $('.template-manage-portlets').ajaxComplete(function() {
                initEditor();
            });
        
            // Initialize the overlay only when clicked. If already initialized, the
            // the exinsting instance will be used.
            $('.portletHeader > a').live('click', function(e) {
                e.preventDefault();
                var $this = $(this);
                if(!$this.hasClass('link-overlay')) {
                    $this.prepOverlay(conf).click();
                }
            });
        
            // Add new portlet opens in overlay
            $('.portlets-manager select')
                .live('click', function(){
                    // Remove the onchange attribute from the select element so 
                    // we can prevent the already set on-change action.
                    $(this).removeAttr('onchange');
                })
                .live('change', function(e) {
                    // On change show the overlay
                    e.preventDefault();
                    var $this = $(this),
                        url,
                        val = $this.find('option:selected').val();
                    // The url for ajax request is taken from the form action +
                    // the value of the selected element
                    url = $this.parent().attr('action') + val;
                    // Blacklist the portlets that do not have separate add fields
                    if (val === '/++contextportlets++plone.leftcolumn/+/portlets.Login' || val === '/++contextportlets++plone.leftcolumn/+/portlets.Review') {
                        window.location = url;
                    } else if(val !== '/@@manage-portlets') {
                        $('<a></a>').attr('href', url).prepOverlay(conf).click();
                    }
            });
        }
        
        // === End Portlet Overlay ===
    });
}(jQuery));