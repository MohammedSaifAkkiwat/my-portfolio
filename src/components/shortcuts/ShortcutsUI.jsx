// src/components/shortcuts/ShortcutsUI.jsx

export function ShortcutsOverlay({ open, onClose }) {
  if (!open) return null;

  const items = [
    { key: "H", label: "Go to Hero" },
    { key: "R", label: "Go to Resume" },
    { key: "S", label: "Go to Skills" },
    { key: "P", label: "Go to Projects" },
    { key: "C", label: "Go to Contact" },
    { key: "B", label: "Cycle Background" },
    { key: "T", label: "Toggle Hyperdrive (night)" },
    { key: "F", label: "Toggle Focus Mode" },
    { key: "M", label: "Toggle Sound (mute/unmute)" },
    { key: "?", label: "Open this panel" },
  ];

  return (
    <div
      onClick={() => typeof onClose === "function" && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 480,
          width: "90%",
          padding: "2rem 2.5rem",
          borderRadius: 18,
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,64,175,0.85))",
          border: "1px solid rgba(148,163,184,0.4)",
          boxShadow: "0 30px 80px rgba(15,23,42,0.9)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.2rem",
              color: "#F9FAFB",
              margin: 0,
            }}
          >
            Keyboard Shortcuts
          </h3>

          <button
            onClick={() => typeof onClose === "function" && onClose()}
            aria-label="Close shortcuts"
            style={{
              background: "transparent",
              border: "none",
              color: "#9CA3AF",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Esc
          </button>
        </div>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#E5E7EB",
            marginBottom: "1rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Navigate the site like a pro racer. 🏎️
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          {items.map(({ key, label }) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 0.8rem",
                borderRadius: 10,
                background: "rgba(15,23,42,0.7)",
                border: "1px solid rgba(148,163,184,0.4)",
              }}
            >
              <span
                style={{
                  minWidth: "2rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: 6,
                  border: "1px solid rgba(148,163,184,0.7)",
                  background:
                    "radial-gradient(circle at top, #111827, #020617)",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.8rem",
                  color: "#E5E7EB",
                  textAlign: "center",
                }}
              >
                {key}
              </span>

              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#E5E7EB",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => typeof onClose === "function" && onClose()}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: 999,
              border: "none",
              background: "#E5E7EB",
              color: "#020617",
              fontSize: "0.85rem",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShortcutsHintPill() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        zIndex: 55,
        padding: "0.45rem 0.9rem",
        borderRadius: "999px",
        background: "rgba(15,23,42,0.8)",
        border: "1px solid rgba(148,163,184,0.4)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.75rem",
        color: "#9CA3AF",
        fontFamily: "'Courier New', monospace",
        backdropFilter: "blur(8px)",
        boxShadow: "0 10px 25px rgba(15,23,42,0.8)",
      }}
    >
      <span
        style={{
          padding: "0.1rem 0.5rem",
          borderRadius: "6px",
          border: "1px solid rgba(148,163,184,0.7)",
          background: "rgba(15,23,42,0.9)",
        }}
      >
        ?
      </span>
      Shortcuts
    </div>
  );
}
