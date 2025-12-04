"use client";
import React from "react";
import test from '@/public/salamander.jpg';
//import { blob } from "stream/consumers";


export default function BinarizeCanvas() {
    const [outputUrl, setOutputUrl] = React.useState(null);
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        handleFile();
    }, []);

    //loads img into memory
    const handleFile = () => {
        // const file = e.target.files[0];
        // if (!file) return;

        const img = new Image();

        img.src = test.src; //props.image;
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            binarizeCanvas(canvas, ctx);
        };
    };


    const binarizeCanvas = (canvas, ctx) => {
        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        //threshold binarization
        const threshold = 60 //props.rangeNum;
        for (let i = 0; i < data.length; i += 4) {
            const value = data[i] > threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);

        // convert canvas to URL to show output
        canvas.toBlob((blob) => {
            setOutputUrl(URL.createObjectURL(blob));
        });
    }
    // //Converts hex to RGB
    // function hexToRGB(hex) {
    //     hex = hex.replace("#", "");
    //     const num = parseInt(hex, 16);
    //     return {
    //         r: (num >> 16) & 255,
    //         g: (num >> 8) & 255,
    //         b: num & 255
    //     };
    // }

    // function colorDistance(r1, g1, b1, r2, g2, b2) {
    //     return Math.sqrt(
    //         (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
    //     );
    // }


    // function processImage(img) {
    //     //Gets canvas, gives 2D context, and gives drawing access
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext("2d");

    //     //sets canvas to image size
    //     canvas.width = img.width;
    //     canvas.height = img.height;

    //     ctx.drawImage(img, 0, 0);

    //     const threshold = 60; // adjustable
    //     const targetHex = "#00AACC";
    //     const target = hexToRGB(targetHex);

    //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     const pixels = imageData.data;

    //     for (let i = 0; i < pixels.length; i += 4) {
    //         const r = pixels[i];
    //         const g = pixels[i + 1];
    //         const b = pixels[i + 2];

    //         const dist = colorDistance(r, g, b, target.r, target.g, target.b);

    //         if (dist <= threshold) {
    //             pixels[i] = 255;
    //             pixels[i + 1] = 255;
    //             pixels[i + 2] = 255;
    //         } else {
    //             pixels[i] = 0;
    //             pixels[i + 1] = 0;
    //             pixels[i + 2] = 0;
    //         }
    //     }

    //     ctx.putImageData(imageData, 0, 0);

    //     const url = canvas.toDataURL("image/png");
    //     setOutputUrl(url);
    // }

    return (
        <div>

            <canvas ref={canvasRef} style={{ display: "none" }} />

            {outputUrl && (
                <img
                    src={outputUrl}
                    alt="Binarized output"
                />
            )}
        </div>
    );
}