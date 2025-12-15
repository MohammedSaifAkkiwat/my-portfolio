import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import Typewriter from "../common/TypeWriter";

export default function HeroSection({ scrollToContact, handleContactClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        maxWidth: "1000px",
        textAlign: "center",
        zIndex: 1,
        margin: "0 auto",
      }}
    >
      <motion.div
        style={{
          display: "inline-block",
          padding: "0.6rem 1.8rem",
          background: "rgba(75, 85, 99, 0.2)",
          border: "1px solid rgba(156, 163, 175, 0.2)",
          borderRadius: "50px",
          marginBottom: "2.5rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <p
          style={{
            fontSize: "0.9rem",
            color: "#E5E7EB",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: 700,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Terminal
            size={16}
            style={{
              display: "inline",
              marginRight: "0.5rem",
              verticalAlign: "middle",
            }}
          />
          Software Engineer | AI/ML & Blockchain Enthusiast
        </p>
      </motion.div>

      <motion.h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2.5rem, 10vw, 5.5rem)",
          fontWeight: 700,
          marginBottom: "1.5rem",
          letterSpacing: "-3px",
          lineHeight: 1.1,
          color: "#F9FAFB",
          textShadow: "0 2px 20px rgba(0, 0, 0, 0.9)",
        }}
      >
        <span
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #d1d5db 40%, #9ca3af 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hi, I'm{" "}
        </span>
        <span
          style={{
            background:
              "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Mohammed Saif
        </span>
      </motion.h1>

      <Typewriter />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
          color: "#E5E7EB",
          marginBottom: "3rem",
          lineHeight: 1.9,
          maxWidth: "800px",
          marginInline: "auto",
          fontWeight: 500,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        Exploring AI and blockchain with a blend of curiosity, caffeine, and
        questionable life choices — learning, creating, and occasionally
        breaking things along the way.
      </motion.p>

      {/* Konami hint */}
      <div
        style={{
          marginBottom: "1rem",
          fontSize: "0.7rem",
          letterSpacing: "0.4em",
          opacity: 0.35,
          textAlign: "center",
          fontFamily: "'Courier New', monospace",
          userSelect: "none",
        }}
      >
        unlock SaifCLI: ↑ ↑ ↓ ↓ B A
      </div>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          display: "flex",
          gap: "1.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "3rem",
        }}
      >
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1.1rem 2.5rem",
            background: "#E5E7EB",
            color: "#111827",
            border: "none",
            borderRadius: "10px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "0.9rem",
            transition: "all 0.3s",
          }}
        >
          <Code2 size={20} />
          View Projects
        </motion.a>
        <motion.button
          onClick={scrollToContact}
          whileHover={{
            scale: 1.05,
            background: "rgba(96, 165, 250, 0.1)",
            borderColor: "#60A5FA",
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1.1rem 2.5rem",
            background: "transparent",
            border: "2px solid #6B7280",
            color: "#D1D5DB",
            borderRadius: "10px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "0.9rem",
            transition: "all 0.3s",
            cursor: "pointer",
          }}
        >
          <Mail size={20} />
          Get in Touch
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
      >
        {[
          {
            icon: <Github size={22} />,
            href: "https://github.com/MohammedSaifAkkiwat",
          },
          {
            icon: <Linkedin size={22} />,
            href: "https://www.linkedin.com/in/mohammed-saif-akkiwat",
          },
          { icon: <Mail size={22} />, onClick: handleContactClick },
        ].map((social, i) =>
          social.onClick ? (
            <motion.button
              key={i}
              onClick={social.onClick}
              whileHover={{
                scale: 1.2,
                y: -5,
                borderColor: "#60A5FA",
                boxShadow: "0 10px 30px rgba(96,165,250,0.3)",
              }}
              transition={{ duration: 0.2 }}
              style={{
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                border: "1px solid rgba(156, 163, 175, 0.3)",
                borderRadius: "50%",
                background: "rgba(75, 85, 99, 0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            >
              {social.icon}
            </motion.button>
          ) : (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.2,
                y: -5,
                borderColor: "#60A5FA",
                boxShadow: "0 10px 30px rgba(96,165,250,0.3)",
              }}
              transition={{ duration: 0.2 }}
              style={{
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                border: "1px solid rgba(156, 163, 175, 0.3)",
                borderRadius: "50%",
                background: "rgba(75, 85, 99, 0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s",
              }}
            >
              {social.icon}
            </motion.a>
          )
        )}
      </motion.div>
    </motion.div>
  );
}
