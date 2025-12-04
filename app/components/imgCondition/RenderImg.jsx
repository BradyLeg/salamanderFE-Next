import { useState, useEffect } from "react";
import { fetchImg } from "../../api/binarize/route";

export default function RenderImg(props) {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        const getImage = async () => {
            const src = await fetchImg(props.filename);
            setImgSrc(src);
        };

        // Call the getImage function inside useEffect
        getImage();
    }, [props.filename]); // Dependency on filename

    return (
        <div>
            {imgSrc ? <img src={imgSrc} alt={props.filename} /> : <p>Loading image...</p>}
        </div>
    );
}