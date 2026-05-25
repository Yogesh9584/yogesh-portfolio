import MotionSection from "./MotionSection";

export default function SectionWrapper({
  id,
  children,
  className = "",
  containerClass = "max-w-6xl mx-auto",
}) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-28 px-5 sm:px-6 scroll-mt-24 ${className}`}
    >
      <MotionSection className={containerClass}>{children}</MotionSection>
    </section>
  );
}
