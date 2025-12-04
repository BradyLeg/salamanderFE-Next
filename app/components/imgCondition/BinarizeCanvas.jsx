"use client";
import React from "react";
import { useState, useEffect } from "react";
import test from '@/public/salamander.jpg';
//import { blob } from "stream/consumers";

function imgGet(props){
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        const getImage = async () => {
            const src = await fetchImg(props.filename);
            setImgSrc(src);
        };

        // Call the getImage function inside useEffect
        getImage();
    }, [props.filename]); // Dependency on filename

    return imgSrc;
}


export default function BinarizeCanvas(props) {
    const [outputUrl, setOutputUrl] = React.useState(null);
    const canvasRef = React.useRef(null);

    const imgToProcess = imgGet(props);

    React.useEffect(() => {
        handleFile();
    }, []);

    //loads img into memory
    const handleFile = () => {

        const img = new Image();

        img.src = imgToProcess; //props.image;
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            binarizeCanvas(canvas, ctx, props);
        };
    };


    const binarizeCanvas = (canvas, ctx) => {
        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const {hexColor, threshold} = props;

        //threshold binarization
        // threshold = 60 //props.rangeNum;

        let color = hexColor.replace('#', '');
        const rTarget = parseInt(color.substring(0, 2), 16);
        const gTarget = parseInt(color.substring(2, 4), 16);
        const bTarget = parseInt(color.substring(4, 6), 16);


        for (let i = 0; i < data.length; i += 4) {
            const distance = colorDistance(r, g, b, rTarget, gTarget, bTarget);
            const value = distance >= threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);

        // convert canvas to URL to show output
        canvas.toBlob((blob) => {
            setOutputUrl(URL.createObjectURL(blob));
        });
    }

    function colorDistance(r1, g1, b1, r2, g2, b2) {
        return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
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