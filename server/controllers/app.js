var express         = require('express'),
    http            = require('http'),
    path            = require('path'),
    // bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    url             = require('url'),
    fs              = require('fs'),
    bb              = require('express-busboy');

var disks = {
      assets : {
        path : function() {
          return path.join(__dirname, '../../public/assets' );
        }
      }
    };

initialSetup();

function initialSetup() {
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
          position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
  }
}

var app = express();

exports.startServer = function() {

bb.extend(app, {
  upload: true,
});
app.set('port', process.env.PORT || 3000);
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, '../../public'));
app.set('view engine', 'html');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/browser', function(req,res){
  res.render('index', {});
});

app.post('/disk/directories', function(request, response) {
  var data = request.body;
  var dirRootPath = disks[data.disk].path() + data.path;
  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify(getSubDirectories(dirRootPath)));
  response.end();
});

app.post('/disk/files', function(request, response) {
  var data = request.body;

  var dirRootPath = disks[data.disk].path() + data.path;
  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify(getFiles(dirRootPath)));
  response.end();
  
});

app.post('/disk/directory/store', function(request, response){
  var data = request.body;
  var dir = disks[data.disk].path() + data.path + (data.path.endsWith('/') ? '' : '/') + data.name;

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  var dirJSON = {
    success : true,
    directory : {
      name : data.name,
      path : data.path,
    }
  };

  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify(dirJSON));
  response.end();
});

app.post('/disk/directory/destroy', function(request, response) {
  var data = request.body;
  var dir = disks[data.disk].path() + data.path + (data.path.endsWith('/') ? '' : '/') + data.name;

  var success = true;
  try {
    fs.rmdirSync(dir);  
  } catch (e) {
    success = false;
  }

  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify({success : success}));
  response.end(); 

});

app.post('/disk/file/destroy', function(request, response) {
  var data = request.body;
  var file = disks[data.disk].path() + data.path + (data.path.endsWith('/') ? '' : '/') + data.name;

  var success = true;
  try {
    fs.unlink(file);  
  } catch (e) {
    success = false;
  }

  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify({success : success}));
  response.end(); 
});

app.post('/disk/file/store', function(request, response) {
  var stats = fs.statSync(request.files.file.file);
  var data = request.body;
  var file = {
    name : request.files.file.filename,
    size : stats.size,
    modified_at : stats.mtime
  };

  var newPath = disks[data.disk].path() + (data.path.endsWith('/') ? '' : '/') + request.files.file.filename;

  fs.readFile(request.files.file.file, function (err, data) {
    fs.writeFile(newPath, data, function (err) {
    });
  });

  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify(file));
  response.end();
});

app.post('/disk/search', function(request, response) {
  var data = request.body;
  var path = disks[data.disk].path();

  var files = getAllFiles(path, data.search);
  console.log(files);
  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify({files : files}));
  response.end();
});

function getAllFiles(stringPath, match) {
  var fileJSON = [];
  var files = fs.readdirSync(stringPath);
  files.forEach(function(fileName) {
    var stats = fs.statSync(stringPath + "/" + fileName);
    if (stats.isFile() && fileName.toLowerCase().indexOf(match) != -1) {
      var publicResourcesPath = path.join(__dirname, '../../public');
      console.log(publicResourcesPath);
      var file = { 
          name : fileName, 
          size : stats.size,
          modified_at : stats.mtime,
          path : stringPath.substring(publicResourcesPath.length)
      };
      fileJSON.push(file);      
    } else if(stats.isDirectory()) {
      var subDirectoryFiles = getAllFiles(stringPath + '/' + fileName, match);
      if (subDirectoryFiles.length > 0) {
        subDirectoryFiles.forEach(function(file) {
            fileJSON.push(file);
        });
      }
    }
  });

  return fileJSON;

}

function getFiles(path) {
  var fileJSON = [];
  var files = fs.readdirSync(path);
  files.forEach(function(fileName) {
    var stats = fs.statSync(path + "/" + fileName);
    if (stats.isFile()) {
      var file = { 
          name : fileName, 
          size : stats.size,
          modified_at : stats.mtime
      };
      fileJSON.push(file);      
    }
  });

  return fileJSON;

}

function getSubDirectories(path) {
  var dirJSON = [];
  var directories = fs.readdirSync(path);
  directories.forEach(function(dir) {
    if (fs.statSync(path + "/" + dir).isDirectory()) {
      var directory = { 
          name : dir, 
          directories : getSubDirectories(path + "/" + dir)
      };
      dirJSON.push(directory);      
    }
  });

  return dirJSON;

}

app.get('/*');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Demo server listening on port ' + app.get('port'));
});


};