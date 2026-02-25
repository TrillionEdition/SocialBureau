import ServicesGrid from "../components/Home/ServicesGrid";
import WebSection from "../components/Home/WebSection";
import CareerSection from "../components/Home/CareerSection";
import FAQSection from "../components/Home/FAQSection";
import AppleSection from "../components/Home/EntertainmentGrid";
import { Googlereview } from "../components/Googlereview";
import StaticServicesGrid from "../components/Home/BlogNTrillion";
import ApiMarketingHero from "../components/Home/ApiMarketing";
import ImageCarousel from "../components/Home/Hero";


export const Home = () => {
  return (
    <>
      <ImageCarousel/>
      <ApiMarketingHero />
      <WebSection />
      <ServicesGrid />
      <CareerSection />
      <StaticServicesGrid />
      <AppleSection />
      <Googlereview />
      <FAQSection />

    </>
  )
}