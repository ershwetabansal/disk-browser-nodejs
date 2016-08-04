var browser = FileBrowser().getInstance();
browser.setup({

    disks : {
        search : true,
        search_URL: '/disk/search',
        details : [
            {
                name: 'assets',
                label: 'Website assets'
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
        button : {
            text : 'Update URL',
            onClick : function(path) {
                win.document.getElementById(field_id).value = path;
            }
        }
    });
}

function accessBrowser(callback)
{
    browser.openBrowser({
        button : {
            text : 'Update URL',
            onClick : function(path) {
                if (callback) callback(path);
            }
        }
    });
}