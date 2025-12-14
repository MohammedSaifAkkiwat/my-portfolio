// src/contexts/ThemeContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

const themePresets = [
  {
    id: "race",
    label: "Race Day",
    accent: "#60a5fa",
    accentSoft: "rgba(96,165,250,0.18)",
    bg: "#020617",
    text: "#F9FAFB",
  },
  {
    id: "night",
    label: "Night Drive",
    accent: "#22d3ee",
    accentSoft: "rgba(34,211,238,0.18)",
    bg: "#020617",
    text: "#E5E7EB",
  },
  {
    id: "paper",
    label: "Paper Resume",
    accent: "#0f172a",
    accentSoft: "rgba(15,23,42,0.12)",
    bg: "#f3f4f6",
    text: "#0f172a",
  },
];

function ThemeProvider({ children }) {
  const [themeIndex, setThemeIndexRaw] = useState(() => {
    try {
      const saved = localStorage.getItem("siteThemeIndex");
      if (saved != null) {
        const n = Number(saved);
        if (!Number.isNaN(n) && n >= 0 && n < themePresets.length) return n;
      }
    } catch {}
    return 0;
  });

  const setThemeIndex = (i) => {
    setThemeIndexRaw((prev) => {
      const next = typeof i === "function" ? i(prev) : i;
      try {
        localStorage.setItem("siteThemeIndex", String(next));
      } catch {}
      return next;
    });
  };

  const theme = themePresets[themeIndex];

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themePresets.length);
  };

  const setThemeById = (id) => {
    const idx = themePresets.findIndex((t) => t.id === id);
    if (idx >= 0) setThemeIndex(idx);
  };

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPower] = useState(() => {
    if (typeof window === "undefined") return false;
    const dm = navigator.deviceMemory || 8;
    const width = window.innerWidth || 1440;
    return dm <= 4 || width <= 900;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    themePresets.forEach((t) => body.classList.remove(`theme-${t.id}`));
    body.classList.add(`theme-${theme.id}`);
    body.style.setProperty("--accent", theme.accent);
    body.style.setProperty("--accent-soft", theme.accentSoft);
    body.style.setProperty("--bg-main", theme.bg);
    body.style.setProperty("--text-main", theme.text);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeIndex,
        cycleTheme,
        setThemeIndex,
        setThemeById,
        prefersReducedMotion,
        isLowPower,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeToggle() {
  const { themeIndex, cycleTheme, isLowPower } = useTheme() || {};
  const label =
    themeIndex === 0
      ? "Race (dark)"
      : themeIndex === 1
      ? "Night"
      : "Paper (light)";

  return (
    <button
      aria-label={`Toggle theme (current: ${label})`}
      onClick={() => cycleTheme && cycleTheme()}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1.25rem",
        zIndex: 170,
        padding: "0.45rem 0.7rem",
        borderRadius: 10,
        border: "1px solid rgba(148,163,184,0.12)",
        background: "rgba(15,23,42,0.78)",
        color: "#E5E7EB",
        cursor: isLowPower ? "default" : "pointer",
        fontSize: 13,
      }}
    >
      {themeIndex === 2 ? "🌞 Light" : themeIndex === 1 ? "🌙 Night" : "🌌 Dark"}
    </button>
  );
}

export { ThemeProvider, useTheme, ThemeToggle };
