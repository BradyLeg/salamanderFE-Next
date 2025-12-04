// import { read } from "jimp";

export async function POST(req) {
  try {
    const { imageUrl, hexColor, threshold } = await req.json();

    const { read } = await import('jimp');

    const rTarget = parseInt(hexColor.slice(1, 3), 16);
    const gTarget = parseInt(hexColor.slice(3, 5), 16);
    const bTarget = parseInt(hexColor.slice(5, 7), 16);

    const image = await read(imageUrl);
    const { width, height, data } = image.bitmap;

    function colorDistance(r1, g1, b1, r2, g2, b2) {
      return Math.sqrt(
        Math.pow(r1 - r2, 2) +
        Math.pow(g1 - g2, 2) +
        Math.pow(b1 - b2, 2)
      );
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const distance = colorDistance(r, g, b, rTarget, gTarget, bTarget);
        const color = distance >= threshold ? 0xFFFFFFFF : 0x000000FF;

        image.setPixelColor(color, x, y);
      }
    }

    const base64 = await image.getBase64Async("image/png");
    return new Response(JSON.stringify({ base64 }), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error('Binarize API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    });
  }
}