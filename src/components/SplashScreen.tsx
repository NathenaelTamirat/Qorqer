import { useEffect, useState } from "react";

const letters = "Adiss Qorqer".split("");

const CHAR_GLYPHS = "!@#$%^&*()_+-=[]{}|;':\",./<>?~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomChar() {
  return CHAR_GLYPHS[Math.floor(Math.random() * CHAR_GLYPHS.length)];
}

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"scramble" | "settle" | "glow" | "exit">("scramble");
  const [displayed, setDisplayed] = useState(letters.map(() => ""));

  useEffect(() => {
    let step = 0;
    const maxSteps = 30;
    const interval = setInterval(() => {
      step++;
      setDisplayed(letters.map((ch, i) => {
        if (ch === " ") return " ";
        const revealAt = Math.floor((i / letters.length) * maxSteps);
        if (step > revealAt + 5) return ch;
        return randomChar();
      }));
      if (step >= maxSteps) {
        clearInterval(interval);
        setDisplayed(letters);
        setPhase("settle");
        setTimeout(() => setPhase("glow"), 600);
        setTimeout(() => setPhase("exit"), 2000);
        setTimeout(onFinish, 2800);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`splash-overlay ${phase === "exit" ? "splash-exit" : ""}`}>
      <div className={`splash-content ${phase === "glow" ? "splash-glow" : ""} ${phase === "settle" ? "splash-settle" : ""}`}>
        <h1 className="splash-title">
          {displayed.map((ch, i) => (
            <span
              key={i}
              className="splash-letter"
              style={{
                animationDelay: `${i * 0.06}s`,
                display: ch === " " ? "inline-block" : "inline-block",
                width: ch === " " ? "0.4em" : "auto",
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <div className="splash-sub">
          <span className="splash-dot" style={{ animationDelay: "0.2s" }} />
          <span className="splash-dot" style={{ animationDelay: "0.4s" }} />
          <span className="splash-dot" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
