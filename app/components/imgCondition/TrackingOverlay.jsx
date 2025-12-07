export function TrackingOverlay({ points }) {
    if (!points) return null;

    return (
        <>
            {points.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: p.x,
                        top: p.y,
                        width: 4,
                        height: 4,
                        background: "red",
                        borderRadius: "50%",
                        pointerEvents: "none",
                        transform: "translate(-50%, -50%)"
                    }}
                />
            ))}
        </>
    );
}
