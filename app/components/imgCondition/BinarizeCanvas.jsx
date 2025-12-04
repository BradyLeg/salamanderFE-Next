"use client";
import React from "react";
import test from '@/public/salamander.jpg';
//import { blob } from "stream/consumers";


export default function BinarizeCanvas(props) {
    const [outputUrl, setOutputUrl] = React.useState(null);
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        handleFile();
    }, []);

    //loads img into memory
    const handleFile = () => {

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