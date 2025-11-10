import {
  FaBullseye,
  FaGlobe,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaMousePointer,
  FaSyncAlt,
  FaLink,
  FaCogs,
  FaChartBar,
  FaMapMarkerAlt,
  FaNetworkWired,
  FaShareAlt,
  FaChartPie,
  FaFlask,
  FaLightbulb,
  FaSearch,
  FaBullhorn,
  FaBrain,
  FaServer,
  FaPlug,
  FaDatabase,
  FaHandshake,
  FaPuzzlePiece,
  FaMeh,
} from "react-icons/fa";

const servicesData = {
  "API-Marketing": {
    title: "API Marketing",
    meta: {
      title: "API Marketing | Social Bureau",
      description:
        "Automate ad delivery, audiences, and reporting using Meta, Google, TikTok, LinkedIn & more through APIs.",
    },
    hero: {
      headline: "Eliminate Manual Work. Automate Growth Through APIs.",
      highlight: "Automate",
      subtext:
        "Machine-to-machine marketing. Campaigns sync based on real-time triggers, not human reaction time.",
    },
    problems: {
      title: "What’s Slowing",
      highlight: "You Down",
      items: [
        { title: "Manual campaign setup", icon: <FaMousePointer /> },
        { title: "Delayed reporting & syncing", icon: <FaSyncAlt /> },
        { title: "Scattered platform management", icon: <FaLink /> },
      ],
    },
    deliveries: {
      title: "What We",
      highlight: "Automate",
      items: [
        {
          title: "Campaign creation & sync",
          description: "Sync ad campaigns across all platforms without logging in manually.",
          icon: <FaCogs />,
        },
        {
          title: "API audience automation",
          description:
            "Create & update custom audiences automatically based on user events and CRM signals.",
          icon: <FaUsers />,
        },
        {
          title: "Unified dashboards",
          description: "View campaign performance from all platforms on one dashboard.",
          icon: <FaChartBar />,
        },
        {
          title: "Predictive budget allocation",
          description: "Spend shifts to outperforming platforms automatically.",
          icon: <FaBrain />,
        },
      ],
    },
    whyItWorks: {
      title: "Data Is Faster",
      highlight: "Than Humans",
      subtext: "When platforms talk to each other, growth compounds automatically.",
    },
    cta: {
      headline: "Ready to automate your campaigns?",
      button: "Automate Growth",
      link: "tel:+918921840486",
    },
  },

  "Performance-Marketing": {
    title: "Performance Marketing",
    meta: {
      title: "Performance Marketing | Social Bureau",
      description:
        "Full-funnel performance engineering tied to revenue, not vanity metrics.",
    },
    hero: {
      headline: "ROI Is Not Magic. It’s Architecture.",
      highlight: "ROI",
      subtext: "We engineer funnels tied to revenue and business outcomes.",
    },
    problems: {
      title: "What’s Killing Your",
      highlight: "ROI",
      items: [
        { title: "Scattered spend", icon: <FaPuzzlePiece /> },
        { title: "Expensive CAC", icon: <FaChartLine /> },
        { title: "Clicks, no conversions", icon: <FaMousePointer /> },
      ],
    },
    deliveries: {
      title: "What We",
      highlight: "Deliver",
      items: [
        {
          title: "Accurate audience targeting",
          description:
            "Industry-specific consumer behavior + custom segmentation.",
          icon: <FaUsers />,
        },
        {
          title: "Sprint-based campaigns",
          description: "Optimizations based on data, not assumptions.",
          icon: <FaRocket />,
        },
        {
          title: "Lifetime-value optimization",
          description: "We optimize for profit, not vanity ROAS.",
          icon: <FaBullseye />,
        },
        {
          title: "Full funnel CRO",
          description: "Every touchpoint optimized.",
          icon: <FaFlask />,
        },
      ],
    },
    whyItWorks: {
      title: "Conversion Lives",
      highlight: "In the Funnel",
      subtext: "We transform your ad spend into predictable revenue.",
    },
    cta: {
      headline: "Ready to unlock full-funnel ROI?",
      button: "Talk to Growth Team",
      link: "tel:+918921840486",
    },
  },

  "Platform-Prompting": {
    title: "Platform Prompting™",
    meta: {
      title: "Platform Prompting™ | Social Bureau",
      description:
        "Train platforms like Meta, Google, TikTok to understand your brand context & intent.",
    },
    hero: {
      headline: "Teach Platforms How To Sell You.",
      highlight: "Teach",
      subtext:
        "We train Meta, Google, TikTok & LinkedIn algorithms to identify your customer with precision.",
    },
    problems: {
      title: "Your Ads Are",
      highlight: "Invisible",
      items: [
        { title: "Platforms don’t understand your product", icon: <FaBullhorn /> },
        { title: "Audience mismatch", icon: <FaSearch /> },
        { title: "High cost per lead", icon: <FaBullseye /> },
      ],
    },
    deliveries: {
      title: "How We",
      highlight: "Train Algorithms",
      items: [
        {
          title: "Brand → Platform language translation",
          description: "Convert USP → Platform learning signals.",
          icon: <FaBrain />,
        },
        {
          title: "Signal feeding",
          description: "Teach platforms who your best buyers actually are.",
          icon: <FaShareAlt />,
        },
        {
          title: "Prompt engineering for ads",
          description:
            "We create structured prompts that influence machine learning.",
          icon: <FaLightbulb />,
        },
      ],
    },
    whyItWorks: {
      title: "Platform Understands",
      highlight: "Context",
      subtext:
        "Better understanding → Higher relevance → Lower CAC.",
    },
    cta: {
      headline: "Want platforms to recognize your brand?",
      button: "Train Algorithms",
      link: "tel:+918921840486",
    },
  },

  "Multi-Platform-Ad-Management": {
    title: "Multi-Platform Ad Management",
    meta: {
      title: "Multi-Platform Ad Management | Social Bureau",
      description: "Run every global ad platform from one command center.",
    },
    hero: {
      headline: "One System. Every Platform.",
      highlight: "Every",
      subtext: "Meta. Google. TikTok. LinkedIn. Reddit. All synced.",
    },
    problems: {
      title: "Managing Ads Is",
      highlight: "Chaos",
      items: [
        { title: "Different dashboards", icon: <FaServer /> },
        { title: "Reporting delays", icon: <FaMapMarkerAlt /> },
        { title: "No unified budget management", icon: <FaChartPie /> },
      ],
    },
    deliveries: {
      title: "We Centralize Your",
      highlight: "Ads",
      items: [
        {
          title: "One dashboard",
          description: "Control budgets across all platforms.",
          icon: <FaGlobe />,
        },
        {
          title: "Bid automation",
          description: "Shift spend to platforms performing better.",
          icon: <FaCogs />,
        },
        {
          title: "Cross-platform retargeting",
          description:
            "One event → multi-platform action.",
          icon: <FaNetworkWired />,
        },
      ],
    },
    whyItWorks: {
      title: "Control",
      highlight: "Everything",
      subtext: "Your budgets, your data, your outcomes.",
    },
    cta: {
      headline: "Ready to unify ad management?",
      button: "Unify Platforms",
      link: "tel:+918921840486",
    },
  },

  "Content-Niche-Marketing": {
    title: "Content & Niche Marketing",
    meta: {
      title: "Content & Niche Marketing | Social Bureau",
      description: "Hyper-targeted content engineered for conversion psychology.",
    },
    hero: {
      headline: "Content That Converts, Not Just Exists.",
      highlight: "Converts",
      subtext: "Aesthetics matter. Psychology closes.",
    },
    problems: {
      title: "Your Content Isn’t",
      highlight: "Specific",
      items: [
        { title: "Generic messaging", icon: <FaBullhorn /> },
        { title: "Low resonance", icon: <FaMeh /> },
        { title: "Confusing narrative", icon: <FaBrain /> },
      ],
    },
    deliveries: {
      title: "We Create",
      highlight: "Conversion Content",
      items: [
        {
          title: "Niche psychology",
          description:
            "Messaging based on ethnographic and linguistic insights.",
          icon: <FaSearch />,
        },
        {
          title: "Vertical-specific content",
          description:
            "Content that speaks the language of your industry.",
          icon: <FaUsers />,
        },
        {
          title: "Behavior-first creative",
          description: "Designed for engagement + conversion.",
          icon: <FaLightbulb />,
        },
      ],
    },
    whyItWorks: {
      title: "Content Starts",
      highlight: "Conversation",
      subtext: "Storytelling that converts strangers into buyers.",
    },
    cta: {
      headline: "Ready for niche domination?",
      button: "Talk Strategy",
      link: "tel:+918921840486",
    },
  },

  "SEO-Influencer": {
    title: "SEO & Influencer",
    meta: {
      title: "SEO + Influencer | Social Bureau",
      description: "Demand capturing meets demand influencing.",
    },
    hero: {
      headline: "Rank. Influence. Own Mindshare.",
      highlight: "Own",
      subtext:
        "SEO + influencer together → capture intent + shape behavior.",
    },
    problems: {
      title: "Visibility Is",
      highlight: "Not Enough",
      items: [
        { title: "Traffic without trust", icon: <FaBullhorn /> },
        { title: "Search without brand recall", icon: <FaSearch /> },
        { title: "Influence without attribution", icon: <FaBrain /> },
      ],
    },
    deliveries: {
      title: "We Deliver",
      highlight: "Visibility + Influence",
      items: [
        {
          title: "Search engine dominance",
          description: "Technical SEO, schema, LSI optimization.",
          icon: <FaSearch />,
        },
        {
          title: "Creator partnership",
          description: "Creators selected based on ROI, not follower count.",
          icon: <FaHandshake />,
        },
        {
          title: "Multi-channel reputation score",
          description: "Measure trust → influence → conversions.",
          icon: <FaChartBar />,
        },
      ],
    },
    whyItWorks: {
      title: "Demand Is",
      highlight: "Engineered",
      subtext:
        "Visibility (SEO) + Trust (Influencer) = Growth engine.",
    },
    cta: {
      headline: "Ready to rank & influence?",
      button: "Grow Brand",
      link: "tel:+918921840486",
    },
  },

  "Analytics": {
    title: "Analytics",
    meta: {
      title: "Analytics & Dashboarding | Social Bureau",
      description: "Full clarity: dashboards, attribution, insights.",
    },
    hero: {
      headline: "Data That Thinks Before You Ask.",
      highlight: "Thinks",
      subtext: "You shouldn't wait 7 days to make a growth decision.",
    },
    problems: {
      title: "You’re Flying",
      highlight: "Blind",
      items: [
        { title: "No attribution", icon: <FaShareAlt /> },
        { title: "Delayed insights", icon: <FaMapMarkerAlt /> },
        { title: "No idea where money leaks", icon: <FaChartPie /> },
      ],
    },
    deliveries: {
      title: "We Build",
      highlight: "Visibility",
      items: [
        {
          title: "Unified dashboards",
          description:
            "Google Analytics, Meta, LinkedIn in one dashboard.",
          icon: <FaDatabase />,
        },
        {
          title: "Attribution clarity",
          description: "Know exactly what drives revenue.",
          icon: <FaChartBar />,
        },
        {
          title: "Predictive insights",
          description: "AI identifies future winners.",
          icon: <FaBrain />,
        },
      ],
    },
    whyItWorks: {
      title: "Data Drives",
      highlight: "Decisions",
      subtext: "You don't grow faster by guessing.",
    },
    cta: {
      headline: "Want dashboard clarity?",
      button: "See Demo",
      link: "tel:+918921840486",
    },
  },

  "MarTech": {
    title: "MarTech Integration",
    meta: {
      title: "MarTech & Automation | Social Bureau",
      description:
        "CRM automation, CDP integration, server-side events, API workflows.",
    },
    hero: {
      headline: "Your Stack Is Your Advantage.",
      highlight: "Stack",
      subtext: "Best tools win only if they're integrated.",
    },
    problems: {
      title: "Your Stack Is",
      highlight: "Scattered",
      items: [
        { title: "Lead routing mess", icon: <FaPlug /> },
        { title: "No automation", icon: <FaServer /> },
        { title: "Fragmented customer experience", icon: <FaUsers /> },
      ],
    },
    deliveries: {
      title: "We Integrate",
      highlight: "Everything",
      items: [
        {
          title: "CRM automation",
          description:
            "HubSpot, Salesforce, Zoho synced with your funnel.",
          icon: <FaShareAlt />,
        },
        {
          title: "Tracking + attribution",
          description: "Server-side events + CDP sync.",
          icon: <FaNetworkWired />,
        },
        {
          title: "Funnel-wide automation",
          description:
            "Multi-platform workflows triggered by user actions.",
          icon: <FaCogs />,
        },
      ],
    },
    whyItWorks: {
      title: "Integration Builds",
      highlight: "Scale",
      subtext: "Automation = compounding ROI.",
    },
    cta: {
      headline: "Want automation without chaos?",
      button: "Integrate System",
      link: "tel:+918921840486",
    },
  },

  "Global-Media-Buying": {
    title: "Global Media Buying",
    meta: {
      title: "Global Media Buying | Social Bureau",
      description: "Programmatic DSP / DV360 / Amazon DSP / OTT media buying.",
    },
    hero: {
      headline: "Your Ads. Worldwide.",
      highlight: "Worldwide",
      subtext: "Launch campaigns across 50+ markets from one command center.",
    },
    problems: {
      title: "Your Growth Is",
      highlight: "Local",
      items: [
        { title: "Geography-limited ads", icon: <FaGlobe /> },
        { title: "No DSP access", icon: <FaServer /> },
        { title: "No global funnel tracking", icon: <FaMapMarkerAlt /> },
      ],
    },
    deliveries: {
      title: "We Buy",
      highlight: "Globally",
      items: [
        {
          title: "Programmatic DSP buying",
          description:
            "DV360 / Amazon DSP / OTT target audiences at scale.",
          icon: <FaRocket />,
        },
        {
          title: "Localized funnels",
          description:
            "Language + culture specific assets.",
          icon: <FaUsers />,
        },
        {
          title: "One dashboard",
          description: "Run 10+ countries in one dashboard.",
          icon: <FaDatabase />,
        },
      ],
    },
    whyItWorks: {
      title: "Global Growth",
      highlight: "Starts Now",
      subtext: "You're one campaign away from entering global markets.",
    },
    cta: {
      headline: "Ready to enter new markets?",
      button: "Start Global",
      link: "tel:+918921840486",
    },
  },

  "Third-Party-App-Ads": {
    title: "Third-Party App Ads",
    meta: {
      title: "Third-Party App Ads | Social Bureau",
      description: "Run ads in apps like Swiggy, Zomato, Meesho, ShareChat, DailyHunt.",
    },
    hero: {
      headline: "Attention Is Outside Social Media.",
      highlight: "Outside",
      subtext: "App ads = new acquisition channels.",
    },
    problems: {
      title: "You’re Missing",
      highlight: "Attention",
      items: [
        { title: "Competing inside the same ad platforms", icon: <FaGlobe /> },
        { title: "Unsaturated high-intent inventory", icon: <FaBullseye /> },
        { title: "No attribution on app ads", icon: <FaMapMarkerAlt /> },
      ],
    },
    deliveries: {
      title: "We Unlock",
      highlight: "New Channels",
      items: [
        {
          title: "App ad placements",
          description: "Zomato, Swiggy, Meesho, DailyHunt & more.",
          icon: <FaGlobe />,
        },
        {
          title: "Funnel entry points",
          description:
            "Turn app ad clicks into CRM and journeys.",
          icon: <FaShareAlt />,
        },
        {
          title: "Attribution setup",
          description:
            "Track revenue coming from third-party apps.",
          icon: <FaDatabase />,
        },
      ],
    },
    whyItWorks: {
      title: "Attention Is",
      highlight: "Inventory",
      subtext: "Go where competitors aren't.",
    },
    cta: {
      headline: "Ready to break platform dependency?",
      button: "Open New Channels",
      link: "tel:+918921840486",
    },
  },

  "Innovation-R&D": {
    title: "Innovation & R&D",
    meta: {
      title: "Innovation & R&D | Social Bureau",
      description:
        "Experimentation, predictive modeling, early platform adoption, internal API tools.",
    },
    hero: {
      headline: "We Invent What Doesn’t Exist Yet.",
      highlight: "Invent",
      subtext:
        "Beta ad platforms, experiment systems, and custom API-led products for unfair advantage.",
    },
    problems: {
      title: "Innovation Should Be",
      highlight: "Measured",
      items: [
        { title: "Stagnant campaigns", icon: <FaFlask /> },
        { title: "No structured experimentation", icon: <FaBrain /> },
        { title: "No IP advantage", icon: <FaLightbulb /> },
      ],
    },
    deliveries: {
      title: "We Build",
      highlight: "Edge",
      items: [
        {
          title: "Predictive ad experiments",
          description: "Learn fast. Scale faster.",
          icon: <FaRocket />,
        },
        {
          title: "Early-beta platform access",
          description: "Get access before the market catches up.",
          icon: <FaBullseye />,
        },
        {
          title: "Internal API tools",
          description: "Custom code to automate workflows & reporting.",
          icon: <FaServer />,
        },
      ],
    },
    whyItWorks: {
      title: "Innovation Creates",
      highlight: "Monopoly",
      subtext: "Move where competitors can't see yet.",
    },
    cta: {
      headline: "Want an unfair advantage?",
      button: "Start Experimenting",
      link: "tel:+918921840486",
    },
  },
};

export default servicesData;
