import { useMemo } from "react";

import BlueprintCover from "./blueprint/BlueprintCover";
import ExecutiveSummary from "./blueprint/ExecutiveSummary";
import TeamStructure from "./blueprint/TeamStructure";
import KPIFramework from "./blueprint/KPIFramework";
import PlatformStrategy from "./blueprint/PlatformStrategy";
import ToolStack from "./blueprint/ToolStack";
import Roadmap90Days from "./blueprint/Roadmap90Days";
import RiskSection from "./blueprint/RiskSection";
import ClosingRecommendations from "./blueprint/ClosingRecommendations";

import { generateBlueprint } from "../utils/blueprintGenerator";

export default function Blueprint({
  formData,
}) {
  const blueprint = useMemo(() => {
    return generateBlueprint(formData);
  }, [formData]);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">

      <BlueprintCover
        company={formData.company_name}
        blueprint={blueprint}
      />

      <ExecutiveSummary
        blueprint={blueprint}
      />

      <TeamStructure
        blueprint={blueprint}
      />

      <KPIFramework
        blueprint={blueprint}
      />

      <PlatformStrategy
        blueprint={blueprint}
      />

      <ToolStack
        blueprint={blueprint}
      />

      <Roadmap90Days
        blueprint={blueprint}
      />

      <RiskSection
        blueprint={blueprint}
      />

      <ClosingRecommendations
        blueprint={blueprint}
      />
    </div>
  );
}