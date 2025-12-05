"use client";
import { useRef } from "react";

export default function SoundButton() {
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
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
