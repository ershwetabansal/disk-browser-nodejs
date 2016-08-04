var util = require('../../../public/js/Fbrowser/helpers/util.js');

describe("Test Utility functions. ", function() {

    it("should slugify a string", function() {
        expect(util.slugify("Home page")).toBe("home_page");
    });

    it("should un-slugify a string", function() {
        expect(util.unSlugify("home_page")).toBe("Home page");
    });

    it("should check if the extension is for image", function() {
        expect(util.isImage('jpg')).toBe(true);
        expect(util.isImage('doc')).toBe(false);
    });

    it("should return the font awesome class based upon extension", function() {
        expect(util.getFontAwesomeClass('jpg')).toBe('fa-file-image-o');
        expect(util.getFontAwesomeClass('doc')).toBe('fa-file-word-o');
    });

    it("should return the sorted array", function() {
        var unsorted = [
            { a : '5', b: 'something'},
            { a : '2', b: 'something'},
            { a : '3', b: 'something'},
            { a : '4', b: 'something'}
        ];

        var ascSorted = [
            { a : '2', b: 'something'},
            { a : '3', b: 'something'},
            { a : '4', b: 'something'},
            { a : '5', b: 'something'}
        ];

        var descSorted = [
            { a : '5', b: 'something'},
            { a : '4', b: 'something'},
            { a : '3', b: 'something'},
            { a : '2', b: 'something'}
        ];
        expect(util.sortByType(unsorted, 'a', true)).toEqual(ascSorted);
        expect(util.sortByType(unsorted, 'a', false)).toEqual(descSorted);
    });
});