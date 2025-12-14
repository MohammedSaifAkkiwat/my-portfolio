// src/components/common/LoadingScreen.jsx
export default function LoadingScreen({ open }) {
  if (!open) return null;

  return (
    <div
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, rgba(2,6,23,0.9), rgba(2,6,23,0.75))",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          padding: "1.2rem 1.6rem",
          borderRadius: 14,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          border: "1px solid rgba(148,163,184,0.08)",
          boxShadow: "0 30px 80px rgba(2,6,23,0.7)",
          color: "#E5E7EB",
        }}
      >
        <div style={{ fontSize: 44, transform: "rotate(-6deg)" }}>🏁</div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Mohammed Saif</div>
          <div style={{ color: "#CFE0FF", fontSize: 12 }}>
            Loading portfolio — hold tight (but not for long)
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "var(--accent, #60a5fa)",
              animation: "lds 1s infinite",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "var(--accent, #a78bfa)",
              animation: "lds 1s .12s infinite",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "var(--accent, #f97316)",
              animation: "lds 1s .24s infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes lds {
          0% { transform: translateY(0); opacity: 0.75; }
          50% { transform: translateY(-8px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
