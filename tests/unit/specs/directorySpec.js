var stub = require('../helpers/stub.js');
var setup = require('../helpers/setup.js');
var element = require('../../../public/js/Fbrowser/helpers/element.js');


describe("File browser should be able to manage directories and ", function() {

	beforeEach(function() {
	
		stub.setUpHTMLFixture();
		setup.setupHandlers(stub.getSetupObject());
		setup.getDirHandler().loadDirectories(stub.getDirectoryData());
    
    });
    
    it("should be able to load directories when opens up.", function() {

    	expect(element.getDirectories().find('li').length).toBeGreaterThan(0);
    
    });

    it("should be able to show directories when any directory is clicked.", function() {
    
    	var directory = element.getDirectories().find('li').eq(1);
    	setup.getDirHandler().showSubDirectories(directory);
    	
    	expect(directory.find('ul').length).toBe(1);
    
    });

    it("should be able to hide directories when already sub directories are shown.", function() {
    	
    	var directory = element.getDirectories().find('li').eq(1);
    	setup.getDirHandler().showSubDirectories(directory);
    	setup.getDirHandler().hideSubDirectories(directory);

    	expect(directory.find('ul').length).toBe(0);

    });

    it("should be able to add new directory to a selected directory.", function() {

		var directory = element.getDirectories().find('li').eq(1);
		element.select(element.getDirectories(), directory);
    	
    	setup.getDirHandler().addNewDirectoryToSelectedDirectory();
    	expect(directory.find('input').length).toBe(1);		    	

    });


    it("should be able to save new directory.", function() {

  		// Should be able to add a new directory
		var directory = element.getDirectories().find('li').eq(1);
		element.select(element.getDirectories(), directory);    	
    	var inputElement = setup.getDirHandler().addNewDirectoryToSelectedDirectory();

    	// Should be able to name the newly directory
		inputElement.val('New Folder');

		// And then directory should get created with the new name
		setup.getDirHandler().saveDirectory(inputElement);
		expect(directory.find('ul').find('li').text()).toBe('New Folder');

    });


    it("should be able to rename a directory.", function() {
    	
    	//Should be able to rename a directory.
    	var directory = element.getDirectories().find('li').eq(1);
		var inputElement = setup.getDirHandler().renameDirectory(directory);
		inputElement.val('Something');

		//Should be able to save the directory with new name
		setup.getDirHandler().saveDirectory(inputElement);
		expect(directory.text()).toBe('Something');

    });


    it("should be able to retrieve details for currently selected directory.", function() {
    	
    	var directory = element.getDirectories().find('li').eq(1);
		element.select(element.getDirectories(), directory);

    	expect(setup.getDirHandler().getCurrentDirectory().element.text()).toBe(directory.text());

    });

    it("should be able to verify if child directories are open or not.", function() {
		
		var directory = element.getDirectories().find('li').eq(1);

		setup.getDirHandler().showSubDirectories(directory);
		expect(setup.getDirHandler().childDirOpen(directory)).toBe(true);

		setup.getDirHandler().hideSubDirectories(directory);
		expect(setup.getDirHandler().childDirOpen(directory)).toBe(false);

    });
});

