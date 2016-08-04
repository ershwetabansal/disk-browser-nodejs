
function setUpHTMLFixture() {
	document.body.innerHTML = '<div id="FileBrowser">' + 
		'<div class="directories">' +
		'<ul id="disk_navbar" class="nav nav-tabs nav-justified"></ul>' +
		'<ul id="directories-list"></ul>' +
		'</div>' +
		'<div class="files">' +
		'<table id="files-list"></table>' +
        '<ul id="files-grid"></ul>' +
		'</div>' +
        '<ul id="show-file-details" class="list-inline hidden"></ul>' +
		'</div>';
}

function keyPress(key) {
  var event = document.createEvent('Event');
  event.keyCode = key;
  event.initEvent('keydown');
  document.dispatchEvent(event);
}

function getDiskData() {
	return [
       {
           name: 'Images',
           label: 'Image Folder',
           absolute_path: false,
           search: '/asset/file/search'
       },
       {
           name: 'S3',
           label: 'AWS S3',
           absolute_path: false,
           search: '/asset/file/search'
       }
    ];
}

function getDirectoryData() {
	return [
        {
            name: 'cats',
            directories: [
                {
                    name: '2016',
                    directories: [
                        {name: '01'},
                        {name: '02'},
                        {name: '03'},
                        {name: '04'},
                        {name: '05'},
                        {name: '06'},
                        {name: '07'},
                        {name: '08'},
                        {name: '09'},
                        {name: '10'}
                    ]
                }
            ]
        },
        {
            name: 'dogs',
            directories: [
                {
                    name: '2016',
                    directories: [
                        {name: '01'},
                        {name: '02'},
                        {name: '03'},
                        {name: '04'},
                        {name: '05'},
                        {name: '06'},
                        {name: '07'},
                        {name: '08'},
                        {name: '09'},
                        {name: '10'}
                    ]
                }
            ]
        },
        {
            name: 'monkeys',
            directories: [
                {
                    name: '2016',
                    directories: [
                        {name: '01'},
                        {name: '02'},
                        {name: '03'},
                        {name: '04'},
                        {name: '05'},
                        {name: '06'},
                        {name: '07'},
                        {name: '08'},
                        {name: '09'},
                        {name: '10'}
                    ]
                }
            ]
        }
    ]
}

function getFilesData() {
    return [
                {
                    name: 'Black Cat.jpg',
                    path: 'https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg',
                    size: 50,
                    last_modified_date: '2015-01-01 00:00',
                    type: 'jpg'
                },
                {
                    name: 'Kitten.jpg',
                    path: 'http://www.medhatspca.ca/sites/default/files/news_photos/2014-Apr-15/node-147/cute-little-cat.jpg',
                    size: 20,
                    last_modified_date: '2015-01-01 00:00',
                    type: 'jpg'
                },
                {
                    name: 'Fat Cat.jpg',
                    path: 'http://images.thesurge.com/app/uploads/2015/12/cat-.jpg?1bccdf',
                    size: 100,
                    last_modified_date: '2015-01-01 00:00',
                    type: 'jpg'
                }
            ];
}

function getSetupObject() {
	return {
		disks : {
	        search : true,
	        details : [
	         {
	             name: 'Images',
	             label: 'Image Folder',
	             absolute_path: false,
	             search_URL: '/asset/file/search'
	         },
	         {
	             name: 'S3',
	             label: 'AWS S3',
	             absolute_path: false,
	             search_URL: '/asset/file/search'
	         }
	      ]
	    },
	    directories: {
	       list: '/asset/directories',
	       destroy: '/asset/directories/destroy',
	       create: '/asset/directories/store',
	       update: '/asset/directories/update'
	    },
	    files: {
	       list: '/asset/files',
	       destroy: '/asset/file/destroy',
	       upload: { 
	            url : '/asset/file/store', 
	            params : [
	                {name : 'Name', label : 'File Name' , 'type' : 'text'}
	            ]},
	       update: '/asset/file/store',
	       unit: 'kb'
	    }
	};
}

module.exports = {
	setUpHTMLFixture : setUpHTMLFixture,
	keyPress : keyPress,
	getDiskData : getDiskData,
	getDirectoryData : getDirectoryData,
    getFilesData : getFilesData,
	getSetupObject : getSetupObject
}