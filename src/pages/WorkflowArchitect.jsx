import { useState } from "react";

import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import ProgressBar from "../components/ProgressBar";
import StepNavigation from "../components/StepNavigation";

import Step1Business from "../components/steps/Step1Business";
import Step2DigitalPresence from "../components/steps/Step2DigitalPresence";
import Step3Performance from "../components/steps/Step3Performance";
import Step4Challenges from "../components/steps/Step4Challenges";
import Step5Goals from "../components/steps/Step5Goals";
import Step6TeamBudget from "../components/steps/Step6TeamBudget";
import Step7Workflow from "../components/steps/Step7Workflow";

import Paywall from "../components/Paywall";
import GeneratingScreen from "../components/GeneratingScreen";
import Blueprint from "../components/Blueprint";

const TOTAL_STEPS = 7;

export default function WorkflowArchitect() {
  const [currentStep, setCurrentStep] = useState(1);

  const [showPaywall, setShowPaywall] = useState(false);

  const [showGenerating, setShowGenerating] = useState(false);

  const [showBlueprint, setShowBlueprint] = useState(false);

  const [blueprintData, setBlueprintData] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    contact_role: "",
    contact_email: "",
    contact_phone: "",
    services_needed: [],
    reporting_frequency: "",
    communication_channel: "",
    access_provided: [],
    final_notes: "",
    industry: "",
    biz_size: "",
    biz_stage: "",
    geography: "",
    audience: "",
    main_obj: "",
    usp: "",
    digital_rating: 7,
    primary_challenge: "",
    previous_attempts: "",
    competitor_1: "",
    competitor_2: "",
    competitor_3: "",
    platforms: [],
    content_types: [],
    digital_team_size: "",
    engagement_model: "",
    marketing_budget: "",
    ads_budget: "",
    roi_timeframe: "",
    current_tools: "",
    urls: {
      website: "",
      instagram: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      other: "",
    },
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNested = (group, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const goStep = (step) => {
    setCurrentStep(step);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmitWizard = () => {
    setShowPaywall(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePaymentSuccess = () => {
    setShowPaywall(false);
    setShowGenerating(true);

    setTimeout(() => {
      setShowGenerating(false);

      setBlueprintData({
        company: formData.company_name,
      });

      setShowBlueprint(true);
    }, 14000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Business
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
          />
        );

      case 2:
        return (
          <Step2DigitalPresence
            formData={formData}
            updateField={updateField}
            updateNested={updateNested}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 3:
        return (
          <Step3Performance
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 4:
        return (
          <Step4Challenges
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 5:
        return (
          <Step5Goals
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 6:
        return (
          <Step6TeamBudget
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 7:
        return (
          <Step7Workflow
            formData={formData}
            updateField={updateField}
            previousStep={previousStep}
            onSubmit={handleSubmitWizard}
          />
        );

      default:
        return null;
    }
  };

  if (showGenerating) {
    return <GeneratingScreen />;
  }

  if (showBlueprint) {
    return (
      <Blueprint
        data={blueprintData}
        formData={formData}
      />
    );
  }

  if (showPaywall) {
    return (
      <Paywall
        companyName={formData.company_name}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <Topbar />

      <Hero />

      <ProgressBar
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />

      <StepNavigation
        currentStep={currentStep}
        goStep={goStep}
      />

      <div className="max-w-[920px] mx-auto px-10 pb-20">
        {renderStep()}
      </div>
    </div>
  );
}