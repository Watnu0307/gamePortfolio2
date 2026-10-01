import {
  AIPortfolioBackground,
  AboutBackground,
  ContactBackground,
  LandingBackground,
  PortfolioBackground,
  QnABackground,
} from "@/components/BackgroundSections";

export default function Home() {
  return (
    <main className="racing-world" aria-label="Arcade racing portfolio background">
      <LandingBackground />
      <AboutBackground />
      <QnABackground />
      <PortfolioBackground />
      <AIPortfolioBackground />
      <ContactBackground />
    </main>
  );
}
