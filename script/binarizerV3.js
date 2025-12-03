import Jimp from "jimp";

function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

async function toBinarized(imageData, hexColor, threshold) {
    hexColor = hexColor.replace('#', '');
    const rTarget = parseInt(hexColor.substring(0, 2), 16);
    const gTarget = parseInt(hexColor.substring(2, 4), 16);
    const bTarget = parseInt(hexColor.substring(4, 6), 16);

    const image = await Jimp.read(imageData); //Create a new instance of image
    const { width, height, data } = image.bitmap;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4; //Jimp uses ID instead of cordinates
            const r = data[idx];
            const g = data[idx+1];
            const b = data[idx+2];

            const distance = colorDistance(r, g, b, rTarget, gTarget, bTarget);
            const color = distance >= threshold ? 0xFFFFFFFF : 0x000000FF;

            image.setPixelColor(color, x, y); //edit current instance in memory, with a binarized values
        }  
    }
    await image.writeAsync('output.jpg');
    console.log('Binarized image saved as output.jpg');
}