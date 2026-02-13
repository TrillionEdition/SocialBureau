import React from "react";
import HeroSection from "../components/Home/Hero";
import ApiMarketing from "../components/Home/ApiMarketing";
import ServicesGrid from "../components/Home/ServicesGrid";
import WebSection from "../components/Home/WebSection";
import CareerSection from "../components/Home/CareerSection";
import PartnershipTeamGrid from "../components/Home/PartnershipNTeam";
import EntertainmentGrid from "../components/Home/EntertainmentGrid";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import FAQSection from "../components/Home/FAQSection";

export const Home = () => {
  return (
    <div>
      {/* <HeroSection /> */}
      <ApiMarketing />
      <ServicesGrid />
      <WebSection />
      <CareerSection />
      <PartnershipTeamGrid />
      {/* <EntertainmentGrid /> */}
      <TestimonialsSection />
      <FAQSection />


    </div>
  );
};
