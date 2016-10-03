tinymce.init({
        selector: 'textarea',
        paste_as_text: true,
        plugins: [
            "advlist autolink link image imagetools lists anchor code fullscreen table template paste"
        ],

        toolbar1: "bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | undo redo",
        toolbar2: "table link unlink | image | formatselect | code",
        toolbar_items_size: 'small',
        menubar: false,
        paste_data_images: false,
        file_browser_callback : tinmyceDiskBrowser,
        setup : function(editor) {
            var css = '';
            editor.on('click', function(e) {

            });
            editor.on('focusout', function(e) {
                $(e.target).removeAttr('style');
                if (editor.isDirty()) {
                    saveEditorChangesLocally($(e.target), 'rich', editor.getContent({source_view: true}));
                }
            });
        }
    });