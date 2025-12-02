import Jimp from "jimp";

function hexToRgb(hex) {
    const num = hex.replace("#", "");
    return {
        r: parseInt(num.substring(0, 2), 16),
        g: parseInt(num.substring(2, 4), 16),
        b: parseInt(num.substring(4, 6), 16)
    };
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(
        (r1 - r2) ** 2 +
        (g1 - g2) ** 2 +
        (b1 - b2) ** 2
    );
}

async function binarizeImage(input, output, targetHex, threshold) {
    const target = hexToRgb(targetHex);
    const image = await Jimp.read(input);

    image
}