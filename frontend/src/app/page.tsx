import Hero from "@/components/Hero";
import About from "@/components/About";
import Decade from "@/components/Decade";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import HackathonTeaser from "@/components/HackathonTeaser";
import Sponsors from "@/components/Sponsors";
import Faq from "@/components/Faq";
import ClosingCta from "@/components/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Decade />
      <Program />
      <Speakers />
      <HackathonTeaser />
      <Sponsors />
      <Faq />
      <ClosingCta />
    </>
  );
}
