"use client";
import { useRef, useState, useEffect } from "react";
import { startProcessing, getJobStatus } from "./../api/binarize/route";

export default function ConfirmButton(props) {
    const [jobStatus, setJobStatus] = useState(null);
    const audioRef = useRef(null);

    const handleClick = async () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        console.log("Props.file:", props.file);
        console.log("Props.hex:", props.hex);
        console.log("Props.threshold:", props.threshold);
        console.log("Sending request to process video...");
        
        try {
            const status = await startProcessing(props.file, props.hex, props.threshold);
            console.log("Job Status Response:", status);
            setJobStatus(status);
            
            // Log job ID if available
            if (status && status.jobId) {
                console.log("Job ID:", status.jobId);
            }
        } catch (error) {
            console.error("Error processing video:", error);
        }
    };

    return (
        <div>
            <audio
                ref={audioRef}
                src="/sounds/MikuTTS-Hey Salamander!!.mp3"
                preload="auto"
            />
            <button onClick={handleClick}>
                Process Video with These Settings
            </button>
        </div>
    );
}
