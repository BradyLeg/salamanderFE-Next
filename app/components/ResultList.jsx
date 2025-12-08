'use client';

import { useState, useEffect } from "react";
import { fetchResults } from "../api/binarize/route";

import StatusCard from "@/app/components/StatusCard";

export default function ResultList(props) {
    const [result, setResult] = useState([]);

    // useEffect to fetch video list on component mount
    useEffect(() => {
        const getResults = async () => {
            const resultList = await fetchResults(); // Call fetchVideos() to get data
            setResult(resultList); // Set the fetched video list into state
        };

        getResults(); // Call the async function to fetch videos
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    return (
        <div className="container-card-starter">
            <div>
                {/* Render a list instead of a dropdown */}
                <ul className="resultList">
                    {/* Map through the result array and render each result as an <li> */}
                    {result.length > 0 ? (
                        result.map((result, index) => (
                            console.log("Result item:", result),
                            <li key={index}>
                                <StatusCard setURL={`results/${result}`} statusFE={result} />
                            </li>
                        ))
                    ) : (
                        <li>No results found</li>
                    )}
                </ul>
            </div>
        </div>
    );
}