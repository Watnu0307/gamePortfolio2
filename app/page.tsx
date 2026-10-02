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
    <main className="racing-world" aria-label="Arcade racing portfolio background">
      <LandingBackground />
      <SectionTransition variant="landing-bridge" label="레이싱 코스에서 체크포인트로 이동" />
      <NexonBridgeSection />
      <SectionTransition variant="bridge-qna" label="체크포인트에서 지원자 Q&A로 이동" />
      <QnASection />
      <SectionTransition variant="qna-portfolio" label="지원자 Q&A에서 포트폴리오 차고로 이동" />
      <PortfolioBackground />
      <SectionTransition variant="portfolio-ai" label="포트폴리오 차고에서 AI 포트폴리오로 이동" />
      <AIPortfolioSection />
      <SectionTransition variant="ai-contact" label="AI 포트폴리오에서 마지막 레이싱 코스로 이동" />
      <ContactBackground />
    </main>
  );
}
