import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("top") || window;

    const handleScroll = () => {
      const scrollTop =
        container === window
          ? window.scrollY
          : container.scrollTop;

      const scrollHeight =
        container === window
          ? document.documentElement.scrollHeight - window.innerHeight
          : container.scrollHeight - container.clientHeight;

      const pct =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setProgress(pct);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${progress}%`,
        background:
          "linear-gradient(90deg, #60a5fa, #a78bfa, #f97316)",
        zIndex: 200,
        transition: "width 0.15s ease-out",
      }}
    />
  );
}
