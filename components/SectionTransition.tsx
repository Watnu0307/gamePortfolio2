"use client";

type TransitionVariant =
  | "landing-bridge"
  | "bridge-experience"
  | "experience-qna"
  | "qna-portfolio"
  | "portfolio-ai"
  | "ai-contact";

type SectionTransitionProps = {
  variant: TransitionVariant;
  label: string;
};

export function SectionTransition({ variant, label }: SectionTransitionProps) {
  return (
    <div
      className={`section-transition section-transition-${variant}`}
      data-scroll-scene
      aria-hidden="true"
      aria-label={label}
    >
      <div className="transition-background transition-background-from" />
      <div className="transition-background transition-background-to" />
      <div className="transition-blend-light" />
      <div className="transition-world-lines">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
