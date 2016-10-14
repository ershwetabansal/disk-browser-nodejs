	(function() {
        var editor = CKEDITOR.replace( 'demo-editor' );

        editor.addCommand("diskBrowserCommand", {
            exec: function(edt) {
                browser.openBrowser({
                    disks : [
                        'Images', 'Documents'
                    ],
                    button : {
                        text : 'Update URL',
                        onClick : function(url) {
                             edt.insertHtml('<img src="'+url+'" alt=""/>');
                        }
                    }
                });
                
            }
        });

        editor.ui.addButton('SuperButton', {
            label: "Disk browser",
            command: 'diskBrowserCommand',
            toolbar: 'insert',
            icon: 'https://photos-3.dropbox.com/t/2/AAD2T_E1QzgZ_EdVNo6K6muojdnMOlJPOFriuapezNLiUQ/12/425864487/png/32x32/3/1476414000/0/2/disk_icon.png/EL796LUDGMEnIAIoAg/P2LCpUyqU_ZIoXTzk7yBsJJIDeEXp7HmOHjFnKyl9eA?size_mode=3&dl=0&size=1280x960'
        });

        CKEDITOR.on('dialogDefinition', function (event)
        {
            var dialogDefinition = event.data.definition;
            var tabCount = dialogDefinition.contents.length;
            for (var i = 0; i < tabCount; i++) {
                var browseButton = dialogDefinition.contents[i].get('browse');
                var diskBrowserInstance = new openDiskBrowser(dialogDefinition.contents[i]);
                if (browseButton !== null) {
                    browseButton.hidden = false;
                    browseButton.onClick = diskBrowserInstance;
                }
            }
        });
	})();

    function openDiskBrowser(editorContent)
    {
        return function() {
            browser.openBrowser({
                disks : [
                    'Images', 'Documents'
                ],
                button : {
                    text : 'Choose',
                    onClick : function(url) {
                        var inputField = CKEDITOR.dialog.getCurrent().getContentElement( editorContent.id, 'txtUrl' ).getInputElement().$;
                        $(inputField).val(url).trigger('change');

                        if (editorContent.id == 'info') {
                            var preview = CKEDITOR.dialog.getCurrent().getContentElement( 'info', 'htmlPreview' ).getInputElement().$;
                            $(preview).find('img').attr('src', url);
                            $(preview).find('img').removeAttr('style');
                        }
                        
                    }
                }
            });            
        };
    }