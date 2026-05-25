import MotionSection from "./MotionSection";

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <MotionSection className="mb-14 md:mb-16 text-center max-w-2xl mx-auto" amount={0.3}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </MotionSection>
  );
}
