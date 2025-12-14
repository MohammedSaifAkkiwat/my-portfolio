import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Typewriter({
  phrases = [
    "AI Explorer 🤖",
    "GP-2 Prompt Engineer💬",
    "Chai Premi ☕",
    "Family Chauffeur 🏎️",
    "Scroll Addict 📱",
    "Pull-Up Bar Friendly 🤸",
  ],
}) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText((t) => currentPhrase.substring(0, t.length + 1));
        if (text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setText((t) => currentPhrase.substring(0, t.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setPhraseIndex((p) => (p + 1) % phrases.length);
        }
      }
    }, isDeleting ? 45 : 110);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, phraseIndex, phrases]);

  return (
    <motion.p
      style={{
        fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
        color: "#E5E7EB",
        fontFamily: "'Courier New', monospace",
        minHeight: "2rem",
        marginBottom: "1.5rem",
        fontWeight: 700,
        letterSpacing: "1px",
        textShadow: "0 2px 10px rgba(0,0,0,0.8)",
      }}
    >
      {text}
      <span style={{ opacity: 0.75, animation: "blink 1s infinite" }}>|</span>
    </motion.p>
  );
}
