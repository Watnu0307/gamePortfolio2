"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function PageControls() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-controls">
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
