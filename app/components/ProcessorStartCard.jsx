'use client';
import Image from 'next/image'
import salamanderImg from '@/public/salamander.jpg'
import binarizedImg from '@/public/binarized.png'
import DropDown from '@/app/components/imgCondition/DropDown';
import { useState, useEffect } from "react";

export default function ProcessorStartCard() {
    const [rangeNum, setNum] = useState(60);
    const [hexNum, setHex] = useState("#2a3e25");

    function setNumState(event) {
        setNum(event.target.value);
    }

    function setColor(event) {
        setHex(event.target.value);
    }

    return (
        <form className="container-card-starter">
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
                    <Image src={binarizedImg} alt="Binarized Salamander Miku" />
                </div>
            </div>

            <div className="button-lower">
                <button type="submit">START</button>
            </div>
        </form>
    )
}