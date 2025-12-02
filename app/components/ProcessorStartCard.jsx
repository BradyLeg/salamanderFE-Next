'use client';
import Image from 'next/image'
import DropDown from '@/app/components/imgCondition/DropDown';
import { useState, useEffect } from "react";
import salamanderImg from '@/public/salamander.jpg';
import test1 from '@/public/c6475ltao8fe1.webp';
import binarizedImg from '@/public/binarized.png'

export default function ProcessorStartCard() {
    const [rangeNum, setNum] = useState(60);
    const [hexNum, setHex] = useState("#2a3e25");
    const [filename, setFile] = useState(salamanderImg);

    function setNumState(event) {
        setNum(event.target.value);
    }

    function setColor(event) {
        setHex(event.target.value);
    }

    function setFileName(event) {
        setFile(event.target.value);
    }
    // useEffect(() => {
    //     setFile();
    // }, [])

    //let test = ""
    //mock
    if (filename === "salamander1.mp4") {
        let test = salamanderImg;
    }
    if (filename === "salamander2.mov") {
        test = test1;
    }
    if (filename === "forest_intro.mp4") {
        test = salamanderImg;
    }

    /* 
    Show video tumbnail and process button when video is selected
    Second route for displaying results 
    */





    return (
        <form className="container-card-starter" /*action={`/process/{filename}?targetColor=<hex>&threshold=<int>`}*/>
            <div className="card-row">
                <div className="card-left">
                    <ul>
                        <li>Import Video <DropDown event={setFileName} /></li>
                        <li>Color <input type="color" id="color" name="color" defaultValue={hexNum} onInput={setColor}></input></li>
                        <li>Threshold <input type="range" min="0" max="164" defaultValue={rangeNum} onInput={setNumState}></input><p>{rangeNum}</p></li>
                    </ul>
                </div>
                <div className="card-right">

                    <Image src={test} alt="Binarized Salamander Miku" />
                    <Image src={binarizedImg} alt="Binarized Salamander Miku" />
                </div>
            </div>

            <div className="button-lower">
                <button type="submit">“Process Video with These Settings</button>
            </div>
        </form>
    )
}