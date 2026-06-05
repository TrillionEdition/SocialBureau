const DEFAULT_TEAM = [
  {
    title: "Marketing Manager",
    type: "Leadership",
    model: "Core",
    description:
      "Owns overall marketing execution and reporting.",
    tasks: [
      "Campaign planning",
      "KPI reviews",
      "Vendor coordination",
      "Performance reporting",
    ],
  },
  {
    title: "Content Strategist",
    type: "Marketing",
    model: "Core",
    description:
      "Responsible for content planning and brand messaging.",
    tasks: [
      "Content calendar",
      "Campaign themes",
      "Platform planning",
      "Audience research",
    ],
  },
  {
    title: "Graphic Designer",
    type: "Creative",
    model: "Support",
    description:
      "Creates static and visual assets.",
    tasks: [
      "Social creatives",
      "Campaign assets",
      "Brand consistency",
    ],
  },
  {
    title: "Video Editor",
    type: "Creative",
    model: "Support",
    description:
      "Handles reels, shorts and long-form editing.",
    tasks: [
      "Video editing",
      "YouTube content",
      "Reels production",
    ],
  },
];

const DEFAULT_TOOLS = [
  {
    name: "Google Analytics",
    category: "Analytics",
    purpose:
      "Track traffic and conversions",
    cost: "Free",
  },
  {
    name: "Google Search Console",
    category: "SEO",
    purpose:
      "Search visibility tracking",
    cost: "Free",
  },
  {
    name: "Canva Pro",
    category: "Design",
    purpose:
      "Creative production",
    cost: "₹500/month",
  },
  {
    name: "ChatGPT",
    category: "AI",
    purpose:
      "Content and workflow support",
    cost: "Variable",
  },
];

export function generateBlueprint(
  formData
) {
  const team =
    generateTeam(formData);

  const kpis =
    generateKPIs(formData);

  const platforms =
    generatePlatforms(formData);

  const roadmap =
    generateRoadmap(formData);

  const risks =
    generateRisks(formData);

  return {
    summary:
      generateSummary(formData),

    priorities:
      generatePriorities(formData),

    recommendation:
      generateRecommendation(
        formData
      ),

    team,

    kpis,

    platforms,

    roadmap,

    risks,

    tools:
      generateTools(formData),
  };
}

/* ------------------------ */
/* SUMMARY */
/* ------------------------ */

function generateSummary(
  formData
) {
  return `
${formData.company_name}
operates in the
${formData.industry}
sector and is currently focused on
${(formData.goals || [])
  .join(", ")
  .replaceAll("_", " ")}.

Based on the current business stage, team size, marketing maturity and
identified challenges, the primary focus should be improving workflow
efficiency, content consistency, lead generation and measurable KPI
tracking.

A structured digital team supported by documented processes and
automation will significantly improve execution speed and growth outcomes.
`;
}

/* ------------------------ */
/* PRIORITIES */
/* ------------------------ */

function generatePriorities(
  formData
) {
  const list = [];

  if (
    formData.goals?.includes(
      "lead_generation"
    )
  ) {
    list.push(
      "Build Lead Generation Engine"
    );
  }

  if (
    formData.goals?.includes(
      "brand_awareness"
    )
  ) {
    list.push(
      "Increase Brand Visibility"
    );
  }

  if (
    formData.goals?.includes(
      "sales_growth"
    )
  ) {
    list.push(
      "Improve Revenue Growth"
    );
  }

  list.push(
    "Create KPI Accountability"
  );

  return list.slice(0, 4);
}

/* ------------------------ */
/* TEAM */
/* ------------------------ */

function generateTeam(
  formData
) {
  const team = [...DEFAULT_TEAM];

  if (
    formData.platforms?.includes(
      "youtube"
    )
  ) {
    team.push({
      title:
        "YouTube Strategist",
      type: "Growth",
      model: "Specialist",
      description:
        "Responsible for YouTube growth.",
      tasks: [
        "SEO",
        "Publishing",
        "Analytics",
      ],
    });
  }

  if (
    formData.goals?.includes(
      "lead_generation"
    )
  ) {
    team.push({
      title:
        "Performance Marketer",
      type: "Ads",
      model: "Core",
      description:
        "Runs paid acquisition campaigns.",
      tasks: [
        "Meta Ads",
        "Google Ads",
        "Lead Funnels",
      ],
    });
  }

  return team;
}

/* ------------------------ */
/* KPIs */
/* ------------------------ */

function generateKPIs(
  formData
) {
  return [
    {
      name:
        "Monthly Leads",
      current:
        formData.current_leads || 0,
      target:
        formData.target_leads || 100,
      owner:
        "Marketing Manager",
    },

    {
      name:
        "Website Traffic",
      current:
        formData.web_v || 0,
      target:
        Number(
          formData.web_v || 0
        ) * 2,
      owner:
        "SEO Specialist",
    },

    {
      name:
        "Engagement Rate",
      current:
        formData.eng_r || "0%",
      target: "5%",
      owner:
        "Content Strategist",
    },

    {
      name:
        "Revenue",
      current:
        formData.current_revenue || 0,
      target:
        formData.target_revenue || 0,
      owner:
        "Sales Team",
    },
  ];
}

/* ------------------------ */
/* PLATFORMS */
/* ------------------------ */

function generatePlatforms(
  formData
) {
  return (
    formData.platforms || []
  ).map((platform) => ({
    name: platform,
    priority: "High",
    frequency:
      "4-6 posts/week",
    mix:
      "Educational + Promotional + Authority",
    action:
      "Maintain consistent publishing and KPI tracking.",
  }));
}

/* ------------------------ */
/* TOOLS */
/* ------------------------ */

function generateTools() {
  return DEFAULT_TOOLS;
}

/* ------------------------ */
/* RISKS */
/* ------------------------ */

function generateRisks(
  formData
) {
  const risks = [];

  if (
    !formData.analytics ||
    formData.analytics ===
      "none"
  ) {
    risks.push(
      "No reliable analytics system in place."
    );
  }

  if (
    !formData.marketing_team
  ) {
    risks.push(
      "Marketing ownership is unclear."
    );
  }

  if (
    !formData.content_who ||
    formData.content_who ===
      "nobody"
  ) {
    risks.push(
      "No dedicated content production process."
    );
  }

  risks.push(
    "Growth may slow without consistent KPI reviews."
  );

  return risks;
}

/* ------------------------ */
/* ROADMAP */
/* ------------------------ */

function generateRoadmap() {
  return [
    {
      phase:
        "Foundation",
      duration:
        "Days 1-30",
      focus:
        "Setup systems and workflows",
      tasks: [
        "KPI dashboard setup",
        "Team alignment",
        "Analytics implementation",
        "Content planning",
      ],
    },

    {
      phase:
        "Execution",
      duration:
        "Days 31-60",
      focus:
        "Launch campaigns",
      tasks: [
        "Publishing schedule",
        "Lead generation",
        "SEO improvements",
        "Reporting process",
      ],
    },

    {
      phase:
        "Optimization",
      duration:
        "Days 61-90",
      focus:
        "Scale performance",
      tasks: [
        "A/B testing",
        "Workflow automation",
        "Budget optimization",
        "Growth review",
      ],
    },
  ];
}

/* ------------------------ */
/* RECOMMENDATION */
/* ------------------------ */

function generateRecommendation(
  formData
) {
  return `
For ${formData.company_name}, the recommended model is a
hybrid execution structure combining internal ownership,
specialist support and automation.

Focus should be placed on consistent content production,
performance tracking, lead generation systems
and KPI accountability.

The first 90 days should prioritize implementation discipline over
rapid scaling.
`;
}