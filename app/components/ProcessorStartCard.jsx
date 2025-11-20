'use client';
import Image from 'next/image'
import salamanderImg from '@/public/salamander.jpg'
import DropDown from '@/app/components/imgCondition/DropDown';
import { useState, useEffect } from "react";

export default function ProcessorStartCard() {
    const [rangeNum, setNum] = useState(60);

    function rangeDisplay(event) {
        setNum(event.target.value);
    }


    return (
        <div className="container-card-starter">
            <div className="card-row">
                <div className="card-left">
                    <ul>
                        <li>Import Video <DropDown /></li>
                        <li>Color <input type="color" id="color" name="color"></input></li>
                        <li>Threshold <input type="range" min="0" max="164" defaultValue={rangeNum} onInput={rangeDisplay}></input><p>{rangeNum}</p></li>
                    </ul>
                </div>
                <div className="card-right">
                    {/* <img src= {salamanderImg} alt="Binarized Salamander Miku" /> */}
                    <Image src={salamanderImg} alt="Binarized Salamander Miku" />
                </div>
            </div>

            <div className="button-lower">
                <button type="submit">START</button>
            </div>
        </div>
    )
}