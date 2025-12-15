import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Flag } from "lucide-react";
import { useSound } from "../../contexts/SoundContext";

function ProjectCard({ project, index }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { playWhoosh } = useSound() || {};
  const lastPlayRef = useRef(0);

  const safePlayWhoosh = () => {
    try {
      const now = Date.now();
      if (now - lastPlayRef.current < 140) return;
      lastPlayRef.current = now;
      playWhoosh && playWhoosh();
    } catch { }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 8;
    setTilt({ x: -y * maxTilt, y: x * maxTilt });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      style={{ perspective: "1400px", height: 360 }}
      onMouseEnter={() => { setFlipped(true); safePlayWhoosh(); }}
      onMouseLeave={() => { setFlipped(false); setTilt({ x: 0, y: 0 }); safePlayWhoosh(); }}
      onMouseMove={handleMouseMove}
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
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "rgba(17,24,39,0.75)",
            border: "1px solid rgba(75,85,99,0.3)",
            borderRadius: 16,
            padding: "1.6rem",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <motion.div
            animate={{ rotate: flipped ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: "#9CA3AF" }}
          >
            {project.icon}
          </motion.div>

          <p style={{
            fontSize: "0.7rem",
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            fontFamily: "'Courier New', monospace",
            color: "#6B7280",
          }}>
            {project.date}
          </p>

          <h3 style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "#F9FAFB",
            lineHeight: 1.25,
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: "0.85rem",
            lineHeight: 1.55,
            color: "#D1D5DB",
            flex: 1,
          }}>
            {project.description}
          </p>

          <div style={{ textAlign: "center" }}>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                color: "#6B7280",
                fontFamily: "'Courier New', monospace",
              }}
            >
              <MousePointer2 size={14} />
              Explore
            </motion.div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(31,41,55,0.9)",
            border: "1px solid rgba(156,163,175,0.3)",
            borderRadius: 16,
            padding: "1.4rem",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <h4 style={{
            fontSize: "0.75rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#F9FAFB",
            fontWeight: 700,
          }}>
            Key Highlights
          </h4>

          <ul style={{
            fontSize: "0.8rem",
            color: "#D1D5DB",
            paddingLeft: "1.1rem",
            flex: 1,
          }}>
            {project.achievements.map((a, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{a}</li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.65rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: 6,
                  fontFamily: "'Courier New', monospace",
                  background: "rgba(209,213,219,0.1)",
                  border: "1px solid rgba(209,213,219,0.25)",
                  color: "#E5E7EB",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectsSection({ projects }) {
  const extendedProjects = [
    ...projects,
    {
      title: "F1 Racer Performance Manager – Backend API",
      date: "2025",
      description:
        "Spring Boot backend providing CRUD and analytics APIs for F1 racer performance insights.",
      icon: <Flag size={42} />,
      tags: ["Java", "Spring Boot", "JPA", "MySQL"],
      achievements: [
        "Designed REST APIs for racer analytics",
        "Optimized JPA queries for performance",
        "Processed 1000+ race records",
      ],
    },
  ];

  return (
    <div id="projects" style={{ maxWidth: 1200, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        <h2 style={{
          fontSize: "clamp(2rem,4vw,2.6rem)",
          fontWeight: 700,
          color: "#F9FAFB",
        }}>
          Project Showcase
        </h2>
        <p style={{
          marginTop: 6,
          fontSize: "0.8rem",
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "'Courier New', monospace",
          color: "#E5E7EB",
        }}>
          Stints
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
          gap: "1.4rem",
        }}
      >

        {extendedProjects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
