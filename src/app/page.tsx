import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { WhySynorbit } from "@/components/sections/WhySynorbit";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ description: site.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ServicesOverview />
      <FeaturedWork />
      <ProcessSection />
      <WhySynorbit />
      <FinalCTA />
    </>
  );
}
