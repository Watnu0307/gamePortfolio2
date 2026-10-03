"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "HOME" },
  { id: "why-nexon", label: "WHY NEXON" },
  { id: "game-experience", label: "GAME EXPERIENCE" },
  { id: "qna", label: "Q&A" },
  { id: "portfolio", label: "PORTFOLIO" },
  { id: "ai-portfolio", label: "AI PORTFOLIO" },
  { id: "contact", label: "CONTACT" },
];

export function SectionNav() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const marker = window.innerHeight * 0.42;
      let current = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= marker) current = section.id;
      }
      setActiveId(current);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="section-nav" aria-label="페이지 섹션">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeId === section.id ? "is-active" : undefined}
          aria-current={activeId === section.id ? "location" : undefined}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
