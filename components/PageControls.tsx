"use client";

import { ArrowUp, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function PageControls() {
  const [isDark, setIsDark] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.dataset.theme = next ? "dark" : "light";
      return next;
    });
  };

  return (
    <div className="page-controls" aria-label="화면 설정">
      <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={isDark ? "라이트 모드로 전환" : "야간 모드로 전환"}>
        {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        <span>{isDark ? "라이트 모드" : "야간 모드"}</span>
      </button>
      <button
        type="button"
        className={`scroll-top-button${showTop ? " is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="페이지 최상단으로 이동"
      >
        <ArrowUp aria-hidden="true" />
      </button>
    </div>
  );
}
