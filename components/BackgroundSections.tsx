"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Mail, Phone, Trophy, UserRound, X } from "lucide-react";

type ShopItem = {
  number: string;
  title: string;
  meta: string;
  tone: string;
  category: string;
  summary: string;
  focus: string;
  contribution: string;
  deliverables: string[];
};

const shopItems: ShopItem[] = [
  {
    number: "01",
    title: "게임 운영 개선 제안서",
    meta: "운영 분석 · 2026.03",
    tone: "green",
    category: "GAME OPERATIONS",
    summary: "플레이 흐름에서 반복되는 불편 요소를 찾고, 운영 관점에서 실행 가능한 개선 방향을 정리한 프로젝트입니다.",
    focus: "유저 경험 · 운영 정책 · 개선 우선순위",
    contribution: "이슈 수집부터 원인 분류, 우선순위 설정과 개선안 작성까지 전 과정을 진행했습니다.",
    deliverables: ["플레이 동선 기반 이슈 맵", "개선 우선순위 매트릭스", "운영 적용 시나리오"],
  },
  {
    number: "02",
    title: "라이브 이벤트 운영 기획",
    meta: "이벤트 운영 · 2026.04",
    tone: "blue",
    category: "LIVE EVENT",
    summary: "신규·복귀·기존 유저가 함께 참여할 수 있는 기간형 이벤트와 운영 체크리스트를 설계했습니다.",
    focus: "참여 구조 · 보상 밸런스 · 일정 관리",
    contribution: "이벤트 목표 설정, 참여 조건과 보상 구조 설계, 사전·진행·종료 단계별 대응안을 작성했습니다.",
    deliverables: ["이벤트 플로우", "보상 및 참여 조건표", "운영 리스크 체크리스트"],
  },
  {
    number: "03",
    title: "신규 유저 이탈 분석",
    meta: "데이터 분석 · 2026.05",
    tone: "yellow",
    category: "DATA ANALYSIS",
    summary: "초기 플레이 구간의 이탈 가능 지점을 가설로 정의하고 지표와 개선 액션을 연결한 분석 프로젝트입니다.",
    focus: "온보딩 · 퍼널 · 리텐션",
    contribution: "핵심 행동 퍼널을 정의하고 구간별 이탈 원인을 가설화해 확인 지표와 개선 액션을 제안했습니다.",
    deliverables: ["온보딩 퍼널 설계", "이탈 원인 가설", "리텐션 개선 액션"],
  },
  {
    number: "04",
    title: "게임 커뮤니티 VOC 분석",
    meta: "CS / COMMUNITY · 2026.06",
    tone: "mint",
    category: "VOC / COMMUNITY",
    summary: "커뮤니티의 다양한 목소리를 유형별로 분류하고 운영팀이 빠르게 판단할 수 있는 대응 기준을 만들었습니다.",
    focus: "VOC 분류 · 이슈 감지 · 커뮤니케이션",
    contribution: "게시글 샘플을 정리해 감정·주제·긴급도로 분류하고 대응 우선순위 및 안내 문구 방향을 제안했습니다.",
    deliverables: ["VOC 분류 체계", "이슈 조기 감지 기준", "상황별 커뮤니케이션 가이드"],
  },
  {
    number: "05",
    title: "신규 업데이트 운영 플랜",
    meta: "LIVE OPERATIONS · 2026.07",
    tone: "sky",
    category: "UPDATE PLAN",
    summary: "업데이트 전후의 공지, 모니터링, 장애 대응까지 한 흐름으로 연결한 라이브 운영 계획입니다.",
    focus: "업데이트 · 모니터링 · 장애 대응",
    contribution: "업데이트 일정을 기준으로 담당 업무와 확인 지표, 돌발 상황별 의사결정 플로우를 구성했습니다.",
    deliverables: ["업데이트 운영 타임라인", "실시간 모니터링 지표", "장애 대응 의사결정표"],
  },
];

function useScrollProgress() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const height = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-scroll-scene]").forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const distance = Math.max(scene.offsetHeight - height, height * 0.55);
        const progress = scene.classList.contains("section-transition")
          ? Math.min(1, Math.max(0, (height - rect.top) / (height + rect.height)))
          : Math.min(1, Math.max(0, -rect.top / distance));
        const reveal = Math.min(
          1,
          Math.max(0, (height * 0.92 - rect.top) / (height * 0.58)),
        );
        scene.style.setProperty("--progress", progress.toFixed(4));
        scene.style.setProperty("--section-reveal", reveal.toFixed(4));
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
            <span>게임을 플레이해 온 경험을,</span>
            <span>운영의 시선으로 확장합니다.</span>
            <span className="hero-introduction">
              <span>게임 운영직무 신입 지원자</span>
              <span><strong>강승혜</strong>입니다.</span>
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
          <span>SCROLL DOWN</span>
          <span className="scroll-arrow">↓</span>
        </div>

        <div className="landing-track-wash" aria-hidden="true" />
      </div>
    </section>
  );
}

export function NexonBridgeSection() {
  return (
    <section
      className="checkpoint-bridge"
      data-scroll-scene
      aria-labelledby="why-nexon-title"
    >
      <div className="checkpoint-course" aria-hidden="true" />
      <div className="checkpoint-light-wash" aria-hidden="true" />
      <div className="checkpoint-route-lines" aria-hidden="true">
        <i />
        <i />
      </div>

      <div className="checkpoint-gantry">
        <div className="checkpoint-beam" aria-hidden="true">
          <span>ABOUT</span>
          <span>01</span>
        </div>
        <article className="checkpoint-sign">
          <p className="checkpoint-label">APPLICATION MOTIVATION · NEXON</p>
          <h2 id="why-nexon-title">WHY NEXON?</h2>
          <div className="checkpoint-copy">
            <p>
              다양한 장르의 게임을 직접 경험하며{
              " "}
              플레이어가 서비스를 오래 즐길 수 있게 만드는 운영의 역할에 관심을 갖게 되었습니다.{
              " "}
              다양한 게임과 서비스를 꾸준히 운영해온 넥슨에서{
              " "}
              유저 경험을 가까이에서 이해하고 운영 실무를 배우고 싶습니다.
            </p>
          </div>
          <div className="checkpoint-progress" aria-hidden="true">
            <span />
          </div>
        </article>
        <div className="checkpoint-post checkpoint-post-left" aria-hidden="true" />
        <div className="checkpoint-post checkpoint-post-right" aria-hidden="true" />
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
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const portfolioRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = portfolioRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const render = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      section.style.setProperty("--shop-mouse-x", currentX.toFixed(3));
      section.style.setProperty("--shop-mouse-y", currentY.toFixed(3));
      if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
        frame = requestAnimationFrame(render);
      } else frame = 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(render); };
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / Math.min(rect.height, window.innerHeight) - .5) * 2));
      start();
    };
    const reset = () => { targetX = 0; targetY = 0; start(); };
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", reset);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem]);

  return (
    <section ref={portfolioRef} className="background-section portfolio-background" data-scroll-scene>
      <div className="portfolio-sticky">
        <div className="garage-wall" aria-hidden="true" />
        <div className="garage-bays" aria-hidden="true" />
        <div className="garage-floor" aria-hidden="true" />
        <div className="pit-line" aria-hidden="true" />
        <div className="shop-ambient-glow" aria-hidden="true" />

        <div className="portfolio-shop-stage">
          <aside className="shop-character-entry" aria-label="지원자 정보">
            <header className="shop-player-info">
              <span className="shop-player-status">
                <i aria-hidden="true" /> AVAILABLE FOR GAME OPERATIONS
              </span>
              <h3>강승혜</h3>
              <p>게임 운영직무 신입 지원자</p>
            </header>
            <div className="shop-character-panel">
              <span className="shop-character-code">APPLICANT</span>
              <img src="/images/shop-character.png" alt="헬멧을 쓴 지원자 캐릭터" />
              <div className="shop-character-pedestal" aria-hidden="true" />
            </div>
            <div className="shop-player-tags" aria-label="지원자 키워드">
              <span>유저 관점</span>
              <span>세심한 분석</span>
              <span>운영 실무</span>
            </div>
          </aside>

          <div className="shop-ui-entry">
            <header className="shop-toolbar-entry">
              <div>
                <p>GAME OPERATIONS PROJECTS</p>
                <h2>PORTFOLIO</h2>
              </div>
              <aside className="shop-index-hud" aria-label="포트폴리오 프로젝트 안내">
                <div><span>PROJECTS</span><strong>05</strong></div>
                <div><span>FOCUS</span><strong>GAME OPERATIONS</strong></div>
                <div><span>FORMAT</span><strong>PPT SLIDES</strong></div>
              </aside>
            </header>

            <div className="shop-grid-entry">
              {shopItems.map((item) => (
                <button
                  type="button"
                  className="shop-preview-card"
                  key={item.number}
                  onClick={() => setSelectedItem(item)}
                  aria-haspopup="dialog"
                  aria-label={`${item.title} 상세 보기`}
                >
                  <div className={`shop-preview-thumb shop-preview-thumb-${item.tone}`}>
                    <span>PROJECT {item.number}</span>
                    <div className="shop-thumb-interface" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <div className="shop-preview-copy">
                    <p className="shop-card-category">{item.category}</p>
                    <div className="shop-card-title-row">
                      <h3>{item.title}</h3>
                      <ArrowUpRight aria-hidden="true" />
                    </div>
                    <p className="shop-card-summary">{item.summary}</p>
                    <div className="shop-card-footer">
                      <span>{item.meta}</span>
                      <strong>PPT 보기</strong>
                    </div>
                  </div>
                </button>
              ))}
              <div className="shop-empty-slot" aria-label="다음 프로젝트를 위한 빈 슬롯">
                <span>+</span>
                <small>MORE PROJECTS</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedItem &&
        createPortal(
          <div
            className="portfolio-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedItem(null);
            }}
          >
            <section
              className="portfolio-slide-viewer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-modal-title"
            >
              <header className="portfolio-viewer-header">
                <div>
                  <span>PROJECT {selectedItem.number}</span>
                  <h2 id="portfolio-modal-title">{selectedItem.title}</h2>
                </div>
                <p>PROJECT PRESENTATION · 아래로 스크롤해 확인하세요</p>
                <button
                  type="button"
                  className="portfolio-modal-close"
                  onClick={() => setSelectedItem(null)}
                  aria-label="포트폴리오 상세 창 닫기"
                >
                  <X aria-hidden="true" />
                </button>
              </header>

              <div className="portfolio-slide-track">
                <article className={`portfolio-slide portfolio-slide-cover portfolio-slide-${selectedItem.tone}`}>
                  <div className="portfolio-slide-number">01</div>
                  <div className="portfolio-slide-cover-copy">
                    <p>{selectedItem.category}</p>
                    <h3>{selectedItem.title}</h3>
                    <span>{selectedItem.meta}</span>
                  </div>
                  <div className="portfolio-slide-cover-mark" aria-hidden="true">P</div>
                  <footer>KANG SEUNG HYE · GAME OPERATIONS PORTFOLIO</footer>
                </article>

                <article className="portfolio-slide portfolio-slide-overview">
                  <div className="portfolio-slide-heading">
                    <span>02 · PROJECT OVERVIEW</span>
                    <h3>프로젝트 개요</h3>
                  </div>
                  <div className="portfolio-slide-overview-grid">
                    <p>{selectedItem.summary}</p>
                    <div>
                      <span>KEY FOCUS</span>
                      <strong>{selectedItem.focus}</strong>
                    </div>
                    <div>
                      <span>PROJECT TYPE</span>
                      <strong>{selectedItem.category}</strong>
                    </div>
                  </div>
                  <footer>PROJECT {selectedItem.number}</footer>
                </article>

                <article className="portfolio-slide portfolio-slide-process">
                  <div className="portfolio-slide-heading">
                    <span>03 · PROCESS &amp; ROLE</span>
                    <h3>진행 과정과 담당 역할</h3>
                  </div>
                  <p className="portfolio-slide-role">{selectedItem.contribution}</p>
                  <div className="portfolio-slide-process-flow" aria-label="프로젝트 진행 단계">
                    <div><span>01</span><strong>문제 발견</strong></div>
                    <i aria-hidden="true" />
                    <div><span>02</span><strong>원인 분석</strong></div>
                    <i aria-hidden="true" />
                    <div><span>03</span><strong>운영 제안</strong></div>
                  </div>
                  <footer>PROJECT {selectedItem.number}</footer>
                </article>

                <article className="portfolio-slide portfolio-slide-output">
                  <div className="portfolio-slide-heading">
                    <span>04 · OUTPUT</span>
                    <h3>주요 산출물</h3>
                  </div>
                  <div className="portfolio-slide-output-list">
                    {selectedItem.deliverables.map((deliverable, index) => (
                      <div key={deliverable}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{deliverable}</strong>
                      </div>
                    ))}
                  </div>
                  <p className="portfolio-slide-closing">포트폴리오를 확인해주셔서 감사합니다.</p>
                  <footer>KANG SEUNG HYE · GAME OPERATIONS PORTFOLIO</footer>
                </article>

                <div className="portfolio-slide-end" aria-hidden="true">
                  <span>프로젝트 소개가 끝났습니다.</span>
                </div>
              </div>
            </section>
          </div>,
          document.body,
        )}
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
    <section
      className="background-section contact-background"
      data-scroll-scene
      aria-labelledby="contact-title"
    >
      <div className="contact-image" aria-hidden="true" />
      <div className="contact-atmosphere" aria-hidden="true" />
      <div className="contact-spotlight contact-spotlight-left" aria-hidden="true" />
      <div className="contact-spotlight contact-spotlight-right" aria-hidden="true" />
      <div className="contact-confetti" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i />
      </div>

      <div className="contact-finish-shell">
        <header className="contact-finish-copy">
          <p><Trophy aria-hidden="true" /> CONTACT · GAME OPERATIONS</p>
          <h2 id="contact-title">
            끝까지 봐주셔서 감사합니다.<br />
            게임 운영자로 성장할 기회를 기다리고 있습니다.
          </h2>
          <span>GAME OPERATIONS APPLICANT · KANG SEUNG HYE</span>
        </header>

        <div className="contact-ceremony" aria-label="지원자 연락처 안내">
          <div className="contact-winner-halo" aria-hidden="true" />
          <img
            className="contact-winner-character"
            src="/images/shop-character.png"
            alt="노란색 의상과 카트로 표현한 강승혜 캐릭터"
          />
          <div className="contact-podium" aria-hidden="true">
            <div className="contact-podium-step contact-podium-second"><span>2</span></div>
            <div className="contact-podium-step contact-podium-first"><span>1</span><Trophy /></div>
            <div className="contact-podium-step contact-podium-third"><span>3</span></div>
          </div>
        </div>

        <aside className="contact-result-card" aria-label="강승혜 연락처">
          <div className="contact-result-title">
            <span>CONTACT INFORMATION</span>
            <strong>APPLICANT</strong>
          </div>
          <dl>
            <div>
              <dt><UserRound aria-hidden="true" /> NAME</dt>
              <dd>강승혜</dd>
            </div>
            <div>
              <dt><Mail aria-hidden="true" /> EMAIL</dt>
              <dd>seunghye@email.com</dd>
            </div>
            <div>
              <dt><Phone aria-hidden="true" /> PHONE</dt>
              <dd>010-0000-0000</dd>
            </div>
          </dl>
          <a className="contact-mail-cta" href="mailto:seunghye@email.com">
            메일 보내기 <ArrowUpRight aria-hidden="true" />
          </a>
          <p>게임 운영직무 신입 지원자 강승혜입니다.</p>
        </aside>
      </div>
    </section>
  );
}
