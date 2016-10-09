var browser = FileBrowser().getInstance();
browser.setup({

    disks : {
        search : true,
        search_URL: '/disk/search',
        details : [
            {
                name: 'image_disk',
                label: 'Cats',
                root_directory_path: ['/cats/Kittens'],
                path: {
                    root: '/assets/cats/Kittens'
                },
                root_read_only: true
            },
            {
                name: 'image_disk',
                label: 'Images',
                path: {
                    root: '/assets'
                },
                allowed_extensions: ['png','jpg','jpeg','bmp','tiff','gif']
            },
            {
                name: 'image_disk',
                label: 'Read only',
                path: {
                    root: '/assets'
                },
                read_only: true,
                allowed_extensions: ['png','jpg','jpeg','bmp','tiff','gif']
            },
            {
                name: 'doc_disk',
                label: 'Documents',
                path: {
                    root: '/documents'
                },
                allowed_extensions: ['doc','docx','pdf','xls','xlsx']
            }
        ]
    },
    directories: {
        list: '/disk/directories',
        create: '/disk/directory/store',
        delete: '/disk/directory/destroy',
        update: '/disk/directory/update',
    },
    files: {
        list: '/disk/files',
        destroy : '/disk/file/destroy',
        upload: {
            url: '/disk/file/store',
            params:[]
        },
        thumbnail: {
            show : true,
            directory : '/thumbnails',
            path : '',
            prefix : '',
            suffix : ''
        },
        size_unit : 'KB'
    },
    http : {
        headers : {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        error : function(status, response) {
            console.log("error :"+status);
            var message = '';
            if (status == '422') {
                for (var key in response) {
                    if (typeof(response[key]) == 'object') {
                        message = message + response[key][0] + ' ';
                    }
                }
            }
            return (message == '') ? 'Error encountered. ' : message ;
        }
    },
    authentication : "session"
});

(function() {
        $('[data-disk-browser="true"]').on('click', function() {
            var element = $(this);
            var buttonText = $(this).attr('data-disk-browser-btn');
            var disks = $(this).attr('data-disks');
            var image = $(this).attr('data-update-image');
            var inputBox = $(this).attr('data-update');
            
            var configParameters = {};

            if (buttonText && (inputBox || image))  {
                configParameters.button  = {
                    text : buttonText,
                    onClick : function(path) {
                        $('[data-type="'+inputBox+'"]').val(path);
                        $('[data-type="'+image+'"]').attr('src', path);
                    }
                }        
            };

            if (disks) {
                configParameters.disks = getArrayFromCSV(disks);
            }

            browser.openBrowser(configParameters);
        });
})();

function tinmyceDiskBrowser(field_id, url, type, win)
{
    browser.openBrowser({
        disks : [
            'Images', 'Documents'
        ],
        button : {
            text : 'Update URL',
            onClick : function(path) {
                win.document.getElementById(field_id).value = path;
            }
        }
    });
}

function accessDiskBrowser(callback, disks)
{
    var configParameters = {};

    configParameters.button  = {
            text : 'Update',
            onClick : function(path) {
                if (callback) callback(path);
            }
        };

    if (disks) {
        configParameters.disks = getArrayFromCSV(disks);
    }

    browser.openBrowser(configParameters);
}

function getArrayFromCSV(csv)
{
    // Return empty array if csv is not defined
    if (!csv) {
        return [];
    }

    if (csv.indexOf(',')) {
        return csv.split(',');
    }

    return [csv];
}