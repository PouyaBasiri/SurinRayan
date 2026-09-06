
import { HeroSection } from "@/components/modules/home/HeroSection";
import { ValueProposition } from "@/components/modules/home/ValueProposition";
import { ServicesSummary } from "@/components/modules/home/ServicesSummary";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <ServicesSummary />
    </>
  );
}