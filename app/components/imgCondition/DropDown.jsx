'use client';

import { useState, useEffect } from "react";
import { fetchVideos } from "../../api/binarize/route";

export default function DropDown(props) {
    const [videos, setVideos] = useState([]);

    // useEffect to fetch video list on component mount
    useEffect(() => {
        const getVideos = async () => {
            const videoList = await fetchVideos(); // Call fetchVideos() to get data
            setVideos(videoList); // Set the fetched video list into state
        };

        getVideos(); // Call the async function to fetch videos
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    // Create options from the videos array
    const videoOptions = videos.map(video => (
        <option value={video} key={video}>{video}</option>
    ));

    // Add a default "Select an option" option at the beginning
    videoOptions.unshift(<option value="" key="">Select an option</option>);

    return (
        <select name="video" id="video" onChange={props.event}>
            {videoOptions}
        </select>
    );
}
