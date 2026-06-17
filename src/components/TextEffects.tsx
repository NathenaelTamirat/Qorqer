import { useEffect, useState, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#__";

export function TextScramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    const startTimeout = setTimeout(() => {
      started.current = true;
      let frame = 0;
      const total = 50;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / total;
        const reveal = Math.floor(progress * text.length);
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < reveal) result += text[i];
          else result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplayed(result);
        if (frame >= total) {
          clearInterval(interval);
          setDisplayed(text);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return <>{displayed || text}</>;
}

export function Typewriter({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  const isComplete = displayed.length === text.length;

  return (
    <>
      {displayed}
      {!isComplete && <span className="cursor-blink">|</span>}
    </>
  );
}
