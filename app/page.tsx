import {
  AIPortfolioBackground,
  ContactBackground,
  LandingBackground,
  PortfolioBackground,
} from "@/components/BackgroundSections";
import { QnASection } from "@/components/QnASection";

export default function Home() {
  return (
    <main className="racing-world" aria-label="Arcade racing portfolio background">
      <LandingBackground />
      <QnASection />
      <PortfolioBackground />
      <AIPortfolioBackground />
      <ContactBackground />
    </main>
  );
}
