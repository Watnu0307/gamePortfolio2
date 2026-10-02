"use client";

import { useEffect, useRef } from "react";

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

      const world = document.querySelector<HTMLElement>(".racing-world");
      const portfolio = document.querySelector<HTMLElement>(".portfolio-background");
      if (world && portfolio) {
        const portfolioTop = portfolio.getBoundingClientRect().top;
        const transitionProgress = Math.min(
          1,
          Math.max(0, (height * 0.94 - portfolioTop) / (height * 1.16)),
        );
        world.style.setProperty(
          "--shop-transition-progress",
          transitionProgress.toFixed(4),
        );
      }
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
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      hero.style.setProperty("--mouse-x", currentX.toFixed(3));
      hero.style.setProperty("--mouse-y", currentY.toFixed(3));

      if (
        Math.abs(targetX - currentX) > 0.002 ||
        Math.abs(targetY - currentY) > 0.002
      ) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const startFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2));
      startFrame();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      startFrame();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", reset);
      window.removeEventListener("blur", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="background-section landing-background"
      data-scroll-scene
    >
      <div className="landing-sticky">
        <div className="landing-background-parallax" aria-hidden="true">
          <div className="landing-image" />
        </div>
        <div className="landing-vignette" aria-hidden="true" />
        <div className="landing-light" aria-hidden="true" />

        <div className="hero-copy">
          <p className="hero-eyebrow">GAME OPERATIONS PORTFOLIO</p>
          <p className="hero-statement">
            <span>게임을 즐기는 사람에서,</span>
            <span>게임을 운영하는 사람으로.</span>
            <span className="hero-introduction">
              <strong>신입 강승혜</strong>입니다.
            </span>
          </p>
        </div>

        <div className="character-parallax-wrapper">
          <div className="character-floating-wrapper">
            <img
              className="hero-character"
              src="/images/hero-character.png"
              alt="초록색 카트를 운전하는 캐릭터"
            />
          </div>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>SCROLL TO START</span>
          <span className="scroll-arrow">↓</span>
        </div>

        <div className="landing-track-wash" aria-hidden="true" />
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
  const shopItems = [
    { number: "01", title: "게임 운영 개선 제안서", meta: "운영 분석 · 2026.03", tone: "green" },
    { number: "02", title: "라이브 이벤트 운영 기획", meta: "이벤트 운영 · 2026.04", tone: "blue" },
    { number: "03", title: "신규 유저 이탈 분석", meta: "데이터 분석 · 2026.05", tone: "yellow" },
    { number: "04", title: "게임 커뮤니티 VOC 분석", meta: "CS / COMMUNITY · 2026.06", tone: "mint" },
    { number: "05", title: "신규 업데이트 운영 플랜", meta: "LIVE OPERATIONS · 2026.07", tone: "sky" },
  ];

  return (
    <section className="background-section portfolio-background" data-scroll-scene>
      <div className="portfolio-sticky">
        <div className="garage-wall" aria-hidden="true" />
        <div className="garage-bays" aria-hidden="true" />
        <div className="garage-floor" aria-hidden="true" />
        <div className="pit-line" aria-hidden="true" />
        <div className="shop-ambient-glow" aria-hidden="true" />

        <div className="portfolio-shop-stage">
          <figure className="shop-character-entry">
            <div className="shop-character-panel">
              <span className="shop-character-code">PLAYER 01</span>
              <img src="/images/qna-character.png" alt="포트폴리오 상점의 지원자 캐릭터" />
              <div className="shop-character-pedestal" aria-hidden="true" />
            </div>
            <figcaption>
              <strong>KANG SEUNG HYE</strong>
              <span>PORTFOLIO SHOP</span>
            </figcaption>
          </figure>

          <div className="shop-ui-entry">
            <header className="shop-toolbar-entry">
              <div>
                <p>SELECT YOUR PROJECT</p>
                <h2>PORTFOLIO SHOP</h2>
              </div>
              <nav className="shop-tabs-entry" aria-label="포트폴리오 카테고리">
                <span aria-current="page">ALL</span>
                <span>GAME</span>
                <span>OPERATIONS</span>
                <span>PLANNING</span>
                <span>ANALYSIS</span>
              </nav>
            </header>

            <div className="shop-grid-entry">
              {shopItems.map((item) => (
                <article className="shop-preview-card" key={item.number}>
                  <div className={`shop-preview-thumb shop-preview-thumb-${item.tone}`}>
                    <span>PROJECT {item.number}</span>
                    <div className="shop-thumb-interface" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <div className="shop-preview-copy">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                  </div>
                </article>
              ))}
              <div className="shop-empty-slot" aria-label="다음 프로젝트를 위한 빈 슬롯">
                <span>+</span>
                <small>NEXT SLOT</small>
              </div>
            </div>
          </div>
        </div>
      </div>
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
