export function TrackingOverlay({ point }) {
    if (!point) return null;

    // Accept either normalized coords (0..1) or raw pixel values.
    const isNormalized = point && typeof point.x === 'number' && typeof point.y === 'number' && point.x <= 1 && point.y <= 1;
    const left = isNormalized ? `${(point.x * 100).toFixed(4)}%` : `${point.x}px`;
    const top = isNormalized ? `${(point.y * 100).toFixed(4)}%` : `${point.y}px`;
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
