export default function TrackingOverlay({ point }) {
    if (!point) return null;

    // Accept either normalized coords (0..1) or raw pixel values, and optionally image size
    const isNormalized = point && typeof point.x === 'number' && typeof point.y === 'number' && point.x <= 1 && point.y <= 1;
    let left, top;
    if (isNormalized && point.imgSize && point.imgSize.width && point.imgSize.height) {
        // Use pixel values relative to the rendered image size
        left = `${point.x * point.imgSize.width}px`;
        top = `${point.y * point.imgSize.height}px`;
    } else if (isNormalized) {
        // fallback to percent if no size info
        left = `${(point.x * 100).toFixed(4)}%`;
        top = `${(point.y * 100).toFixed(4)}%`;
    } else {
        left = `${point.x}px`;
        top = `${point.y}px`;
    }
    // clamp size so overlay remains visible inside the container
    const size = 30;

    return (
        <div
            style={{
                position: "absolute",
                left,
                top,
                width: size,
                height: size,
                borderRadius: "50%",
                border: "3px solid red",
                boxShadow: "0 0 10px red",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                zIndex: 20
            }}
        />
    );
}
