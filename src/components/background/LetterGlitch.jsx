import { useEffect, useRef } from "react";

export default function LetterGlitch({
  
    glitchColors = ["#3d5a80", "#4a6fa5", "#5b8fb9"],
    glitchSpeed = 40,
    variant = "full",
  }) {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const ctx = canvas.getContext("2d");
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
      const letters = Array.from(chars);
  
      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
  
      resize();
  
      const cols = Math.ceil(window.innerWidth / 12);
      const rows = Math.ceil(window.innerHeight / 24);
      let grid = Array.from({ length: cols * rows }, () => ({
        char: letters[Math.floor(Math.random() * letters.length)],
        color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
        glitchTimer: 20 + Math.random() * 40,
        opacity: 0.3 + Math.random() * 0.4,
      }));
  
      let animationId;
      const animate = () => {
        // compute background color from CSS var to blend with theme
        const bgVar = getComputedStyle(document.body).getPropertyValue(
          "--bg-main"
        );
        // fallback alpha masking
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 15px "Courier New", monospace';
        ctx.textBaseline = "top";
  
        grid.forEach((cell, i) => {
          const x = (i % cols) * 12;
          const y = Math.floor(i / cols) * 24;
  
          cell.glitchTimer--;
          if (cell.glitchTimer <= 0) {
            cell.char = letters[Math.floor(Math.random() * letters.length)];
            cell.color =
              glitchColors[Math.floor(Math.random() * glitchColors.length)];
            cell.glitchTimer = 20 + Math.random() * 40;
            cell.opacity = 0.4 + Math.random() * 0.5;
          }
  
          ctx.globalAlpha = cell.opacity;
          ctx.fillStyle = cell.color;
          ctx.fillText(cell.char, x, y);
        });
  
        ctx.globalAlpha = 1;
        setTimeout(() => {
          animationId = requestAnimationFrame(animate);
        }, glitchSpeed);
      };
  
      animate();
      window.addEventListener("resize", resize);
  
      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationId);
      };
    }, [glitchSpeed, glitchColors]);
  
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundColor: "transparent",
          pointerEvents: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }
