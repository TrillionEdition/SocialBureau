import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../utils/urls";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ModernTemplate from "./ModernTemplate";

// Add other templates here as they are created
const templates = {
  template1: ModernTemplate,
  modern: ModernTemplate,
};

const DynamicPartnershipPage = () => {
  const { slug } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await fetch(`${BASE_URL}/partners/${slug}`);
        const data = await response.json();
        if (data.success) {
          setPartner(data.data);
        } else {
          setError(data.message || "Portfolio not found");
        }
      } catch (err) {
        setError("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400">{error}</p>
      </div>
    </div>
  );

  const TemplateComponent = templates[partner.templateId] || ModernTemplate;
  
  // Combine top-level fields with details for the template
  const templateData = {
    ...partner.details,
    name: partner.name,
    subtitle: partner.subtitle,
    heroImage: partner.image,
  };

  return <TemplateComponent data={templateData} />;
};

export default DynamicPartnershipPage;
