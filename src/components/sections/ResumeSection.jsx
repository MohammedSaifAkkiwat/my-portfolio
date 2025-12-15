import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

function ResumeModal({ open, onClose, resumeUrl, snapshotText }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "960px",
          height: "80vh",
          background:
            "linear-gradient(90deg, var(--bg-main, #020617), rgba(30,64,175,0.08))",
          borderRadius: "18px",
          border: "1px solid rgba(148,163,184,0.4)",
          boxShadow: "0 30px 80px rgba(15,23,42,1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "0.9rem 1.4rem",
            borderBottom: "1px solid rgba(55, 65, 81, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background:
              "linear-gradient(90deg, rgba(15,23,42,1), rgba(30,64,175,0.8))",
          }}
        >
          <span
            style={{
              color: "#E5E7EB",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Resume Preview
          </span>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              color: "#E5E7EB",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.25rem",
              borderRadius: "999px",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, background: "var(--bg-main, #020617)", padding: 18, overflow: "auto" }}>
          {resumeUrl ? (
            <iframe
              src={resumeUrl}
              title="Resume"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                minHeight: 400,
              }}
            />
          ) : (
            <div style={{ color: "#D1D5DB", lineHeight: 1.6 }}>
              <h3 style={{ color: "#F9FAFB" }}>No resume file found</h3>
              <p>
                You don't have a resume file uploaded. Below is a quick snapshot
                of your projects and highlights that recruiters can preview.
              </p>
              <pre
                style={{
                  marginTop: 12,
                  background: "rgba(12,14,16,0.6)",
                  padding: 12,
                  borderRadius: 8,
                  overflowX: "auto",
                  color: "#E5E7EB",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {snapshotText || "No snapshot available."}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResumeSection({ onViewResume, resumeUrl, projects }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  return (
    <section
      id="resume"
      style={{
        padding: "4rem 2rem 2rem",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{ perspective: "1500px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          onTouchMove={handleMouseMove}
          onTouchStart={handleMouseMove}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              borderRadius: "18px",
              border: "1px solid rgba(75, 85, 99, 0.6)",
              padding: "2.5rem",
              backdropFilter: "blur(12px)",
              boxShadow: "0 25px 60px rgba(15,23,42,0.9)",
              transformStyle: "preserve-3d",
            }}
          >
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.85rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#9CA3AF",
                marginBottom: "0.8rem",
                textAlign: "center",
              }}
            >
              Dossier
            </p>
            <h2
              style={{
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(2rem, 5vw, 2.7rem)",
                fontWeight: 700,
                letterSpacing: "-1px",
                color: "#F9FAFB",
                marginBottom: "1.5rem",
              }}
            >
              Resume & Snapshot
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "#E5E7EB",
                fontSize: "0.98rem",
                lineHeight: 1.8,
                maxWidth: "680px",
                margin: "0 auto 2rem",
              }}
            >
              A one-page snapshot of my work — projects, skills, and experiences
              distilled for recruiters, founders, and team leads who want
              signal without the noise.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <motion.button
                onClick={onViewResume}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.9rem 1.9rem",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background:
                    "linear-gradient(135deg, #e5e7eb, #f9fafb, #d1d5db)",
                  color: "#020617",
                }}
              >
                View Resume
              </motion.button>

              <SnapshotDownloadButton projects={projects} resumeUrl={resumeUrl} />
            </div>

            <p
              style={{
                marginTop: "1.7rem",
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#9CA3AF",
                fontFamily: "'Courier New', monospace",
              }}
            >
              Pro tip: Press <strong>F</strong> for focus mode while skimming.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// smart resume snapshot downloader fallback
function SnapshotDownloadButton({ projects = [], resumeUrl }) {
  const generateSnapshotText = () => {
    if (resumeUrl) return null;
    const lines = [];
    lines.push("Mohammed Saif - Snapshot");
    lines.push("");
    projects.forEach((p) => {
      lines.push(`${p.title} (${p.date})`);
      lines.push(p.description);
      lines.push("Achievements:");
      p.achievements.forEach((a, i) => lines.push(`  - ${a}`));
      lines.push("Tech: " + p.tags.join(", "));
      lines.push("");
    });
    return lines.join("\n");
  };

  const handleDownload = async () => {
    // CASE 1: Resume PDF exists → force download
    if (resumeUrl) {
      try {
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = "Mohammed_Saif_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (e) {
        console.error("Resume download failed:", e);
      }
      return;
    }

    // CASE 2: No PDF → download snapshot text
    const text = generateSnapshotText();
    if (!text) return;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Mohammed_Saif_Resume_Snapshot.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };


  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.9rem 1.9rem",
        borderRadius: "999px",
        border: "1px solid rgba(148,163,184,0.7)",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "0.9rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        background: "rgba(15,23,42,0.8)",
        color: "#E5E7EB",
      }}
    >
      {resumeUrl ? "Download PDF" : "Download Snapshot"}
    </motion.button>
  );
}

export { ResumeModal };
export default ResumeSection;
