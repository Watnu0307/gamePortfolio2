"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  MessageSquareText,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";

type AICategory = "IMAGE" | "WEB" | "AUTOMATION" | "DOCUMENT" | "ETC";

type AIProject = {
  id: string;
  title: string;
  description: string;
  period: string;
  tools: string[];
  category: AICategory;
  purpose: string;
  process: string;
  myRole: string;
  aiRole: string;
  result: string;
};

const aiPortfolioData: AIProject[] = [
  {
    id: "01",
    title: "AI 캐릭터 에셋 제작",
    description: "포트폴리오 웹사이트에 사용할 게임 캐릭터 이미지를 AI로 제작하고 수정했습니다.",
    period: "2026.09",
    tools: ["ChatGPT", "Image Generation"],
    category: "IMAGE",
    purpose: "포트폴리오의 레이싱 콘셉트를 한눈에 전달하는 전용 캐릭터 에셋 제작",
    process: "캐릭터 방향 정의 → 프롬프트 설계 → 결과 비교 → 색상과 구도 보정",
    myRole: "콘셉트, 포즈, 컬러 기준을 정하고 결과물을 선별해 웹 레이아웃에 맞게 배치했습니다.",
    aiRole: "초기 캐릭터 시안 생성과 컬러 베리에이션 제작에 활용했습니다.",
    result: "Landing과 Portfolio Shop에 사용하는 일관된 캐릭터 비주얼을 완성했습니다.",
  },
  {
    id: "02",
    title: "AI 포트폴리오 웹 기획",
    description: "AI를 활용해 페이지 구조, UI 아이디어, 인터랙션을 설계했습니다.",
    period: "2026.10",
    tools: ["ChatGPT", "Codex"],
    category: "WEB",
    purpose: "게임 운영 직무의 강점과 작업물을 게임 UI 문법으로 전달하는 웹 포트폴리오 설계",
    process: "정보 구조 설계 → 섹션별 콘셉트 정의 → 프로토타입 구현 → 반응형 검수",
    myRole: "전체 방향과 콘텐츠 우선순위를 결정하고 반복 검수를 통해 결과를 조정했습니다.",
    aiRole: "UI 대안 제안, 코드 구현, 오류 점검과 반복 수정에 활용했습니다.",
    result: "레이싱 코스를 따라 탐색하는 세로형 포트폴리오 경험을 구현했습니다.",
  },
  {
    id: "03",
    title: "VOC 분류 자동화",
    description: "대량의 게임 커뮤니티 VOC를 카테고리별로 정리하는 자동화 예제를 제작했습니다.",
    period: "2026.08",
    tools: ["ChatGPT", "Python"],
    category: "AUTOMATION",
    purpose: "반복되는 VOC 정리 시간을 줄이고 운영 이슈를 빠르게 확인할 수 있는 구조 만들기",
    process: "분류 기준 수립 → 샘플 데이터 정제 → 자동 분류 → 결과 검수",
    myRole: "운영 관점의 카테고리와 긴급도 기준을 정의하고 분류 결과를 검증했습니다.",
    aiRole: "텍스트 요약, 키워드 추출, 분류 로직 초안 작성에 활용했습니다.",
    result: "VOC를 주제와 긴급도별로 빠르게 확인하는 정리 예제를 완성했습니다.",
  },
  {
    id: "04",
    title: "게임 이벤트 아이디어 생성",
    description: "AI를 활용해 유저 유형별 이벤트 아이디어를 정리하고 운영안을 구성했습니다.",
    period: "2026.08",
    tools: ["ChatGPT"],
    category: "ETC",
    purpose: "신규·복귀·기존 유저가 함께 참여할 수 있는 이벤트 아이디어 확장",
    process: "유저 유형 정의 → 아이디어 발산 → 운영 가능성 검토 → 안건 구체화",
    myRole: "유저별 목적과 보상 기준을 정하고 실제 운영 가능한 아이디어를 선별했습니다.",
    aiRole: "초기 아이디어 확장과 예상 리스크 체크리스트 생성에 활용했습니다.",
    result: "유저 유형별 참여 동기와 운영 포인트가 담긴 이벤트 기획안을 구성했습니다.",
  },
  {
    id: "05",
    title: "포트폴리오 문서 자동 정리",
    description: "AI를 활용해 프로젝트 설명과 결과를 문서 형식으로 정리했습니다.",
    period: "2026.09",
    tools: ["ChatGPT", "Document"],
    category: "DOCUMENT",
    purpose: "서로 다른 프로젝트 기록을 동일한 문서 구조와 어조로 정리",
    process: "원본 자료 수집 → 핵심 정보 추출 → 공통 목차 적용 → 문장 검수",
    myRole: "최종 정보의 정확성을 확인하고 지원 직무에 맞게 강조점을 편집했습니다.",
    aiRole: "초안 요약과 문장 구조 정리, 누락 항목 점검에 활용했습니다.",
    result: "프로젝트별 목적·과정·성과를 빠르게 파악할 수 있는 문서 체계를 만들었습니다.",
  },
  {
    id: "06",
    title: "AI 이미지 리터칭",
    description: "생성된 이미지의 색상, 캐릭터 스타일, 배경을 수정해 웹용 에셋으로 제작했습니다.",
    period: "2026.09",
    tools: ["Image Generation", "Photoshop"],
    category: "IMAGE",
    purpose: "페이지 컬러와 해상도에 맞는 일관된 이미지 에셋 구성",
    process: "원본 분석 → 수정 범위 지정 → AI 편집 → 디테일 보정 → 웹 최적화",
    myRole: "유지할 요소와 바꿀 요소를 구분하고 최종 품질과 사용 환경을 검수했습니다.",
    aiRole: "캐릭터 포인트 컬러 변경과 배경 분리 작업에 활용했습니다.",
    result: "블루 UI에서 선명하게 보이는 옐로우 레이싱 에셋을 제작했습니다.",
  },
];

const categories = ["ALL", "IMAGE", "WEB", "AUTOMATION", "DOCUMENT", "ETC"] as const;

const icons = {
  "01": ImageIcon,
  "02": Code2,
  "03": MessageSquareText,
  "04": Lightbulb,
  "05": FileText,
  "06": WandSparkles,
};

export function AIPortfolioSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const momentumRef = useRef(0);
  const [category, setCategory] = useState<(typeof categories)[number]>("ALL");
  const [selected, setSelected] = useState<AIProject | null>(null);
  const [progress, setProgress] = useState({ left: 0, width: 34 });
  const [railEdges, setRailEdges] = useState({ start: true, end: false });

  const projects = category === "ALL" ? aiPortfolioData : aiPortfolioData.filter((item) => item.category === category);

  const updateProgress = () => {
    const rail = railRef.current;
    if (!rail) return;
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const width = Math.min(100, Math.max(18, (rail.clientWidth / rail.scrollWidth) * 100));
    const left = max ? (rail.scrollLeft / max) * (100 - width) : 0;
    setProgress({ left, width });
    setRailEdges({ start: rail.scrollLeft <= 2, end: max <= 2 || rail.scrollLeft >= max - 2 });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollLeft = 0;
    window.addEventListener("resize", updateProgress);
    requestAnimationFrame(updateProgress);
    return () => {
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(momentumRef.current);
    };
  }, [category]);

  useEffect(() => {
    if (!selected) return;
    const oldOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const releaseDrag = () => {
    const rail = railRef.current;
    const drag = dragRef.current;
    if (!rail || !drag.active) return;
    drag.active = false;
    rail.classList.remove("is-dragging");
    let velocity = drag.velocity;
    const glide = () => {
      velocity *= 0.9;
      rail.scrollLeft -= velocity * 16;
      if (Math.abs(velocity) > 0.08) momentumRef.current = requestAnimationFrame(glide);
    };
    momentumRef.current = requestAnimationFrame(glide);
  };

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".ai-project-card");
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || 24;
    const distance = card ? card.offsetWidth + gap : rail.clientWidth * 0.82;
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const target = Math.max(0, Math.min(max, rail.scrollLeft + distance * direction));
    rail.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="ai-portfolio-section" aria-labelledby="ai-portfolio-title">
      <div className="ai-shop-orb ai-shop-orb-a" aria-hidden="true" />
      <div className="ai-shop-orb ai-shop-orb-b" aria-hidden="true" />
      <div className="ai-portfolio-shell">
        <header className="ai-portfolio-header">
          <div>
            <p><Sparkles aria-hidden="true" /> AI PORTFOLIO</p>
            <h2 id="ai-portfolio-title">AI를 활용한 작업물</h2>
            <span>작업 과정에서 AI를 어떻게 활용했는지, 결과물과 함께 확인할 수 있습니다.</span>
          </div>
          <div className="ai-shop-badge" aria-hidden="true"><Bot /><span>AI LAB</span></div>
        </header>

        <nav className="ai-category-tabs" aria-label="AI 작업물 카테고리">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </nav>

        <div className="ai-rail-window">
          <div
            ref={railRef}
            className="ai-portfolio-rail"
            onScroll={updateProgress}
            onPointerDown={(event) => {
              if (event.pointerType === "touch") return;
              cancelAnimationFrame(momentumRef.current);
              const rail = railRef.current;
              if (!rail) return;
              dragRef.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft, lastX: event.clientX, lastTime: performance.now(), velocity: 0 };
              rail.classList.add("is-dragging");
            }}
            onPointerMove={(event) => {
              const rail = railRef.current;
              const drag = dragRef.current;
              if (!rail || !drag.active) return;
              const now = performance.now();
              const elapsed = Math.max(1, now - drag.lastTime);
              drag.velocity = (event.clientX - drag.lastX) / elapsed;
              drag.lastX = event.clientX;
              drag.lastTime = now;
              rail.scrollLeft = drag.startScroll - (event.clientX - drag.startX);
            }}
            onPointerUp={releaseDrag}
            onPointerCancel={releaseDrag}
            onPointerLeave={releaseDrag}
          >
            {projects.map((item) => {
              const Icon = icons[item.id as keyof typeof icons];
              return (
                <button
                  className={`ai-project-card ai-project-card-${item.id}`}
                  type="button"
                  key={item.id}
                  onClick={() => Math.abs(dragRef.current.lastX - dragRef.current.startX) < 6 && setSelected(item)}
                >
                  <div className="ai-card-visual">
                    <span className="ai-card-recommend">AI PICK</span>
                    <span className="ai-card-number">{item.id}</span>
                    <div className="ai-card-icon"><Icon aria-hidden="true" /></div>
                    <div className="ai-card-grid" aria-hidden="true" />
                  </div>
                  <div className="ai-card-copy">
                    <p>{item.category}</p>
                    <h3>{item.title}</h3>
                    <span>{item.description}</span>
                    <div className="ai-card-meta"><strong>{item.period}</strong><i>{item.tools.join(" · ")}</i></div>
                    <div className="ai-card-view">VIEW PROJECT <ArrowUpRight aria-hidden="true" /></div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="ai-rail-controls" aria-label="AI 작업물 좌우 탐색">
            <button type="button" disabled={railEdges.start} onClick={() => moveRail(-1)} aria-label="이전 AI 작업물 보기"><ChevronLeft /></button>
            <button type="button" disabled={railEdges.end} onClick={() => moveRail(1)} aria-label="다음 AI 작업물 보기"><ChevronRight /></button>
          </div>
        </div>

        <div className="ai-rail-footer">
          <span>DRAG · SWIPE</span>
          <div className="ai-scroll-progress" aria-hidden="true"><i style={{ left: `${progress.left}%`, width: `${progress.width}%` }} /></div>
          <span>{String(projects.length).padStart(2, "0")} ITEMS</span>
        </div>
      </div>

      {selected && createPortal(
        <div className="ai-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <article className="ai-project-modal" role="dialog" aria-modal="true" aria-labelledby="ai-modal-title">
            <header>
              <div><span>AI PROJECT {selected.id}</span><h2 id="ai-modal-title">{selected.title}</h2></div>
              <button type="button" onClick={() => setSelected(null)} aria-label="AI 작업물 상세 창 닫기"><X /></button>
            </header>
            <div className="ai-modal-hero"><Sparkles /><p>{selected.description}</p></div>
            <dl className="ai-modal-detail-grid">
              <div><dt>작업 목적</dt><dd>{selected.purpose}</dd></div>
              <div><dt>작업 과정</dt><dd>{selected.process}</dd></div>
              <div><dt>내가 직접 한 부분</dt><dd>{selected.myRole}</dd></div>
              <div><dt>AI를 활용한 부분</dt><dd>{selected.aiRole}</dd></div>
              <div className="ai-modal-result"><dt>최종 결과물</dt><dd>{selected.result}</dd></div>
            </dl>
            <footer><div>{selected.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><strong>{selected.period}</strong></footer>
          </article>
        </div>,
        document.body,
      )}
    </section>
  );
}
