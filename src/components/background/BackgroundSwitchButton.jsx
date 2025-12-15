import { useEffect, useState } from "react";
import { useBackground } from "../../contexts/BackgroundContext";

export default function BackgroundSwitchButton() {
  const { mode, cycleBackground } = useBackground();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once on mount + on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const labelByMode = {
    parallax: "🌌 Parallax",
    glitch: "⚡ Glitch",
    space: "🪐 Space",
  };

  return (
    <button
      type="button"
      onClick={cycleBackground}
      aria-label="Change background"
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1.25rem",
        zIndex: 120,

        /* Touch-friendly sizing */
        padding: isMobile ? "0.7rem 0.9rem" : "0.5rem 1.1rem",
        minHeight: isMobile ? 44 : "auto",
        minWidth: isMobile ? 44 : "auto",

        borderRadius: "999px",
        background: "rgba(15,23,42,0.88)",
        border: "1px solid rgba(248,250,252,0.15)",
        color: "#E5E7EB",

        fontSize: "0.8rem",
        fontFamily: "'Inter', sans-serif",

        display: "flex",
        alignItems: "center",
        gap: isMobile ? 0 : "0.45rem",

        boxShadow: "0 10px 25px rgba(15,23,42,0.8)",
        backdropFilter: "blur(10px)",

        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",

        transition: "all 0.22s ease",
      }}
    >
      {/* Mode indicator dot */}
      <span
        style={{
          width: "0.55rem",
          height: "0.55rem",
          borderRadius: "999px",
          background:
            "radial-gradient(circle at 30% 30%, #e5e7eb, var(--accent, #60a5fa))",
          flexShrink: 0,
        }}
      />

      {/* Hide text label on mobile to keep UI clean */}
      {!isMobile && (
        <span>{labelByMode[mode] ?? "🪐 Shift"}</span>
      )}
    </button>
  );
}
