import { useState, useEffect } from "react";
import { fetchResults } from "../api/binarize/route";

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
        <div>
            {/* Render a list instead of a dropdown */}
            <ul>
                {/* Map through the result array and render each result as an <li> */}
                {result.length > 0 ? (
                    result.map((result, index) => (
                        <li key={index} onClick={() => props.event(result)}>
                            {result}
                        </li>
                    ))
                ) : (
                    <li>No results found</li>
                )}
            </ul>
        </div>
    );
}