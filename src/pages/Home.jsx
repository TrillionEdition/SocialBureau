import ApiMarketing from "../components/Home/ApiMarketing";
import ServicesGrid from "../components/Home/ServicesGrid";
import WebSection from "../components/Home/WebSection";
import CareerSection from "../components/Home/CareerSection";
import PartnershipTeamGrid, { PartnershipSection, TeamSection } from "../components/Home/PartnershipNTeam";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import FAQSection from "../components/Home/FAQSection";
import { Googlereview } from "../components/Googlereview";
import AppleSection from "../components/Home/EntertainmentGrid";
import Hero from "../components/Home/Hero";


export const Home = () => {
  return (
    <>
      <Hero />
      <ApiMarketing />
      <ServicesGrid />
      <WebSection />
      <CareerSection />
      <PartnershipTeamGrid />
      <AppleSection />
      <TestimonialsSection />
      <Googlereview />
      <FAQSection />
    </>
  )
}