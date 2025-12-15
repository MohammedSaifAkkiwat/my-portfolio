// applayout.jsx — FULL FIXED VERSION (NO BLANK SCREEN)

import React, { useState, useEffect } from "react";

/* ===== CONTEXTS ===== */
import { useTheme } from "../../contexts/ThemeContext";
import { useBackground } from "../../contexts/BackgroundContext";
import { useSound } from "../../contexts/SoundContext";

/* ===== SHARED UI ===== */
import ScrollProgressBar from "../common/ScrollProgressBar";
import CursorFollower from "../cursor/CursorFollower";
import CursorParticles from "../cursor/CursorParticles";
import BackgroundSwitchButton from "../background/BackgroundSwitchButton";
import {
  ShortcutsOverlay,
  ShortcutsHintPill,
} from "../shortcuts/ShortcutsUI";

/* ===== SECTIONS ===== */
import HeroSection from "../sections/HeroSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ResumeSection, { ResumeModal } from "../sections/ResumeSection";
import ContactSection from "../sections/ContactSection";

/* ===== LAYOUT / UTIL ===== */
import { MiniHudNav, SectionWrapper } from "./LayoutHelpers";
import useKeyboardShortcuts from "../shortcuts/useKeyboardShortcuts";

/* ===== OVERLAYS ===== */
import {
  EasterEggOverlay,
  OnboardingOverlay,
  AudioControls,
  SaifCompanion,
} from "../overlays/SystemOverlays";

/* ==================== APP LAYOUT ==================== */

function AppLayout({
  skills,
  projects,
  scrollToContact,
  handleContactClick,
  resumeUrl,
}) {
  const { cycleBackground } = useBackground();
  const theme = useTheme() || {};
  const { isLowPower, prefersReducedMotion } = theme;

  const sound = useSound() || {};
  const { playChime, setMuted } = sound;

  const [showShortcuts, setShowShortcuts] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showResume, setShowResume] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [hyperdrive, setHyperdrive] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      return localStorage.getItem("seenOnboard") !== "true";
    } catch {
      return true;
    }
  });

  /* ===== MOBILE DETECTION (FIX) ===== */
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  /* ===== Hyperdrive body class ===== */
  useEffect(() => {
    const body = document.body;
    if (hyperdrive) body.classList.add("hyperdrive");
    else body.classList.remove("hyperdrive");
  }, [hyperdrive]);

  /* ===== Scroll Spy ===== */
  useEffect(() => {
    const ids = ["hero", "skills", "projects", "resume", "contact"];
    const container = document.getElementById("top") || window;

    const onScroll = () => {
      let closest = "hero";
      let min = Infinity;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
        if (d < min) {
          min = d;
          closest = id;
        }
      });

      setActiveSection(closest);
    };

    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ===== Keyboard Shortcuts ===== */
  useKeyboardShortcuts({
    cycleBackground,
    setShowShortcuts,
    setFocusMode,
    setShowResume,
    setShowEasterEgg,
    setHyperdrive,
    setMuted,
    playChime,
  });

  /* ===== Cursor (DISABLED ON MOBILE) ===== */
  const shouldShowCursor =
    !isLowPower &&
    !prefersReducedMotion &&
    typeof window !== "undefined" &&
    !isMobile;

  const snapshotText = projects
    .map(
      (p) =>
        `${p.title} (${p.date})\n${p.description}\n${p.achievements.join(
          "\n"
        )}\n`
    )
    .join("\n");

  return (
    <>
      <ScrollProgressBar />

      <MiniHudNav
        activeSection={activeSection}
        onNavClick={(id) =>
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* ===== SHORTCUT UI (DESKTOP ONLY) ===== */}
      {!isMobile && <ShortcutsHintPill />}
      {!isMobile && (
        <ShortcutsOverlay
          open={showShortcuts}
          onClose={() => setShowShortcuts(false)}
        />
      )}

      {shouldShowCursor && <CursorFollower />}
      {shouldShowCursor && <CursorParticles enabled />}

      <ResumeModal
        open={showResume}
        onClose={() => setShowResume(false)}
        resumeUrl={resumeUrl}
        snapshotText={snapshotText}
      />

      <EasterEggOverlay
        open={showEasterEgg}
        onClose={() => setShowEasterEgg(false)}
      />

      {showOnboarding && (
        <OnboardingOverlay onClose={() => setShowOnboarding(false)} />
      )}

      <div id="top">
        <SectionWrapper
          id="hero"
          focusMode={focusMode}
          activeSection={activeSection}
        >
          <HeroSection
            scrollToContact={scrollToContact}
            handleContactClick={handleContactClick}
          />
        </SectionWrapper>

        <SectionWrapper
          id="skills"
          focusMode={focusMode}
          activeSection={activeSection}
        >
          <SkillsSection skills={skills} />
        </SectionWrapper>

        <SectionWrapper
          id="projects"
          focusMode={focusMode}
          activeSection={activeSection}
        >
          <ProjectsSection projects={projects} />
        </SectionWrapper>

        <SectionWrapper
          id="resume"
          focusMode={focusMode}
          activeSection={activeSection}
        >
          <ResumeSection
            onViewResume={() => setShowResume(true)}
            resumeUrl={resumeUrl}
            projects={projects}
          />
        </SectionWrapper>

        <SectionWrapper
          id="contact"
          focusMode={focusMode}
          activeSection={activeSection}
        >
          <ContactSection handleContactClick={handleContactClick} />
        </SectionWrapper>
      </div>

      <AudioControls />
      <SaifCompanion />
      <BackgroundSwitchButton />
    </>
  );
}

export default AppLayout;
