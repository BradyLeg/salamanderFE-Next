import Jimp from "jimp";
import salamanderImg from './../public/salamander.jpg'

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

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        const r = this.bitmap.data[idx];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        const dist = colorDistance(r, g, b, target.r, target.g, target.b);

        const binary = dist <= threshold ? 255 : 0;
        this.bitmap.data[idx] = binary;
        this.bitmap.data[idx + 1] = binary;
        this.bitmap.data[idx + 2] = binary;
    });

    await image.writeAsync(output);
}

await binarizeImage(salamanderImg, "output.png", "#000000", 30);
