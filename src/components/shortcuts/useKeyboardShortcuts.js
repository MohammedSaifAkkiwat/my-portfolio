import { useEffect, useRef } from "react";

const SECTIONS = ["hero", "skills", "projects", "resume", "contact"];

export default function useKeyboardShortcuts({
  cycleBackground,
  setShowShortcuts,
  setFocusMode,
  setShowResume,
  setShowEasterEgg,
  setHyperdrive,
  setMuted,
  playChime,
}) {
  const konamiBuffer = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const key = e.key.toLowerCase();

      /* ---------------- Konami (shortened) ---------------- */
      konamiBuffer.current.push(key);
      if (konamiBuffer.current.length > 6) konamiBuffer.current.shift();

      const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "b", "a"];

      if (KONAMI.every((k, i) => konamiBuffer.current[i] === k)) {
        setShowEasterEgg(true);
        konamiBuffer.current = [];
        playChime && playChime();
        return;
      }

      /* ---------------- Arrow navigation ---------------- */
      if (key === "arrowright" || key === "arrowleft") {
        const current = document
          .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
          ?.closest("[id]")?.id;

        const index = SECTIONS.indexOf(current);
        if (index === -1) return;

        const nextIndex =
          key === "arrowright"
            ? Math.min(index + 1, SECTIONS.length - 1)
            : Math.max(index - 1, 0);

        document
          .getElementById(SECTIONS[nextIndex])
          ?.scrollIntoView({ behavior: "smooth" });

        return;
      }

      /* ---------------- Other shortcuts ---------------- */
      switch (key) {
        case "?":
          setShowShortcuts((s) => !s);
          break;
        case "escape":
          setShowShortcuts(false);
          setFocusMode(false);
          setShowResume(false);
          setShowEasterEgg(false);
          break;
        case "b":
          cycleBackground();
          break;
        case "f":
          setFocusMode((f) => !f);
          break;
        case "t":
          setHyperdrive((h) => !h);
          break;
        case "m":
          setMuted && setMuted((m) => !m);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
