var stub = require('../helpers/stub.js');
var setup = require('../helpers/setup.js');
var element = require('../../../public/js/Fbrowser/helpers/element.js');

var dirHandler, fileHandler, diskHandler;
describe("File browser should be able to manage disks, directories and files. User", function() {

	beforeEach(function() {
	
		stub.setUpHTMLFixture();
		setup.setupHandlers(stub.getSetupObject());
		fileHandler = setup.getFileHandler();
		dirHandler = setup.getDirHandler();
		diskHandler = setup.getDiskHandler();
		
    });

    it("should be able to click on a directory and corresponding files should list down.", function(done) {

		dirHandler.loadDirectories(stub.getDirectoryData());
    	var directory = element.getDirectories().find('li').eq(1).find('> div');
    	directory.click();

        setTimeout(function() {
            expect(element.getFilesGrid().children().length).toBeGreaterThan(0);
            done();
        },1000);
    });

    it("should be able to open any disk and should see directories. On click of a directory, files should load.", function(done) {

    	diskHandler.loadDisks(stub.getDiskData());
    	var disk = element.getDiskNavbar().find('li').eq(1);
    	disk.click();

    	expect(element.getDirectories().find('li').length).toBeGreaterThan(0);

        var directory = element.getDirectories().find('li').eq(1).find('> div');
    	directory.click();

        setTimeout(function() {
            expect(element.getFilesGrid().children().length).toBeGreaterThan(0);
            done();
        },1000);

    });

    it("should be able to create a new directory.", function() {

        var directory = element.getDirectories().find('li').eq(1);
		element.select(element.getDirectories(), directory);

    	var totalDir = element.getDirectories().find('li').length;
    	setup.getDirHandler().addNewDirectoryToSelectedDirectory();
    	stub.keyPress(13);

        expect(element.getDirectories().find('li').length).toBeGreaterThan(totalDir);

    });

    it("should be able to select a file and its details should be visible.", function() {

        dirHandler.loadDirectories(stub.getDirectoryData());
        var directory = element.getDirectories().find('li').eq(1).find('> div');
        directory.click();

        var file = element.getFilesGrid().children().eq(0);
        expect(file.length).toBe(1);
        file.click();

        expect(element.getFileDetailsDiv().children().length).toBeGreaterThan(0);

    });

});