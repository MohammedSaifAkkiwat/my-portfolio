// src/contexts/SoundContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SoundContext = createContext(null);

function SoundProvider({ children }) {
  const soundsRef = useRef(null);

  if (!soundsRef.current) {
    const safeCreate = (src) => {
      try {
        const a = new Audio(src);
        a.preload = "auto";
        a.volume = 0.5;
        return a;
      } catch {
        return null;
      }
    };

    const keyAudio = safeCreate("/sounds/keyboard.mp3");
    const clickAudio = safeCreate("/sounds/click.mp3");
    const chime = safeCreate("/sounds/chime.mp3");
    const whoosh = safeCreate("/sounds/whoosh.mp3");

    if (keyAudio) try { keyAudio.volume = 0.35; } catch {}
    if (clickAudio) try { clickAudio.volume = 0.5; } catch {}
    if (chime) try { chime.volume = 0.45; } catch {}
    if (whoosh) try { whoosh.volume = 0.55; } catch {}

    soundsRef.current = {
      key: keyAudio,
      click: clickAudio,
      chime,
      whoosh,
    };
  }

  const sounds = soundsRef.current;

  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("siteMuted") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("siteMuted", muted ? "true" : "false");
    } catch {}
  }, [muted]);

  const play = (audio) => {
    if (muted || !audio) return;
    try {
      audio.currentTime = 0;
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});
    } catch {}
  };

  const playClick = () => play(sounds.click);
  const playKey = () => play(sounds.key);
  const playChime = () => play(sounds.chime);

  const playWhoosh = (() => {
    let last = 0;
    return () => {
      const now = Date.now();
      if (now - last < 120) return;
      last = now;
      play(sounds.whoosh);
    };
  })();

  useEffect(() => {
    let lastKeyTime = 0;

    const handleKeydown = (e) => {
      const now = Date.now();
      if (now - lastKeyTime < 80) return;
      lastKeyTime = now;

      const tag = e.target.tagName;
      const isTypingField =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        e.target.isContentEditable;

      if (isTypingField) return;
      playKey();
    };

    const handlePointerDown = () => {
      playClick();
    };

    document.addEventListener("keydown", handleKeydown, true);
    document.addEventListener("pointerdown", handlePointerDown, {
      capture: true,
      passive: true,
    });
    document.addEventListener("click", handlePointerDown, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener("keydown", handleKeydown, true);
      document.removeEventListener("pointerdown", handlePointerDown, {
        capture: true,
      });
      document.removeEventListener("click", handlePointerDown, {
        capture: true,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted, sounds]);

  return (
    <SoundContext.Provider
      value={{
        muted,
        setMuted,
        playClick,
        playKey,
        playChime,
        playWhoosh,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

function useSound() {
  return useContext(SoundContext);
}

export { SoundProvider, useSound };
