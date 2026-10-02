"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

export type QnAItem = {
  id: string;
  question: string;
  answer: string;
};

export const qnaData: QnAItem[] = [
  {
    id: "Q1",
    question: "나의 장단점은 무엇인가요?",
    answer:
      "저의 장점은 플레이어 관점에서 게임을 세심하게 바라보는 습관입니다. 다양한 게임을 직접 오래 플레이하며 불편한 점과 재미 포인트를 자연스럽게 정리해왔습니다. 반면 한 가지를 꼼꼼히 보려다 생각이 길어질 때가 있지만, 우선순위를 정하고 정리하는 방식으로 보완하고 있습니다.",
  },
  {
    id: "Q2",
    question: "왜 게임회사, 그중에서도 운영 직무에 지원했나요?",
    answer:
      "저는 게임을 단순히 즐기는 것에서 끝나지 않고, 플레이어가 더 오래 즐길 수 있는 환경을 만드는 일에 관심이 많았습니다. 운영 직무는 유저 경험과 가장 가까운 자리에서 게임의 흐름을 살피고, 서비스를 더 안정적이고 즐겁게 만드는 역할이라고 생각해 지원했습니다.",
  },
  {
    id: "Q3",
    question: "나의 게임 경험은 어떤 강점이 되나요?",
    answer:
      "80개 이상의 다양한 게임을 플레이하며 장르별 재미 요소와 유저 반응 포인트를 경험했습니다. 덕분에 플레이어 입장에서 콘텐츠를 받아들이는 감각과 서비스 운영에서 중요하게 봐야 할 부분을 함께 생각하는 습관을 길렀습니다.",
  },
  {
    id: "Q4",
    question: "어떤 운영자가 되고 싶나요?",
    answer:
      "저는 유저의 목소리를 빠르게 이해하고, 작은 불편도 놓치지 않는 운영자가 되고 싶습니다. 문제를 단순히 처리하는 데서 끝나는 것이 아니라, 플레이어가 계속 게임을 즐기고 싶게 만드는 운영을 배우고 실천하고 싶습니다.",
  },
];

export function QnAHeader() {
  return (
    <header className="qna-header">
      <div className="qna-heading-copy">
        <p className="qna-label">
          <MessageCircleQuestion aria-hidden="true" />
          Q&amp;A
        </p>
        <h2 id="qna-title">지원자 미리보기</h2>
        <p className="qna-description">
          자주 묻는 질문처럼, 저를 짧게 소개합니다.
        </p>
      </div>

      <figure className="qna-character-frame">
        <div className="qna-character-ring" aria-hidden="true" />
        <img
          src="/images/qna-character.png"
          alt="질문을 생각하는 지원자 캐릭터"
        />
        <figcaption>PLAYER PROFILE</figcaption>
      </figure>
    </header>
  );
}

export function QnACard({ item, index }: { item: QnAItem; index: number }) {
  return (
    <AccordionItem value={item.id} className="qna-card">
      <AccordionTrigger className="qna-trigger">
        <span className="qna-question-row">
          <span className="qna-number">{item.id}</span>
          <span className="qna-question">{item.question}</span>
        </span>
        <span className="qna-ticket-number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </AccordionTrigger>
      <AccordionContent className="qna-content">
        <div className="qna-answer">
          <span className="qna-answer-badge" aria-hidden="true">
            A
          </span>
          <p>{item.answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function QnASection() {
  return (
    <section
      className="background-section qna-section"
      data-scroll-scene
      aria-labelledby="qna-title"
    >
      <div className="qna-track-mark" aria-hidden="true" />
      <div className="qna-checkers" aria-hidden="true" />
      <div className="qna-shop-transition" aria-hidden="true">
        <div className="transition-glass-panel transition-glass-panel-left" />
        <div className="transition-glass-panel transition-glass-panel-right" />
        <div className="transition-garage-frame" />
        <div className="transition-floor-grid" />
        <div className="transition-pit-line" />
        <span className="transition-zone-label">NEXT ZONE · PORTFOLIO SHOP</span>
      </div>
      <div className="qna-shell">
        <QnAHeader />

        <Accordion
          type="multiple"
          defaultValue={qnaData.map((item) => item.id)}
          className="qna-list"
        >
          {qnaData.map((item, index) => (
            <QnACard key={item.id} item={item} index={index} />
          ))}
        </Accordion>
      </div>
    </section>
  );
}
