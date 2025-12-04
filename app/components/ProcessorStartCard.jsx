'use client';
import Image from 'next/image'
import salamanderImg from '@/public/salamander.jpg'
import binarizedImg from '@/public/binarized.png'
import DropDown from '@/app/components/imgCondition/DropDown';
import { useState, useEffect } from "react";
// import { toBinarized } from '@/script/binarizerV3';

export default function ProcessorStartCard() {
    const [rangeNum, setNum] = useState(60);
    const [hexNum, setHex] = useState("#2a3e25");
    const [binarizedSrc, setBinarizedSrc] = useState(null);

    function setNumState(event) {
        setNum(event.target.value);
    }

    function setColor(event) {
        setHex(event.target.value);
    }

    async function fetchBinarized() {
        try {
            const res = await fetch('/api/binarize', {
                method: 'POST',
                body: JSON.stringify({ imageUrl: salamanderImg.src, hexColor: hexNum, threshold: rangeNum }),
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || `API error: ${res.status}`);
            }
            const data = await res.json();
            setBinarizedSrc(data.base64);
        } catch (error) {
            console.error('Error processing image:', error);
        }
    }

    // useEffect(() => {
    //     async function processImage() {
    //         // `salamanderImg` is imported, get the path for Jimp
    //         const processedImage = await toBinarized(salamanderImg.src, hexNum, rangeNum);

    //         // Convert Jimp image to base64
    //         const base64 = await processedImage.getBase64Async(Jimp.MIME_PNG);

    //         setBinarizedSrc(base64);
    //     }

    //     processImage();
    // }, [hexNum, rangeNum]);

    /* 
    Show video tumbnail and process button when video is selected
    Second route for displaying results 
    */

    return (
        <form className="container-card-starter" onSubmit={e => { e.preventDefault(); fetchBinarized(); }}>
            <div className="card-row">
                <div className="card-left">
                    <ul>
                        <li>Import Video <DropDown /></li>
                        <li>Color <input type="color" id="color" name="color" defaultValue={hexNum} onInput={setColor}></input></li>
                        <li>Threshold <input type="range" min="0" max="164" defaultValue={rangeNum} onInput={setNumState}></input><p>{rangeNum}</p></li>
                    </ul>
                </div>
                <div className="card-right">
                    {/* <img src= {salamanderImg} alt="Binarized Salamander Miku" /> */}
                    <Image src={salamanderImg} alt="Binarized Salamander Miku" />
                    {/* <Image src={binarizedImg} alt="Binarized Salamander Miku" /> */}
                    {binarizedSrc && (<img src={binarizedSrc} alt="Binarized Salamander" />)}
                </div>
            </div>

            <div className="button-lower">
                <button type="submit">Process Video</button>
            </div>
        </form>
    )
}