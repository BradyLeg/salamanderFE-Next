"use client"; // Add this directive at the very top

export function StatusCard(props) {

    // Function to handle URL update when the button is clicked
    const handleClick = () => {
        // Get the current URL (without the query string)
        const currentUrl = window.location.origin; // e.g., "http://localhost:3001"

        // Construct the new URL by appending the setURL value
        console.log("props.setURL:", props.setURL);
        const fullUrl = `results/${props.setURL}.csv`;
        const newUrl = `http://localhost:3000/${fullUrl}`;
        console.log("New URL:", newUrl);

        // Update the URL by navigating to the new URL
        window.location.href = newUrl; // This will redirect the page to the new URL
    };

    return (
        <div>
            {/* <button type="submit">“Process Video with These Settings</button> */}
            <p>{props.statusFE} </p>
            <button onClick={handleClick}> Download CSV </button>
        </div>
    );
}
