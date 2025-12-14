import { useBackground } from "../../contexts/BackgroundContext";

export default function BackgroundSwitchButton() {
    const { mode, cycleBackground } = useBackground();

    const labelByMode = {
        parallax: "🌌 Parallax",
        glitch: "⚡ Glitch",
        space: "🪐 Space",
    };

    return (
        <button
            onClick={cycleBackground}
            style={{
                position: "fixed",
                bottom: "1.5rem",
                right: "1.5rem",
                zIndex: 100,
                padding: "0.5rem 1.1rem",
                borderRadius: "999px",
                background: "rgba(15,23,42,0.85)",
                border: "1px solid rgba(248,250,252,0.15)",
                color: "#E5E7EB",
                fontSize: "0.8rem",
                fontFamily: "'Inter', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                boxShadow: "0 10px 25px rgba(15,23,42,0.8)",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
                transition: "all 0.22s ease",
            }}
        >
            <span
                style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "999px",
                    background:
                        "radial-gradient(circle at 30% 30%, #e5e7eb, var(--accent, #60a5fa))",
                }}
            />
            <span>{labelByMode[mode] ?? "🪐 Shift"}</span>
        </button>
    );
}
