'use client';
import { mockVideoList } from "../../mock/mockVideos";
import { useState, useEffect } from "react";

export default function DropDown(props) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos(mockVideoList);
    }, [])

    const videoOptions = videos.map(video => {
        return (
            <option value={video} key={video}>{video}</option>
        )
    })

    videoOptions.unshift((<option value="" key="">Select an option</option>))

    return (
        <select name="video" id="video" onChange={props.event}>
            {videoOptions}
        </select>
    )
}