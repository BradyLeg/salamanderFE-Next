"use client";
import React from "react";
import test from '@/public/salamander.jpg';

import { useState, useEffect, useRef } from "react";
import { fetchImg } from "../../api/binarize/route";


// Custom hook for fetching image (memoizing the result)
function useCachedImage(filename) {
    const [imgSrc, setImgSrc] = useState(null);
    const cacheRef = useRef({}); // Cache to store previously fetched images

    useEffect(() => {
        // If the image is already in cache, set it directly
        if (cacheRef.current[filename]) {
            setImgSrc(cacheRef.current[filename]);
        } else {
            const getImage = async () => {
                const src = await fetchImg(filename);
                cacheRef.current[filename] = src; // Cache the result
                setImgSrc(src);
            };
            getImage();
        }
    }, [filename]);

    return imgSrc;
}

export function RenderImg(props) {
    const imgSrc = useCachedImage(props.filename);

    return (
        <div>
            {imgSrc ? <img src={imgSrc} alt={props.filename} /> : <p>Loading image...</p>}
        </div>
    );
}

export function BinarizeCanvas(props) {
    const [outputUrl, setOutputUrl] = useState(null);
    const canvasRef = useRef(null);
    const imgSrc = useCachedImage(props.filename); // Use the same caching logic here

    useEffect(() => {
        if (imgSrc) {
            handleFile(imgSrc); // Now handleFile is called when imgSrc is ready
        }
    }, [imgSrc, props.hexColor, props.threshold]); // Effect will trigger when imgSrc is updated

    const handleFile = (imgSrc) => {
        const img = new Image();
        img.src = imgSrc;

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

        // const hexColor = props.target.replace('#', '');

        // const rTarget = parseInt(hexColor.substring(0, 2), 16);
        // const gTarget = parseInt(hexColor.substring(2, 4), 16);
        // const bTarget = parseInt(hexColor.substring(4, 6), 16);


        const hexColor = props.hexColor || "#49070B";
        const threshold = props.threshold || 164;

        let color = hexColor.replace('#', '');
        const rTarget = parseInt(color.substring(0, 2), 16);
        const gTarget = parseInt(color.substring(2, 4), 16);
        const bTarget = parseInt(color.substring(4, 6), 16);

        for (let i = 0; i < data.length; i += 4) {
            const distance = colorDistance(data[i], data[i + 1], data[i + 2], rTarget, gTarget, bTarget);
            const value = distance >= threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);

        // Convert canvas to URL to show output
        canvas.toBlob((blob) => {
            setOutputUrl(URL.createObjectURL(blob));
        });
    };

    function colorDistance(r1, g1, b1, r2, g2, b2) {
        return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
    }

    return (
        <div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {outputUrl && <img src={outputUrl} alt="Binarized output" />}
        </div>
    );
}
