'use client';
import { useState, useEffect } from "react";
import { getJobStatus } from '../api/binarize/route';

import TrackingOverlay from '@/app/components/imgCondition/TrackingOverlay';
import DropDown from '@/app/components/imgCondition/DropDown';
import { BinarizeCanvas, RenderImg } from '@/app/components/imgCondition/BinarizeCanvas';

import SoundButton from '@/app/components/ConfirmButton';
import StatusCard from '@/app/components/StatusCard';

export default function ProcessorStartCard() {
    const [rangeNum, setNum] = useState(60);
    const [hexNum, setHex] = useState("#2a3e25");
    const [filename, setFile] = useState("");
    const [centroid, setCentroid] = useState(null);
    const [jobId, setJobId] = useState("");
    const [statusFE, setStatusFe] = useState("");
    const [URL, setURL] = useState("");

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

    function setJob(data) {
        setJobId(data);
    }

    useEffect(() => {
        if (!jobId) return;

        let intervalId = null;
        let stopped = false;

        async function poll() {
            try {
                const status = await getJobStatus(jobId.jobId);
                setURL(jobId.jobId);
                console.log("URL:", URL);
                setStatusFe(status.status);
                console.log("STATUS:", status);

                if (status.status === "done") {
                    console.log("Job finished!", status.result);
                    stopped = true;
                    clearInterval(intervalId);

                }
            } catch (err) {
                console.error("Error polling job:", err);
            }
        }
        intervalId = setInterval(poll, 2000);
        poll();

        return () => {
            clearInterval(intervalId);
            stopped = true;
        };
    }, [jobId])


    return (
        <form className="container-card-starter" onSubmit={e => { e.preventDefault(); }}>
            <div className="card-row">
                <div className="card-left">
                    <ul>
                        <li>Import Video <DropDown event={setFileName} /></li>
                        {filename != "" && <>
                            <li>Color <input type="color" id="color" name="color" defaultValue={hexNum} onInput={setColor}></input></li>
                            <li>Threshold <input type="range" min="0" max="100" defaultValue={rangeNum} onInput={setNumState}></input><p>{rangeNum}</p></li>
                        </>}

                    </ul>
                </div>
                {filename != "" && 
                <div className="card-right" style={{ position: "relative" }}>
                    <div className='imageFetchBE'><RenderImg filename={filename} /></div>
                    <div className="canvas-wrapper">
                        <BinarizeCanvas
                        filename={filename}
                        hexColor={hexNum}
                        threshold={rangeNum}
                        onObjectFound={(c, _pixels, imgSize) => setCentroid({ ...c, imgSize })}
                        />
                        <TrackingOverlay point={centroid} />
                    </div>
                </div>
                }
            </div>

            {filename != "" && <div className="button-lower">
                <SoundButton file={filename} hex={hexNum} threshold={rangeNum} setJob={setJob}/>
            </div>
            }

            {jobId != "" && <div className="button-lower">
                <StatusCard setURL={URL} statusFE={statusFE} />
            </div>
            }
        </form>
    )
}