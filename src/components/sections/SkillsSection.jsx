import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSound } from "../../contexts/SoundContext";

const funFacts = {
  Languages: "Java powers 3 billion devices worldwide! ☕",
  "AI & Machine Learning": "Neural networks are inspired by the human brain! 🧠",
  "Cloud & DevOps": "AWS serves millions of customers in 190+ countries! ☁️",
  "Backend & Databases": "MongoDB stores over 50 trillion documents! 📊",
  "Frontend Development": "React is used by Facebook, Netflix & Instagram! ⚛️",
  "Blockchain & Web3": "Ethereum processes $12B+ daily transactions! ⛓️",
};

function SkillCard({ skillGroup, index }) {
  const [flipped, setFlipped] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { playWhoosh } = useSound() || {};
  const lastPlayRef = useRef(0);

  const safePlayWhoosh = () => {
    try {
      // throttle locally (avoid spam)
      const now = Date.now();
      if (now - lastPlayRef.current < 140) return;
      lastPlayRef.current = now;
      if (playWhoosh) playWhoosh();
    } catch { }
  };

  const handleMouseMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 8;
    const tiltX = -y * maxTilt;
    const tiltY = x * maxTilt;
    setTilt({ x: tiltX, y: tiltY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  useEffect(() => {
    let handler = null;
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      handler = (ev) => {
        if (Math.abs(ev.beta || 0) + Math.abs(ev.gamma || 0) > 2) {
          const tiltX = (ev.beta || 0) / 6;
          const tiltY = (ev.gamma || 0) / 6;
          setTilt({ x: tiltX, y: tiltY });
        }
      };
      window.addEventListener("deviceorientation", handler);
    }
    return () => {
      if (handler) window.removeEventListener("deviceorientation", handler);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: "1500px", height: "220px" }}
      onMouseEnter={() => {
        setFlipped(true);
        setBouncing(true);
        safePlayWhoosh();
      }}
      onMouseLeave={() => {
        setFlipped(false);
        setBouncing(false);
        resetTilt();
        safePlayWhoosh();
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseMove}
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: flipped ? 180 : 0,
          rotateX: tilt.x,
          rotateZ: tilt.y,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 16,
          mass: 0.5,
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "rgba(17, 24, 39, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(75, 85, 99, 0.3)",
            borderRadius: "16px",
            padding: "1.6rem",
            transition: "all 0.3s",
          }}
        >
          <motion.div
            animate={{
              y: bouncing ? [0, -15, 0] : 0,
              rotate: bouncing ? [0, 360] : 0,
            }}
            transition={{
              y: { repeat: bouncing ? Infinity : 0, duration: 0.6 },
              rotate: { duration: 0.6 },
            }}
            style={{ color: "#9CA3AF", marginBottom: "0.9rem" }}
          >
            {skillGroup.icon}
          </motion.div>

          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.15rem",
              marginBottom: "0.8rem",
              color: "#F9FAFB",
              fontWeight: 600,
              letterSpacing: "-0.5px",
            }}
          >
            {skillGroup.category}
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {skillGroup.items.slice(0, 5).map((item) => (
              <motion.span
                key={item}
                whileHover={{
                  scale: 1.15,
                  y: -5,
                  background:
                    "linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(192, 132, 252, 0.2))",
                  borderColor: "rgba(96, 165, 250, 0.5)",
                  boxShadow: "0 10px 30px rgba(96, 165, 250, 0.3)",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "rgba(156, 163, 175, 0.1)",
                  color: "#9CA3AF",
                  padding: "0.35rem 0.8rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontFamily: "'Courier New', monospace",
                  border: "1px solid rgba(156, 163, 175, 0.2)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "rgba(31, 41, 55, 0.85)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(156, 163, 175, 0.3)",
            borderRadius: "16px",
            padding: "1.4rem",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: "2.2rem", marginBottom: "0.7rem" }}
          >
            💡
          </motion.div>

          <h4
            style={{
              color: "#F9FAFB",
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              marginBottom: "0.6rem",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            Fun Fact!
          </h4>

          <p
            style={{
              color: "#D1D5DB",
              fontSize: "0.8rem",
              textAlign: "center",
              lineHeight: 1.5,
              marginBottom: "0.8rem",
            }}
          >
            {funFacts[skillGroup.category]}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.35rem",
              justifyContent: "center",
            }}
          >
            {skillGroup.items.map((item) => (
              <span
                key={item}
                style={{
                  background: "rgba(209, 213, 219, 0.1)",
                  color: "#D1D5DB",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "6px",
                  fontSize: "0.68rem",
                  fontFamily: "'Courier New', monospace",
                  border: "1px solid rgba(209, 213, 219, 0.2)",
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkillsSection({ skills }) {
  return (
    <section
      id="skills"
      style={{
        minHeight: "92vh",
        padding: "2rem 2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginTop: "-1.6rem" }}
        >
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              textAlign: "center",
              marginBottom: "0.8rem",
              fontWeight: 700,
              letterSpacing: "-2px",
              color: "#F9FAFB",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.9)",
            }}
          >
            Technical Arsenal
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#E5E7EB",
              fontSize: "1.02rem",
              marginBottom: "2.8rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            }}
          >
            Drivertrain
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.8rem",
            alignContent: "center",
          }}
        >
          {skills.map((skillGroup, index) => (
            <SkillCard
              key={skillGroup.category}
              skillGroup={skillGroup}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
