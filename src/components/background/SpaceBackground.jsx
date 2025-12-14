import { useEffect, useRef } from "react";

export default function SpaceBackground({ className = "" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let stopped = false;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const stars = [];
        const starCount = Math.min(
            250,
            Math.floor((window.innerWidth * window.innerHeight) / 20000)
        );

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: 0.3 + Math.random() * 0.7,
            });
        }

        const animate = () => {
            if (stopped) return;
            // use theme variable to slightly tint background
            const bodyBg = getComputedStyle(document.body).getPropertyValue(
                "--bg-main"
            ).trim();
            // fallback
            const bgAlpha = "rgba(11,11,15,0.08)";
            ctx.fillStyle = bgAlpha;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
                ctx.fill();

                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }

                star.opacity += (Math.random() - 0.5) * 0.02;
                star.opacity = Math.max(0.2, Math.min(1, star.opacity));
            });

            requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener("resize", resize);

        return () => {
            stopped = true;
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 w-full h-full z-0 ${className}`}
        />
    );
}

