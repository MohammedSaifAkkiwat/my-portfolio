import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [pos, setPos] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: pos.x, y: pos.y, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "16px",
        height: "16px",
        borderRadius: "999px",
        pointerEvents: "none",
        zIndex: 65,
        transform: "translate(-50%, -50%)",
        border: "1px solid rgba(248,250,252,0.7)",
        boxShadow: "0 0 20px rgba(96,165,250,0.7)",
        background:
          "radial-gradient(circle at 30% 30%, #ffffff, #60a5fa 40%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
