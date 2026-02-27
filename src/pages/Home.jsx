import ServicesGrid from "../components/Home/ServicesGrid";
import WebSection from "../components/Home/WebSection";
import CareerSection from "../components/Home/CareerSection";
import FAQSection from "../components/Home/FAQSection";
import AppleSection from "../components/Home/EntertainmentGrid";
import { Googlereview } from "../components/Googlereview";
import StaticServicesGrid from "../components/Home/BlogNTrillion";
import ApiMarketingHero from "../components/Home/ApiMarketing";
import ImageCarousel from "../components/Home/Hero";
import SchemaMarkup from "../components/SchemaMarkup";
import { generateHomepageSchemas } from "../utils/schema";
import Seo from "../components/Seo";


export const Home = () => {
  const homepageSchemas = generateHomepageSchemas();
  return (
    <>
    <Seo
                  title="SocialBureau Careers | Join India’s Fastest-Growing Creative & Digital Agency"
                  description="Explore exciting career opportunities at SocialBureau. Join our team of designers, marketers, developers, and creators shaping the future of digital experiences."
                  keywords="socialbureau careers, trillionedition llp jobs, api marketing jobs, digital marketing career, seo expert jobs india, creative agency hiring, video editor hiring, content writer jobs, performance marketing openings, join socialbureau"
                  image="/assets/socialbureau.png"
                  canonicalUrl="https://www.socialbureau.in"
                />
      <SchemaMarkup data={homepageSchemas} />
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