'use client';
import DropDown from '@/app/components/imgCondition/DropDown';
import { BinarizeCanvas, RenderImg } from '@/app/components/imgCondition/BinarizeCanvas';
import { TrackingOverlay } from './imgCondition/TrackingOverlay';
import SoundButton from './ConfirmButton';
// import RenderImg from './imgCondition/RenderImg';
import { useState, useEffect } from "react";

export default function ProcessorStartCard() {
    const [rangeNum, setNum] = useState(60);
    const [hexNum, setHex] = useState("#2a3e25");
    // const [binarizedSrc, setBinarizedSrc] = useState(null);
    const [filename, setFile] = useState("");
    const [centroid, setCentroid] = useState(null);
    //const [show, setShow] = useState(false);

    function setNumState(event) {
        setNum(event.target.value);
    }

    function setColor(event) {
        setHex(event.target.value);
    }

    function setFileName(event) {
        setFile(event.target.value);
        console.log(filename);
    }

    return (
        <form className="container-card-starter" onSubmit={e => { e.preventDefault(); }}>
            {/* <form className="container-card-starter" action={`/process/{filename}?targetColor=<hex>&threshold=<int>`} */}
            <div className="card-row">
                <div className="card-left">
                    <ul>
                        <li>Import Video <DropDown event={setFileName} /></li>
                        {filename != "" && <>
                            <li>Color <input type="color" id="color" name="color" defaultValue={hexNum} onInput={setColor}></input></li>
                            <li>Threshold <input type="range" min="0" max="164" defaultValue={rangeNum} onInput={setNumState}></input><p>{rangeNum}</p></li>
                        </>}

                    </ul>
                </div>
                {filename != "" && <div className="card-right" style={{ position: "relative" }}>
                    <div className='imageFetchBE'><RenderImg filename={filename} /></div>
                    <div className='imageFetchBE'> 
                        <div className = "canvas-wrapper" style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
                            {/* We'll need to get the image size from BinarizeCanvas and pass it to TrackingOverlay */}
                            <BinarizeCanvas 
                                filename={filename}
                                hexColor={hexNum}
                                threshold={rangeNum}
                                onObjectFound={(c, _pixels, imgSize) => setCentroid({ ...c, imgSize })}
                            />
                            {/* TrackingOverlay expects normalized coordinates and image size */}
                            <TrackingOverlay point={centroid} />
                        </div>
                    </div>
                    </div>
                }
            </div>

            {filename != "" && <div className="button-lower">
                {/* <button type="submit">“Process Video with These Settings</button> */}
                <SoundButton/>
            </div>
            }
        </form>
    )
}