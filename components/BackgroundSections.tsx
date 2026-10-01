"use client";

import { useEffect } from "react";

function useScrollProgress() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const height = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-scroll-scene]").forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const distance = Math.max(scene.offsetHeight - height, height * 0.55);
        const progress = Math.min(1, Math.max(0, -rect.top / distance));
        scene.style.setProperty("--progress", progress.toFixed(4));
      });
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
}

export function LandingBackground() {
  useScrollProgress();
  return (
    <section className="background-section landing-background" data-scroll-scene>
      <div className="landing-sticky" aria-hidden="true">
        <div className="landing-image" />
        <div className="landing-light" />
        <div className="landing-track-wash" />
      </div>
    </section>
  );
}

export function AboutBackground() {
  return (
    <section className="background-section about-background" data-scroll-scene>
      <div className="soft-course soft-course-a" aria-hidden="true" />
      <div className="soft-course soft-course-b" aria-hidden="true" />
      <div className="edge-checkers edge-checkers-left" aria-hidden="true" />
      <div className="meadow-haze" aria-hidden="true" />
    </section>
  );
}

export function QnABackground() {
  return (
    <section className="background-section qna-background" data-scroll-scene>
      <div className="qna-route qna-route-left" aria-hidden="true" />
      <div className="qna-route qna-route-right" aria-hidden="true" />
      <div className="edge-checkers edge-checkers-right" aria-hidden="true" />
      <div className="track-connector" aria-hidden="true" />
    </section>
  );
}

export function PortfolioBackground() {
  return (
    <section className="background-section portfolio-background" data-scroll-scene>
      <div className="garage-wall" aria-hidden="true" />
      <div className="garage-bays" aria-hidden="true" />
      <div className="garage-floor" aria-hidden="true" />
      <div className="pit-line" aria-hidden="true" />
    </section>
  );
}

export function AIPortfolioBackground() {
  return (
    <section className="background-section ai-background" data-scroll-scene>
      <div className="boost-grid" aria-hidden="true" />
      <div className="boost-glow boost-glow-a" aria-hidden="true" />
      <div className="boost-glow boost-glow-b" aria-hidden="true" />
      <div className="speed-lines" aria-hidden="true" />
      <div className="outdoor-return" aria-hidden="true" />
    </section>
  );
}

export function ContactBackground() {
  return (
    <section className="background-section contact-background" data-scroll-scene>
      <div className="contact-image" aria-hidden="true" />
      <div className="contact-atmosphere" aria-hidden="true" />
    </section>
  );
}
