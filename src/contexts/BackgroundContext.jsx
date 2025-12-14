// src/contexts/BackgroundContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import ParallaxStars from "../components/background/ParallaxStars";
import LetterGlitch from "../components/background/LetterGlitch";
import SpaceBackground from "../components/background/SpaceBackground";

const BackgroundContext = createContext();

const backgroundModes = ["parallax", "glitch", "space"];

function BackgroundProvider({ children }) {
    const [modeIndex, setModeIndex] = useState(0);
    const themeCtx = useTheme() || {};
    const { isLowPower, prefersReducedMotion } = themeCtx;
    const enableHeavy = !(isLowPower || prefersReducedMotion);

    const cycleBackground = () => {
        setModeIndex((prev) => (prev + 1) % backgroundModes.length);
    };

    const currentIndex =
        !enableHeavy && modeIndex !== 0 ? 0 : modeIndex; // clamp to parallax if heavy disabled
    const mode = backgroundModes[currentIndex];

    const [lazyGlitchEnabled, setLazyGlitchEnabled] = useState(false);
    const [lazySpaceEnabled, setLazySpaceEnabled] = useState(false);

    useEffect(() => {
        const enableIfIdle = () => {
            if (mode === "glitch") setLazyGlitchEnabled(true);
            if (mode === "space") setLazySpaceEnabled(true);
        };
        if (typeof window !== "undefined") {
            if ("requestIdleCallback" in window) {
                requestIdleCallback(enableIfIdle, { timeout: 2000 });
            } else {
                const t = setTimeout(enableIfIdle, 1200);
                return () => clearTimeout(t);
            }
        }
    }, [mode]);

    return (
        <BackgroundContext.Provider value={{ mode, cycleBackground }}>
            <div className="fixed inset-0 -z-10">
                {mode === "parallax" && <ParallaxStars />}
                {mode === "glitch" && enableHeavy && lazyGlitchEnabled && (
                    <LetterGlitch />
                )}
                {mode === "space" && enableHeavy && lazySpaceEnabled && (
                    <SpaceBackground />
                )}
            </div>

            {children}
        </BackgroundContext.Provider>
    );
}

function useBackground() {
    return useContext(BackgroundContext);
}

export { BackgroundProvider, useBackground };
