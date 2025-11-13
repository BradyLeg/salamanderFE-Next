import { mockVideoList } from "../../mock/mockVideos";
import { useState, useEffect } from "react";

export default function DropDown() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {

        setVideos(mockVideoList);
    }, [])
}