import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

function ContactSection({ handleContactClick }) {
  return (
    <div id="contact" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(2.1rem, 4vw, 3rem)",
            textAlign: "center",
            marginBottom: "0.6rem",
            fontWeight: 700,
            letterSpacing: "-2px",
            color: "#F9FAFB",
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.9)",
          }}
        >
          Contact
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#E5E7EB",
            fontSize: "0.95rem",
            marginBottom: "2.5rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Pit
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        {[
          {
            type: "email",
            icon: <Mail size={40} />,
            title: "Email",
            text: "mohammedsaifakkiwat@gmail.com",
          },
          {
            type: "link",
            icon: <Linkedin size={40} />,
            title: "LinkedIn",
            text: "mohammed-saif-akkiwat",
            href: "https://www.linkedin.com/in/mohammed-saif-akkiwat",
          },
          {
            type: "link",
            icon: <Github size={40} />,
            title: "GitHub",
            text: "MohammedSaifAkkiwat",
            href: "https://github.com/MohammedSaifAkkiwat",
          },
        ].map((contact, i) =>
          contact.type === "email" ? (
            <motion.button
              key={i}
              onClick={handleContactClick}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -8,
                borderColor: "#60A5FA",
                boxShadow: "0 20px 60px rgba(96, 165, 250, 0.3)",
              }}
              style={{
                background: "rgba(17, 24, 39, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                borderRadius: "16px",
                padding: "2.4rem 2rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            >
              <div style={{ color: "#9CA3AF" }}>{contact.icon}</div>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#F9FAFB",
                }}
              >
                {contact.title}
              </h3>
              <p
                style={{
                  color: "#D1D5DB",
                  fontSize: "0.9rem",
                  wordBreak: "break-word",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {contact.text}
              </p>
            </motion.button>
          ) : (
            <motion.a
              key={i}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -8,
                borderColor: "#60A5FA",
                boxShadow: "0 20px 60px rgba(96, 165, 250, 0.3)",
              }}
              style={{
                background: "rgba(17, 24, 39, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                borderRadius: "16px",
                padding: "2.4rem 2rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                transition: "all 0.3s",
              }}
            >
              <div style={{ color: "#9CA3AF" }}>{contact.icon}</div>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#F9FAFB",
                }}
              >
                {contact.title}
              </h3>
              <p
                style={{
                  color: "#D1D5DB",
                  fontSize: "0.9rem",
                  wordBreak: "break-word",
                  fontFamily: "'Courier New', 'monospace'",
                }}
              >
                {contact.text}
              </p>
            </motion.a>
          )
        )}
      </div>

      <div style={{ textAlign: "center", padding: "2.5rem 0 1.5rem" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            color: "#D1D5DB",
            marginBottom: "1.8rem",
            fontWeight: 500,
          }}
        >
          Lights out and away we go? 🏎
        </motion.p>
        <motion.button
          onClick={handleContactClick}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1.1rem 2.8rem",
            background: "#E5E7EB",
            color: "#111827",
            border: "none",
            borderRadius: "10px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontSize: "0.95rem",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          <Mail size={22} />
          Hit it
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          padding: "1.8rem 0 0.8rem",
          borderTop: "1px solid rgba(75, 85, 99, 0.3)",
          marginTop: "2.5rem",
        }}
      >
        <p
          style={{
            color: "#6B7280",
            fontSize: "0.85rem",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.5px",
          }}
        >
          © 2025 Mohammed Saif. Built with React & Framer Motion
        </p>
        <p
          style={{
            color: "#4B5563",
            fontSize: "0.75rem",
            fontFamily: "'Courier New', monospace",
            marginTop: "0.5rem",
            fontStyle: "italic",
          }}
        >
          Designed with passion & love. 🎨️
        </p>
      </motion.div>
    </div>
  );
}

export default ContactSection;
