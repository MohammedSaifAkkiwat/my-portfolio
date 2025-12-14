import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function MiniHudNav({ activeSection, onNavClick }) {
  const items = [
    { id: "hero", label: "Hero" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const prevActiveRef = useRef(activeSection);

  useEffect(() => {
    prevActiveRef.current = activeSection;
  }, [activeSection]);

  return (
    <nav
      aria-label="Quick navigation"
      style={{
        position: "fixed",
        left: "1.2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 58,
        padding: "0.5rem",
        borderRadius: "12px",
        background: "rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center",
        backdropFilter: "blur(8px)",
        boxShadow: "0 12px 35px rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.08)",
      }}
    >
      {items.map((item) => {
        const active = activeSection === item.id;
        const justActivated = prevActiveRef.current !== item.id && active;
        return (
          <motion.button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            aria-pressed={active}
            title={item.label}
            animate={
              justActivated
                ? {
                  scale: [1, 1.16, 1],
                  boxShadow: [
                    "0 0 0 rgba(0,0,0,0)",
                    "0 10px 30px rgba(96,165,250,0.14)",
                    "0 0 0 rgba(0,0,0,0)",
                  ],
                }
                : {}
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              width: "3.6rem",
              height: "3.6rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.2rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: active ? "#0f172a" : "#E5E7EB",
              background: active
                ? "linear-gradient(135deg, #e5e7eb, #f9fafb)"
                : "rgba(15,23,42,0.6)",
              transition: "all 0.16s ease",
              boxShadow: active ? "0 6px 18px rgba(96,165,250,0.18)" : "none",
            }}
          >
            <span style={{ display: "block", textAlign: "center", width: "100%" }}>
              {item.label[0]}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}

function SectionWrapper({ id, focusMode, activeSection, children }) {
  const dim = focusMode && activeSection !== id;
  const transform = focusMode && !dim ? "scale(1.02)" : "none";
  const isSkills = id === "skills";

  return (
    <section
      id={id}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isSkills ? "2rem 1.5rem" : "3rem 1.5rem",
        transition:
          "opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease",
        opacity: dim ? 0.12 : 1,
        filter: dim ? "blur(3px) grayscale(0.6)" : "none",
        pointerEvents: dim ? "none" : "auto",
        transform,
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      <div style={{ width: "100%" }}>{children}</div>
    </section>
  );
}

export { MiniHudNav, SectionWrapper };
