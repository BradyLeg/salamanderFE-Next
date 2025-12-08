"use client";
import { useRef } from "react";
import { startProcessing } from "./../api/binarize/route";

export default function SoundButton(props) {
    const audioRef = useRef(null);

    const handleClick = async () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        console.log(props.file)
        console.log(props.hex)
        console.log(props.threshold)
        console.log("Sending")
        props.setJob(await startProcessing(props.file, props.hex, props.threshold));
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
