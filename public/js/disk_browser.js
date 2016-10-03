var browser = FileBrowser().getInstance();
browser.setup({

    disks : {
        search : true,
        search_URL: '/disk/search',
        details : [
            {
                name: 'assets',
                label: 'Images',
                allowed_extensions: ['png','jpg','jpeg','bmp','tiff','gif']
            },
            {
                name: 'assets',
                label: 'Documents',
                allowed_extensions: ['doc','docx','pdf','xls','xlsx']
            },
            {
                name: 'assets',
                label: 'Cats',
                allowed_directories: ['/cats'],
                read_only: true
            }
        ]
    },
    directories: {
        list: '/disk/directories',
        create: '/disk/directory/store',
        delete: '/disk/directory/destroy'
    },
    files: {
        list: '/disk/files',
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

function accessBrowser(callback, disks)
{
    var configParameters = {
        button : {
            text : 'Update URL',
            onClick : function(path) {
                if (callback) callback(path);
            }
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