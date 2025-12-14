import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useSound } from "../../contexts/SoundContext";

export function EasterEggOverlay({ open, onClose }) {
  const [lines, setLines] = useState([
    "$ developer-mode --unlock",
    "Authenticating...",
    "Identity verified.",
    "Welcome back, engineer.",
    "Type `help` to begin.",
  ]);

  const [input, setInput] = useState("");
  const [mode, setMode] = useState("cli"); // cli | typing | snake
  const [devUnlocked, setDevUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem("devMode") === "true";
    } catch {
      return false;
    }
  });

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  /* ================= AUTO FOCUS ================= */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
      try {
        sessionStorage.setItem("devMode", "true");
        setDevUnlocked(true);
      } catch {}
    }
  }, [open]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  if (!open) return null;

  const append = (text) =>
    setLines((l) => [...l, typeof text === "string" ? text : String(text)]);

  const clear = () => setLines([]);

  /* ================= TYPING GAME ================= */
  const startTypingGame = () => {
    setMode("typing");
    clear();
    append("Typing challenge initiated.");
    append("Type the following line exactly:");
    append("");
    append("> Deploying smart contracts requires precision and gas awareness.");
  };

  /* ================= SNAKE GAME ================= */
  const startSnakeGame = () => {
    setMode("snake");
    clear();
    append("🐍 Snake initialized.");
    append("Use Arrow Keys to move.");
    append("Press `exit` to quit game.");
  };

  /* ================= COMMAND HANDLER ================= */
  const runCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim().toLowerCase();
    append(`$ ${cmdRaw}`);

    if (!cmd) return;

    switch (cmd) {
      case "help":
        append("Available commands:");
        append("- whoami");
        append("- projects");
        append("- skills");
        append("- guess");
        append("- type-test");
        append("- snake");
        append("- clear");
        append("- exit");
        break;

      case "whoami":
        append("Mohammed Saif");
        append("Software Engineer | AI/ML | Blockchain");
        append("Status: curious. caffeinated.");
        break;

      case "projects":
        append("1. Blockchain FL Security Framework");
        append("2. AI Text Authenticity Detector");
        append("3. Coral Reef Analysis (CNN)");
        append("Hint: recruiters love #1");
        break;

      case "skills":
        append("Java · Python · React · Spring Boot");
        append("AI/ML · Blockchain · Systems");
        break;

      case "guess":
        append("Guess the stack:");
        append("I power smart contracts.");
        append("A) Python  B) Java  C) Solidity");
        append("Type: answer c");
        break;

      case "answer c":
        append("Correct.");
        append("You know your chains.");
        break;

      case "type-test":
        startTypingGame();
        break;

      case "snake":
        startSnakeGame();
        break;

      case "clear":
        clear();
        break;

      case "exit":
        append("Exiting developer mode...");
        setTimeout(onClose, 400);
        break;

      default:
        append(`command not found: ${cmd}`);
    }
  };

  /* ================= INPUT SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "cli") {
      runCommand(input);
    }

    if (mode === "typing") {
      if (
        input.trim() ===
        "Deploying smart contracts requires precision and gas awareness."
      ) {
        append("Perfect execution.");
        append("Typing speed: acceptable 😄");
        append("Developer instincts confirmed.");
        setMode("cli");
      } else {
        append("Mismatch detected. Try again.");
      }
    }

    setInput("");
  };

  /* ================= SNAKE RENDER ================= */
  const SnakeGame = () => {
    const size = 12;
    const grid = 20;

    const [snake, setSnake] = useState([[10, 10]]);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, -1]);
    const [score, setScore] = useState(0);
    const highScore =
      Number(localStorage.getItem("snakeHighScore")) || 0;

    useEffect(() => {
      const onKey = (e) => {
        if (e.key === "ArrowUp") setDir([0, -1]);
        if (e.key === "ArrowDown") setDir([0, 1]);
        if (e.key === "ArrowLeft") setDir([-1, 0]);
        if (e.key === "ArrowRight") setDir([1, 0]);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
      const tick = setInterval(() => {
        setSnake((s) => {
          const head = [
            s[0][0] + dir[0],
            s[0][1] + dir[1],
          ];

          if (
            head[0] < 0 ||
            head[1] < 0 ||
            head[0] >= grid ||
            head[1] >= grid ||
            s.some((p) => p[0] === head[0] && p[1] === head[1])
          ) {
            append(`Game over. Score: ${score}`);
            localStorage.setItem(
              "snakeHighScore",
              Math.max(score, highScore)
            );
            setMode("cli");
            return s;
          }

          const next = [head, ...s];

          if (head[0] === food[0] && head[1] === food[1]) {
            setScore((v) => v + 1);
            setFood([
              Math.floor(Math.random() * grid),
              Math.floor(Math.random() * grid),
            ]);
          } else {
            next.pop();
          }

          return next;
        });
      }, 120);

      return () => clearInterval(tick);
    }, [dir, food, score, highScore]);

    return (
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, marginBottom: 6 }}>
          Score: {score} | High Score: {highScore}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid}, ${size}px)`,
            gap: 1,
          }}
        >
          {Array.from({ length: grid * grid }).map((_, i) => {
            const x = i % grid;
            const y = Math.floor(i / grid);
            const isSnake = snake.some(
              (s) => s[0] === x && s[1] === y
            );
            const isFood = food[0] === x && food[1] === y;

            return (
              <div
                key={i}
                style={{
                  width: size,
                  height: size,
                  background: isSnake
                    ? "#60A5FA"
                    : isFood
                    ? "#A78BFA"
                    : "rgba(255,255,255,0.05)",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  /* ================= UI ================= */
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(2,6,23,0.75)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 92vw)",
          borderRadius: 14,
          background: "#020617",
          border: "1px solid rgba(148,163,184,0.15)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.85)",
          padding: 16,
          fontFamily: "'Courier New', monospace",
          color: "#E5E7EB",
        }}
      >
        <div
          style={{
            maxHeight: 360,
            overflowY: "auto",
            fontSize: 13,
            lineHeight: 1.6,
            marginBottom: 12,
            whiteSpace: "pre-wrap",
          }}
        >
          {lines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          <div ref={bottomRef} />
        </div>

        {mode === "snake" && <SnakeGame />}

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
          <span>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#E5E7EB",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
            }}
            autoComplete="off"
          />
        </form>

        {devUnlocked && (
          <div style={{ marginTop: 10, fontSize: 11, color: "#60A5FA" }}>
            Developer Mode Enabled — session unlocked
          </div>
        )}
      </div>
    </div>
  );
}

export function OnboardingOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: "1.2rem",
        zIndex: 70,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 760,
          padding: "0.8rem 1rem",
          borderRadius: 999,
          background: "rgba(15,23,42,0.9)",
          border: "1px solid rgba(148,163,184,0.12)",
          color: "#E5E7EB",
          display: "flex",
          gap: 12,
          alignItems: "center",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "0 12px 40px rgba(2,6,23,0.6)",
        }}
      >
        <div style={{ fontFamily: "'Courier New', monospace", color: "#9CA3AF" }}>Shortcuts</div>
        <div style={{ flex: 1, fontSize: 14 }}>
          Press <strong>?</strong> for keyboard help · Press <strong>T</strong> to toggle Hyperdrive (night) · Arrow keys jump sections.
        </div>
        <button
          onClick={onClose}
          style={{
            padding: "0.45rem 0.8rem",
            borderRadius: 999,
            background: "rgba(96,165,250,0.12)",
            border: "1px solid rgba(96,165,250,0.18)",
            color: "#E5E7EB",
            cursor: "pointer",
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export function AudioControls() {
  const sound = useSound() || {};
  const { muted = false, setMuted = () => { } } = sound;
  const toggleMute = () => setMuted((m) => !m);

  return (
    <div
      style={{
        position: "fixed",
        left: "1.5rem",
        bottom: "4.8rem",
        zIndex: 56,
        display: "flex",
        gap: 8,
        alignItems: "center",
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={toggleMute}
        title="Toggle site audio"
        style={{
          padding: "0.65rem 1rem",
          borderRadius: 999,
          border: "1px solid rgba(148,163,184,0.18)",
          background: muted ? "rgba(203,213,225,0.08)" : "linear-gradient(135deg,#60a5fa,#a78bfa)",
          color: muted ? "#9CA3AF" : "#020617",
          cursor: "pointer",
          fontFamily: "'Inter',sans-serif",
          fontSize: 14,
          fontWeight: 700,
          boxShadow: muted ? "none" : "0 8px 30px rgba(96,165,250,0.18)",
        }}
      >
        {muted ? "Muted" : "Sound"}
      </button>
    </div>
  );
}

export function SaifCompanion() {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem("saifCompanionOpen") === "true";
    } catch {
      return false;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem("saifCompanionMessages");
      return raw
        ? JSON.parse(raw)
        : [
            {
              from: "bot",
              text: "Hi! I'm Saif Companion. Ask me about projects, skills or interview prep.",
            },
          ];
    } catch {
      return [
        {
          from: "bot",
          text: "Hi! I'm Saif Companion. Ask me about projects, skills or interview prep.",
        },
      ];
    }
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { playClick } = useSound() || {};

  /* ================= AUTO SCROLL ================= */
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= INPUT FOCUS FIX ================= */
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  /* ================= PERSISTENCE ================= */
  useEffect(() => {
    try {
      localStorage.setItem("saifCompanionMessages", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem("saifCompanionOpen", open ? "true" : "false");
    } catch {}
  }, [open]);

  const send = async (txt) => {
    if (!txt || !txt.trim()) return;
    const trimmed = txt.trim();

    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setIsLoading(true);

    try {
      const context = {};

      const resp = await fetch("/api/saif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, context }),
      });

      if (!resp.ok) {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text:
              "Sorry — I'm having trouble reaching my assistant server. Try again or check back later.",
          },
        ]);
        return;
      }

      const data = await resp.json();
      const answer = data?.answer || "Sorry — I couldn't generate an answer right now.";
      setMessages((m) => [...m, { from: "bot", text: answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text:
            "Sorry — I'm having trouble reaching my assistant server. Try again or check back later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "1.5rem",
        bottom: open ? "6.4rem" : "5.4rem",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-end",
      }}
    >
      {open && (
        <div
          style={{
            width: 320,
            maxWidth: "92vw",
            borderRadius: 12,
            padding: 12,
            background: "rgba(10,14,20,0.95)",
            border: "1px solid rgba(148,163,184,0.12)",
            boxShadow: "0 20px 60px rgba(2,6,23,0.6)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <strong style={{ color: "#E5E7EB" }}>Saif Companion</strong>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  setMessages([
                    {
                      from: "bot",
                      text:
                        "Hi! I'm Saif Companion. Ask me about projects, skills or interview prep.",
                    },
                  ]);
                  localStorage.removeItem("saifCompanionMessages");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#9CA3AF",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                Clear
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#D1D5DB",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ maxHeight: 260, overflow: "auto", paddingRight: 6 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: m.from === "bot" ? "flex-start" : "flex-end",
                }}
              >
                <div
                  style={{
                    background:
                      m.from === "bot"
                        ? "rgba(30,60,120,0.14)"
                        : "linear-gradient(135deg,#60a5fa,#a78bfa)",
                    color: m.from === "bot" ? "#D1D5DB" : "#020617",
                    padding: "0.6rem 0.8rem",
                    borderRadius: 8,
                    maxWidth: "80%",
                    fontSize: 13,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLoading) send(input);
            }}
            style={{ marginTop: 8, display: "flex", gap: 8 }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Thinking..." : "Ask Saif..."}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "0.6rem 0.8rem",
                borderRadius: 8,
                border: "1px solid rgba(148,163,184,0.08)",
                background: "rgba(255,255,255,0.02)",
                color: "#E5E7EB",
                outline: "none",
              }}
            />

            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "0.55rem 0.9rem",
                borderRadius: 8,
                background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
                border: "none",
                color: "#020617",
                fontWeight: 700,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          border: "none",
          background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
          fontSize: 20,
        }}
      >
        🤖
      </button>
    </div>
  );
}
