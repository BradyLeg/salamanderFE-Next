'use client';
import { mockVideoList } from "../../mock/mockVideos";
import { useState, useEffect } from "react";

export default function DropDown() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {

        setVideos(mockVideoList);
    }, [])

    const videoOptions = videos.map(video => {
        return (
            <option value={video} key={video}>{video}</option>
        )
    })

    return (
        <select name="video" id="video">
            {videoOptions}
        </select>
    )
}