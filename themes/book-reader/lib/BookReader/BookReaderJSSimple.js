//
// This file shows the minimum you need to provide to BookReader to display a book
//
// Copyright(c)2008-2009 Internet Archive. Software license AGPL version 3.

$(document).ready(function() {
    // Create the BookReader object
    br = new BookReader();

    // Return the width of a given page.  Here we assume all images are 800 pixels wide
    br.getPageWidth = function(index) {
        return 800;
    }

    // Return the height of a given page.  Here we assume all images are 1200 pixels high
    br.getPageHeight = function(index) {
        return 1200;
    }

    // We load the images from archive.org -- you can modify this function to retrieve images
    // using a different URL structure
    br.getPageURI = function(index) {
        var baseUrl = "http://localhost:8080/xmlui/bitstream/handle/1811/25108/";
        switch(index)
        {
            case 0:
                return baseUrl + '1576_1205.jpeg?sequence=7';
                break;
            case 1:
                return baseUrl + '1576_1206.jpeg?sequence=6';
                break;
            case 2:
                return baseUrl + '1576_1207.jpeg?sequence=5';
                break;
            case 3:
                return baseUrl + '1576_1208.jpeg?sequence=4';
                break;
            case 4:
                return baseUrl + '1576_1209.jpeg?sequence=3';
                break;
            case 5:
                return baseUrl + '1576_1210.jpeg?sequence=2';
                break;
            case 6:
                return baseUrl + '1576_1211.jpeg?sequence=1';
                break;
            default:
                return "http://ia341334.us.archive.org/2/items/BookReader/img/page001.jpg";
        }



    //    var leafStr = '000';
    //    var imgStr = (index+1).toString();
    //    var re = new RegExp("0{"+imgStr.length+"}$");
    //    var url = 'http://www.archive.org/download/BookReader/img/page'+leafStr.replace(re, imgStr) + '.jpg';
    //    return url;
    }

    // Return which side, left or right, that a given page should be displayed on
    br.getPageSide = function(index) {
        if (0 == (index & 0x1)) {
            return 'R';
        } else {
            return 'L';
        }
    }

    // This function returns the left and right indices for the user-visible
    // spread that contains the given index.  The return values may be
    // null if there is no facing page or the index is invalid.
    br.getSpreadIndices = function(pindex) {
        var spreadIndices = [null, null];
        if ('rl' == this.pageProgression) {
            // Right to Left
            if (this.getPageSide(pindex) == 'R') {
                spreadIndices[1] = pindex;
                spreadIndices[0] = pindex + 1;
            } else {
                // Given index was LHS
                spreadIndices[0] = pindex;
                spreadIndices[1] = pindex - 1;
            }
        } else {
            // Left to right
            if (this.getPageSide(pindex) == 'L') {
                spreadIndices[0] = pindex;
                spreadIndices[1] = pindex + 1;
            } else {
                // Given index was RHS
                spreadIndices[1] = pindex;
                spreadIndices[0] = pindex - 1;
            }
        }

        return spreadIndices;
    }

    // For a given "accessible page index" return the page number in the book.
    //
    // For example, index 5 might correspond to "Page 1" if there is front matter such
    // as a title page and table of contents.
    br.getPageNum = function(index) {
        return index+1;
    }

    // Total number of leafs
    br.numLeafs = 15;

    // Book title and the URL used for the book title link
    br.bookTitle= 'Open Library Bookreader Presentation';
    br.bookUrl  = 'http://openlibrary.org';

    // Let's go!
    br.init();

});
