import {
  ContactBackground,
  LandingBackground,
  NexonBridgeSection,
  PortfolioBackground,
} from "@/components/BackgroundSections";
import { AIPortfolioSection } from "@/components/AIPortfolioSection";
import { QnASection } from "@/components/QnASection";
import { SectionTransition } from "@/components/SectionTransition";

export default function Home() {
  return (
    <main className="racing-world" aria-label="강승혜 게임 운영직무 포트폴리오">
      <LandingBackground />
      <SectionTransition variant="landing-bridge" label="지원 동기 섹션으로 이동" />
      <NexonBridgeSection />
      <SectionTransition variant="bridge-qna" label="지원자 Q&A로 이동" />
      <QnASection />
      <SectionTransition variant="qna-portfolio" label="포트폴리오 프로젝트로 이동" />
      <PortfolioBackground />
      <SectionTransition variant="portfolio-ai" label="AI 포트폴리오로 이동" />
      <AIPortfolioSection />
      <SectionTransition variant="ai-contact" label="연락처로 이동" />
      <ContactBackground />
    </main>
  );
}
