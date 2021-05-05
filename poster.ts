import {processImage} from "./imageSlicer"
import {PICTURE_SIZE} from "./imageSlicer"

var myArgs = process.argv.slice(2);
var theImage = myArgs[0];
var theCount = Number.parseInt(myArgs[1]);

console.log ( "Image to process: " + theImage );
console.log ( "Horizontal count of images: " + theCount );

processImage(theImage, theCount, PICTURE_SIZE.FOUR_BY_SIX);