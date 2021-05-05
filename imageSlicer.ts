import Jimp from 'jimp';
let MIN_HEIGHT = 1600;

// https://github.com/oliver-moran/jimp/tree/master/packages/jimp

enum PICTURE_SIZE {
    FOUR_BY_SIX,
    FIVE_BY_SEVEN
}

let newImagePromise = function(width:Number,height:Number) {
    return new Promise( (resolve, reject) => {
        new Jimp(width, height, (err:any, image:any) => {
            if ( err ) {
                reject(err);
            }
            resolve(image);
        });
    });
}

async function processImage(imagePath:string, 
                            widthCount:number,
                            pictureSize:PICTURE_SIZE ) {
    var theImage = await Jimp.read(imagePath);
    console.log ("processing image ...");

    let picDimentions = pictureSize == PICTURE_SIZE.FOUR_BY_SIX ? (4/6) : (5/7);
    let pixelWidth = Math.round(theImage.getWidth() / widthCount);
    let pixelHeight = Math.round( picDimentions * pixelWidth);
    let heightCount = Math.round(theImage.getHeight() / pixelHeight);

    console.log ("Number of total images: " + (widthCount * heightCount));
    let destX = 0;
    let destY = 0;

    for ( var heightIter = 0; heightIter < heightCount; heightIter ++ ) {
        for ( var widthIter = 0; widthIter < widthCount; widthIter ++ ) {

            let srcX = widthIter * pixelWidth;
            let srcY = heightIter * pixelHeight;
            let srcWidth = pixelWidth;
            let srcHeight = pixelHeight;

            var tempImage = await newImagePromise(pixelWidth,pixelHeight) as Jimp;
            let imageName = "./output/pic_row_" + heightIter + 
                            "_col_" + widthIter + ".jpg";
            let sizeMultiplier = Math.round(MIN_HEIGHT / srcHeight);
            tempImage.blit( theImage, 
                destX, 
                destY, 
                srcX, 
                srcY, 
                srcWidth, 
                srcHeight );
            tempImage.resize(tempImage.getWidth()  *  sizeMultiplier,
                             tempImage.getHeight() * sizeMultiplier)
            tempImage.write (imageName);

        }
    }
}

export {PICTURE_SIZE}
export {processImage}