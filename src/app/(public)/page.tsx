import {
  AnimatedBackground,
  ScrollProgress,
  HeroSection,
  ProblemFlow,
  SolutionPipeline,
  DemoSection,
  BenefitCards,
  FutureVisionCards,
  CTASection,
} from '@/components/landing';

export default function LandingPage() {
  return (
    <div className="relative bg-[var(--color-background)]">
      <AnimatedBackground />
      <ScrollProgress />
      <main className="relative z-10">
        <HeroSection />
        <ProblemFlow />
        <SolutionPipeline />
        <DemoSection />
        <BenefitCards />
        <FutureVisionCards />
        <CTASection />
      </main>
    </div>
  );
}
