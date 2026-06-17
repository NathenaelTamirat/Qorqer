import { useState, useEffect, useRef } from "react";
import { useAppContext } from "./context/AppContext";
import { AppProvider } from "./context/AppProvider";
import { useMousePosition } from "./hooks/useMousePosition";
import { useScrollProgress } from "./hooks/useScrollProgress";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CulturePage from "./pages/CulturePage";
import ContactPage from "./pages/ContactPage";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

function PageRenderer() {
  const { currentPage } = useAppContext();
  const [displayed, setDisplayed] = useState(currentPage);
  const [exiting, setExiting] = useState(false);
  const prevRef = useRef(currentPage);

  useEffect(() => {
    if (currentPage !== prevRef.current) {
      setExiting(true);
      const timer = setTimeout(() => {
        setDisplayed(currentPage);
        setExiting(false);
        prevRef.current = currentPage;
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const cls = `page-wrapper ${exiting ? "page-exit" : ""}`;

  const page = (() => {
    switch (displayed) {
      case "about": return <AboutPage />;
      case "culture": return <CulturePage />;
      case "contact": return <ContactPage />;
      default: return <HomePage />;
    }
  })();

  return <div key={displayed} className={cls}>{page}</div>;
}

function CursorGlow() {
  const { x, y } = useMousePosition();
  return (
    <div
      className="cursor-glow"
      style={{ "--cx": `${x}px`, "--cy": `${y}px` } as React.CSSProperties}
    />
  );
}

function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress * 100}%` }}
    />
  );
}

function ParallaxOrbs() {
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);

  useEffect(() => {
    const handler = () => {
      const s = window.scrollY;
      setOffset1(s * 0.15);
      setOffset2(s * -0.1);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div
        className="parallax-orb parallax-orb--1"
        style={{ transform: `translateY(${offset1}px)` }}
      />
      <div
        className="parallax-orb parallax-orb--2"
        style={{ transform: `translateY(${offset2}px)` }}
      />
    </>
  );
}

function RippleCatcher() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("button");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      target.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return null;
}
function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <AppProvider>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      <div className="app" style={{ display: splashDone ? "flex" : "none" }}>
        <CursorGlow />
        <ScrollProgressBar />
        <div className="noise-overlay" />
        <ParallaxOrbs />
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
        <div className="morph-blob morph-blob--1" />
        <div className="morph-blob morph-blob--2" />
        <RippleCatcher />
        <Header />
        <main className="main-content">
          <PageRenderer />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
