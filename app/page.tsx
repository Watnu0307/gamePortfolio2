import {
  ContactBackground,
  LandingBackground,
  NexonBridgeSection,
  PortfolioBackground,
} from "@/components/BackgroundSections";
import { AIPortfolioSection } from "@/components/AIPortfolioSection";
import { QnASection } from "@/components/QnASection";

export default function Home() {
  return (
    <main className="racing-world" aria-label="Arcade racing portfolio background">
      <LandingBackground />
      <NexonBridgeSection />
      <QnASection />
      <PortfolioBackground />
      <AIPortfolioSection />
      <ContactBackground />
    </main>
  );
}
