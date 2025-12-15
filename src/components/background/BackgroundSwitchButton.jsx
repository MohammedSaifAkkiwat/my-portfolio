import { useEffect, useState } from "react";
import { useBackground } from "../../contexts/BackgroundContext";

export default function BackgroundSwitchButton() {
  const { mode, cycleBackground } = useBackground();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const labelByMode = {
    parallax: "🌌",
    glitch: "⚡",
    space: "🪐",
  };

  return (
    <button
      type="button"
      aria-label="Change background"
      onPointerDown={(e) => {
        e.preventDefault();
        cycleBackground();
      }}
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1.25rem",
        zIndex: 120,

        width: 44,
        height: 44,
        borderRadius: "999px",

        background: "rgba(15,23,42,0.88)",
        border: "1px solid rgba(248,250,252,0.15)",
        color: "#E5E7EB",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: 18,
        cursor: "pointer",

        boxShadow: "0 10px 25px rgba(15,23,42,0.8)",
        backdropFilter: "blur(10px)",

        pointerEvents: "auto",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {labelByMode[mode] ?? "🪐"}
    </button>
  );
}
