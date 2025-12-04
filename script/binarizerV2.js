function main(imageData, hexColor, threshold) {

    hexColor = hexColor.replace('#', '');
    const rTarget = parseInt(hexColor.substring(0, 2), 16);
    const gTarget = parseInt(hexColor.substring(2, 4), 16);
    const bTarget = parseInt(hexColor.substring(4, 6), 16);

    binaryArray = toBinaryArray(imageData, rTarget, gTarget, bTarget, threshold);

    return toImage(binaryArray);
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

function toBinaryArray(imageData, rTarget, gTarget, bTarget, threshold) {
    const binaryArray = []; //2D array to hold binary values

    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const rgb = imageData.getPixel(x, y);
            const r = (rgb >> 16) & 0xFF;
            const g = (rgb >> 8) & 0xFF;
            const b = rgb & 0xFF;

            const distance = colorDistance(r, g, b, rTarget, gTarget, bTarget);

            if (distance >= threshold) {
                binaryArray[y][x] = 1; // White pixel
            } else {
                binaryArray[y][x] = 0; // Black pixel
            }
        }
    }

    return binaryArray;
}

function toImage(binaryArray) {
    const height = binaryArray.length;
    const width = binaryArray[0].length;

    const craftImage = new CraftImage(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (binaryArray[y][x] === 1) {
                craftImage.setPixel(x, y, 0xFFFFFF); // White pixel
            } else {
                craftImage.setPixel(x, y, 0x000000); // Black pixel
            }
        }
    }

    return craftImage;
}