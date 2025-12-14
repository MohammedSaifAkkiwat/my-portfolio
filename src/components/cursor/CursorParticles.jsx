import { useEffect, useRef } from "react";
import { useBackground } from "../../contexts/BackgroundContext";

export default function CursorParticles({ enabled = true }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const { mode } = useBackground() || { mode: "parallax" };

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stopped = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawnParticle = (x, y, opts = {}) => {
      const accent =
        getComputedStyle(document.body).getPropertyValue("--accent") ||
        "#60a5fa";

      const base = {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 2 * (0.6 + Math.random() * 0.8),
        life: 24 + Math.random() * 20,
        color: accent.trim(),
        type: "dot",
        char: null,
      };

      particlesRef.current.push(Object.assign(base, opts));

      if (particlesRef.current.length > 80) {
        particlesRef.current.splice(
          0,
          particlesRef.current.length - 80
        );
      }
    };

    const letters =
      "ASDFGHJKL;ZXCVBNM,./qwertyuiop[]1234567890".split("");

    const animate = () => {
      if (stopped) return;

      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 1;

        const alpha = Math.max(0, Math.min(1, p.life / 36));

        if (p.type === "glyph") {
          ctx.save();
          ctx.globalAlpha = 0.08 * alpha;
          ctx.font = "12px 'Courier New', monospace";
          ctx.shadowBlur = 8 * alpha;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.fillText(
            p.char ||
              letters[Math.floor(Math.random() * letters.length)],
            p.x,
            p.y
          );
          ctx.restore();
        } else if (p.type === "star") {
          const size = Math.max(0.6, p.r * (0.7 + alpha * 0.3));
          ctx.save();
          ctx.globalAlpha = 0.12 * alpha;
          ctx.shadowBlur = 10 * alpha;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - size);
          ctx.lineTo(p.x + size * 0.4, p.y - size * 0.4);
          ctx.lineTo(p.x + size, p.y);
          ctx.lineTo(p.x + size * 0.4, p.y + size * 0.4);
          ctx.lineTo(p.x, p.y + size);
          ctx.lineTo(p.x - size * 0.4, p.y + size * 0.4);
          ctx.lineTo(p.x - size, p.y);
          ctx.lineTo(p.x - size * 0.4, p.y - size * 0.4);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.globalAlpha = 0.06 * alpha;
          ctx.shadowBlur = 6 * alpha;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.arc(
            p.x,
            p.y,
            Math.max(0.6, p.r * 0.6),
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        }
      });

      particlesRef.current = particlesRef.current.filter(
        (p) => p.life > 0
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handlePointer = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (mode === "glitch") {
        spawnParticle(x, y, {
          type: "glyph",
          char: letters[Math.floor(Math.random() * letters.length)],
        });
      } else if (mode === "space") {
        spawnParticle(x, y, {
          type: "star",
          color: "rgba(255,255,255,0.95)",
        });
      } else {
        spawnParticle(x, y);
      }
    };

    const handleTouch = (e) => {
      if (!e.touches?.length) return;
      const t = e.touches[0];
      handlePointer({ clientX: t.clientX, clientY: t.clientY });
    };

    window.addEventListener("mousemove", handlePointer, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("resize", resize);
    };
  }, [enabled, mode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 66,
        mixBlendMode: "screen",
      }}
    />
  );
}
