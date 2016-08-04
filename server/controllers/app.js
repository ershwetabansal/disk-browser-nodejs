var express         = require('express'),
    http            = require('http'),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    url             = require('url'),
    fs              = require('fs');

var app = express();
exports.startServer = function() {
app.set('port', process.env.PORT || 3000);
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, '../../public'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/browser', function(req,res){
  res.render('index', {});
});

app.post('/disk/directories', function(request, response) {
  var data = request.body;
  var dirRootPath = path.join(__dirname, '../../public/' + data.disk + data.path);
  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify(getSubDirectories(dirRootPath)));
  response.end();
});

app.post('/disk/files', function(request, response) {
  var data = request.body;

  var dirRootPath = path.join(__dirname, '../../public/' + data.disk + data.path);
  response.writeHead(200, "OK", {'Content-Type': 'application/json'});
  response.write(JSON.stringify(getFiles(dirRootPath)));
  response.end();
  
});

function getFiles(path) {
  var fileJSON = [];
  var files = fs.readdirSync(path);
  files.forEach(function(fileName) {
    var stats = fs.statSync(path + "/" + fileName);
    console.log(stats);
    if (stats.isFile()) {
      var file = { 
          name : fileName, 
          size : stats.size,
          last_modified_date : stats.mtime,
          type : 'jpg'
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