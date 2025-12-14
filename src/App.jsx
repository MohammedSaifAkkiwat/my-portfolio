// app.jsx (updated: chat button offset + cursor particles tuned for modes)
import {
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Brain,
  Cpu,
  Zap,
  Terminal,
  Server,
  X,
} from "lucide-react";

import AppLayout from "./components/layouts/AppLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BackgroundProvider } from "./contexts/BackgroundContext";
import LoadingScreen from "./components/common/LoadingScreen";
import { SoundProvider, useSound } from "./contexts/SoundContext";

// ==================== MINI SECTION MAP (top-right clickable dots) ====================
function MiniSectionMap({ active, onNavigate }) {
  const ids = [
    { id: "hero", label: "Hero" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className="section-map"
      aria-hidden={false}
      title="Section map — click to jump"
      style={{
        position: "fixed",
        right: "1.25rem",
        top: "1.15rem",
        zIndex: 160,
        display: "flex",
        gap: 12,
        alignItems: "center",
        pointerEvents: "auto",
      }}
    >
      {ids.map((it) => {
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onNavigate(it.id)}
            aria-label={`Go to ${it.label}`}
            style={{
              width: isActive ? 14 : 10,
              height: isActive ? 14 : 10,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              background: isActive
                ? "linear-gradient(135deg,var(--accent,#60a5fa), #a78bfa)"
                : "rgba(255,255,255,0.04)",
              boxShadow: isActive ? "0 6px 20px rgba(96,165,250,0.18)" : "none",
              transform: isActive ? "translateY(-3px) scale(1.06)" : "none",
              transition: "all 220ms cubic-bezier(.2,.9,.2,1)",
              cursor: "pointer",
              display: "inline-block",
              padding: 0,
            }}
          />
        );
      })}
    </div>
  );
}

// ==================== MAIN APP ====================

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const skills = [
    {
      category: "Languages",
      icon: <Code2 size={36} />,
      items: ["Java", "Python", "JavaScript", "C/C++", "Solidity"],
    },
    {
      category: "AI & Machine Learning",
      icon: <Brain size={36} />,
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Keras"],
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud size={36} />,
      items: ["AWS", "Docker", "CI/CD", "Jenkins", "Git"],
    },
    {
      category: "Backend & Databases",
      icon: <Database size={36} />,
      items: ["Spring Boot", "FastAPI", "MongoDB", "SQL", "Redis"],
    },
    {
      category: "Frontend Development",
      icon: <Terminal size={36} />,
      items: ["React", "Node.js", "HTML/CSS", "Tailwind", "Next.js"],
    },
    {
      category: "Blockchain & Web3",
      icon: <Server size={36} />,
      items: ["Solidity", "Truffle", "Ganache", "Web3.py", "Hardhat"],
    },
  ];

  const projects = [
    {
      title: "Blockchain-Enhanced Framework for Malicious Client Detection",
      date: "July 2025 - Present",
      description:
        "Built a blockchain-powered framework for trust and malicious client detection in federated learning-based environments, achieving 93% detection accuracy.",
      icon: <Cpu size={52} />,
      tags: [
        "Solidity",
        "Python",
        "PyTorch",
        "Truffle",
        "Ganache",
        "FastAPI",
        "React",
        "Web3py",
      ],
      achievements: [
        "93% detection accuracy across multiple attack types",
        "Automated reputation system with smart contracts",
        "Real-time federated learning with 10+ clients",
      ],
    },
    {
      title: "AI Text Authenticity Detector",
      date: "Nov 2024 - Dec 2024",
      description:
        "Built a Flask web app achieving 92% accuracy in detecting AI-generated text using Scikit-learn and Pandas.",
      icon: <Brain size={52} />,
      tags: ["Python", "Flask", "Scikit-learn", "HTML", "CSS", "JavaScript", "Pandas"],
      achievements: [
        "92% accuracy in AI text detection",
        "80% reduction in release time via CI/CD",
        "Full-stack web application with modern UI",
      ],
    },
    {
      title: "Beneath the Waves: Coral Reef Analysis",
      date: "June 2024 - July 2024",
      description:
        "Developed CNN models (TensorFlow/Keras) with 95%+ accuracy in coral species recognition.",
      icon: <Zap size={52} />,
      tags: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "Pandas"],
      achievements: [
        "95%+ accuracy in coral species recognition",
        "70% reduction in manual effort",
        "50% faster turnaround time for analysis",
      ],
    },
  ];

  const resumeUrl = "/mohammed-saif-resume.pdf";

  const scrollToContact = () => {
    const container = document.getElementById("top");
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    const email = "mohammedsaifakkiwat@gmail.com";
    const subject = "Collaboration Opportunity — Software & AI";
    const body = `Hi Mohammed,\n\nI hope you're doing well.\n\nI'm reaching out to explore potential opportunities to collaborate or work together in the areas of software engineering, AI/ML, and blockchain.\n\nBrief intro:\n- Name:\n- Role / Organization:\n- What I'm looking for / proposing:\n\nHappy to share more details if you're interested.\n\nBest regards,\n`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const gmailWindow = window.open(gmailUrl, "_blank");
    if (!gmailWindow) {
      window.location.href = mailtoUrl;
    }
  };

  useEffect(() => {
    const loadingSteps = [
      { delay: 100, progress: 15, label: "Initializing..." },
      { delay: 300, progress: 35, label: "Loading assets..." },
      { delay: 500, progress: 60, label: "Preparing interface..." },
      { delay: 700, progress: 85, label: "Almost there..." },
      { delay: 900, progress: 100, label: "Ready!" },
    ];

    let currentStep = 0;
    const runStep = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setTimeout(() => {
          setLoadProgress(step.progress);
          currentStep++;
          runStep();
        }, step.delay);
      } else {
        setTimeout(() => setLoading(false), 300);
      }
    };

    runStep();

    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  if (loading) {
    return <LoadingScreen open={loading} />;
  }

  return (
    <ThemeProvider>
      <SoundProvider>
        <BackgroundProvider>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body, #root { height: 100%; }
            body {
              font-family: 'Inter', sans-serif;
              background: var(--bg-main, #0a0a0a);
              color: var(--text-main, #F9FAFB);
              overflow: hidden;
              height: 100%;
              transition: background 0.28s ease, color 0.28s ease;
            }
            #top {
              height: 100vh;
              overflow-y: auto;
              scroll-snap-type: y proximity;
              scroll-behavior: smooth;
              -webkit-overflow-scrolling: touch;
              padding-right: 8px;
              overscroll-behavior: contain;
            }
            @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

            .parallax-wrapper {
              position: fixed;
              inset: 0;
              background: radial-gradient(ellipse at bottom, var(--bg-main, #1B2735) 0%, #090A0F 100%);
              overflow: hidden;
              z-index: -1;
            }
            #stars, #stars2, #stars3 { position: absolute; top: 0; left: 0; background: transparent; }
            #stars { width: 1px; height: 1px; animation: animStar 50s linear infinite; }
            #stars2 { width: 2px; height: 2px; animation: animStar 100s linear infinite; }
            #stars3 { width: 3px; height: 3px; animation: animStar 150s linear infinite; }

            @keyframes animStar {
              from { transform: translateY(0); }
              to { transform: translateY(-2000px); }
            }

            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: var(--bg-main, #0a0a0a); }
            ::-webkit-scrollbar-thumb { background: #4B5563; border-radius: 4px; }
            ::selection { background: #4B5563; color: #F9FAFB; }

            body.hyperdrive {
              --accent: #22d3ee;
              --accent-soft: rgba(34,211,238,0.18);
              filter: saturate(1.08) contrast(1.04);
              transition: filter 0.35s ease;
            }
            body.hyperdrive .parallax-wrapper {
              transform: scale(1.03);
              filter: hue-rotate(10deg) brightness(1.06);
            }
            body.hyperdrive .cursor {
              transform: scale(1.25);
            }

            body.hyperdrive::before {
              content: "";
              position: fixed;
              inset: 0;
              background: radial-gradient(circle at 10% 10%, rgba(34,211,238,0.02), transparent 10%),
                          radial-gradient(circle at 90% 90%, rgba(167,139,250,0.02), transparent 10%);
              pointer-events: none;
              z-index: -1;
            }

            body.theme-paper .parallax-wrapper,
            body.theme-paper canvas { filter: brightness(1.05); }

            .magnetic {
              transform: translateY(-6px) scale(1.018);
              transition: transform 420ms cubic-bezier(.2,.9,.2,1), box-shadow 420ms ease;
              box-shadow: 0 30px 65px rgba(8,15,35,0.55), 0 8px 24px rgba(96,165,250,0.06);
              will-change: transform;
              z-index: 10;
            }

            .section-map button:hover {
              transform: translateY(-4px) scale(1.08);
              box-shadow: 0 12px 36px rgba(96,165,250,0.12);
            }

            @media (max-width: 640px) {
              .section-map { display: none; }
            }
          `}</style>

          <AppLayout
            skills={skills}
            projects={projects}
            scrollToContact={scrollToContact}
            handleContactClick={handleContactClick}
            resumeUrl={resumeUrl}
          />
        </BackgroundProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}
