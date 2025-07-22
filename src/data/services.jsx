import {
  FaBullseye,
  FaChartLine,
  FaDraftingCompass,
  FaExchangeAlt,
  FaEyeSlash,
  FaFlask,
  FaMousePointer,
  FaPuzzlePiece,
  FaRocket,
  FaShareSquare,
  FaUsers,
  FaTools,
  FaSuitcase,
  FaBullhorn,
  FaMeh,
  FaSearch,
  FaTags,
  FaVial,
  FaTachometerAlt,
  FaPuzzlePiece as FaTechPuzzle,
  FaLink,
  FaCalendarAlt,
  FaBolt,
  FaBook,
  FaPaintBrush,
  FaVideo,
  FaFilm,
  FaMapMarkerAlt,
  FaRobot,
  FaGlobe,
  FaFlask as FaTestFlask,
  FaBriefcase,
  FaSignOutAlt,
  FaCalculator,
  FaBrain,
  FaHourglassHalf,
  FaCubes,
  FaClone,
  FaProjectDiagram,
  FaVials,
  FaRegClock,
  FaUserClock,
  FaSyncAlt,
  FaMicroscope,
  FaMoneyBillWave,
  FaRetweet,
  FaQuestionCircle,
  FaHandshake,
  FaChartBar,
  FaShoppingCart,
  FaBalanceScale,
  FaChartPie
} from "react-icons/fa";

const servicesData = {
  "Full-Funnel Performance Marketing": {
    meta: {
      title: "Full-Funnel Performance Marketing Agency for Niche Brands | Social Bureau",
      description: "Maximize ROI with full-funnel performance marketing designed for niche brands. We engineer strategies that turn ad spend into sustainable growth.",
    },
    hero: {
      headline: "Beyond the Click: Performance Marketing that Actually Performs",
      highlight: "Performance Marketing",
      subtext: "Your audience isn’t one-size-fits-all, neither is our approach. We design full-funnel campaigns tailored to your vertical, optimized for outcomes that compound.",
    },
    problems: {
      title: "Pain",
      highlight: "We Solve",
      items: [
        { title: "Fragmented spend across disconnected platforms", icon: <FaPuzzlePiece className="text-[#ff0000] text-3xl mb-4" /> },
        { title: "Rising CAC with no meaningful LTV growth", icon: <FaChartLine className="text-[#ff0000] text-3xl mb-4" /> },
        { title: "Clicks that never translate into conversions", icon: <FaMousePointer className="text-[#ff0000] text-3xl mb-4" /> },
      ],
    },
    deliveries: {
      title: "What",
      highlight: "We Deliver",
      items: [
        { title: "Vertical-specific audience segmentation", description: "Precision targeting based on your industry's unique behavioral patterns", icon: <FaUsers className="text-white text-lg" /> },
        { title: "14-day creative sprints tied to real business KPIs", description: "Rapid iteration cycles tied to real business KPIs, not vanity metrics", icon: <FaRocket className="text-white text-lg" /> },
        { title: "Bid strategies mapped to customer LTV, not vanity ROAS", description: "Intelligent bidding based on customer lifetime value, not vanity ROAS", icon: <FaBullseye className="text-white text-lg" /> },
        { title: "Continuous A/B testing at every funnel stage", description: "Systematic optimization at every funnel stage for maximum efficiency", icon: <FaFlask className="text-white text-lg" /> },
      ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "We don’t chase impressions. We architect systems that turn attention into revenue and keep compounding it.",
    },
    cta: {
      headline: "Ready to unlock full-funnel ROI?",
      button: "Talk to a Growth Operator",
      link: "tel:+916238422887",
    },
  },

  "Funnel Architecture & Growth Pathways": {
    meta: {
      title: "Funnel Architecture & Growth Strategy for Scaling Brands | Social Bureau",
      description: "Design customer journeys that convert. We build funnel architectures that map awareness to revenue with P&L-aligned growth pathways.",
    },
    hero: {
      headline: "Leaky Funnels Kill Growth, We Seal and Scale Yours",
      highlight: "Seal and Scale",
      subtext: "You’re driving traffic, but few convert. There’s no clear path from discovery to revenue. Your funnel isn’t a system, it’s a gamble.",
    },
    problems: {
      title: "What",
      highlight: "We Fix",
      items: [
        { title: "Mismatched messaging across funnel stages", icon: <FaExchangeAlt className="text-[#ff0000] text-3xl mb-4" /> },
        { title: "Weak handoffs between awareness and conversion", icon: <FaShareSquare className="text-[#ff0000] text-3xl mb-4" /> },
        { title: "Lack of data visibility on user behavior and LTV", icon: <FaEyeSlash className="text-[#ff0000] text-3xl mb-4" /> },
      ],
    },
    deliveries: {
      title: "Our",
      highlight: "Method",
      items: [
        { title: "End-to-end funnel blueprinting", description: "Custom funnel strategies designed specifically for the behaviors and needs of your target niche.", icon: <FaDraftingCompass /> },
        { title: "Conversion and retention architecture", description: "Structured frameworks that drive initial conversions and build long-term customer loyalty.", icon: <FaTools /> },
        { title: "CRO-informed journey optimization", description: "Every touchpoint is optimized using conversion rate insights to boost performance across the funnel.", icon: <FaChartLine/> },
        { title: "Funnel-as-P&L-system, not as a marketing theory", description: "We treat your funnel like a business model — focused on profit, not just traffic or impressions.", icon: <FaBriefcase/> },
      ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "We turn funnels from guesswork into systems aligned with revenue.",
    },
    cta: {
      headline: "Map Your Growth Journey Now",
      button: "Schedule Discovery",
      link: "tel:+916238422887",
    },
  },

  "Conversion Rate Optimization & Landing Systems": {
    meta: {
      title: "Conversion Rate Optimization & Landing Pages That Convert | Social Bureau",
      description: "High-converting landing pages and CRO systems based on psychology, friction scoring, and micro-experiments—built for niche markets.",
    },
    hero: {
      headline: "Stop Losing Customers on the Last Click",
      highlight: "Last Click",
      subtext: "Your ad worked. They clicked. But your page didn’t convert and now they’re gone.",
    },
    problems: {
      title: "Results You ",
      highlight: "Can Expect",
      items: [
        { title: "Reduced bounce rate", icon: <FaSignOutAlt/> },
        { title: "Higher add-to-cart or lead form submissions", icon: <FaShoppingCart /> },
        { title: "Better funnel performance downstream", icon: <FaTachometerAlt /> },
      ],
    },
    deliveries: {
      title: "What",
      highlight: "We Do",
      items: [
        { title: "Rapid friction scoring audits", description: "Quickly identify drop-off points and usability blockers across your funnel with precision scoring.", icon: <FaCalculator/> },
        { title: "Psychology-based copy and CTA design", description: "Craft messaging and calls-to-action rooted in behavioral psychology to boost user response.", icon: <FaBrain/> },
        { title: "72-hour micro-tests for real-world proof", description: "Launch fast, data-backed experiments to validate ideas and optimize without guesswork.", icon: <FaHourglassHalf/> },
        { title: "Modular landing systems customized per niche", description: "Deploy flexible landing page components tailored to your audience, offer, and vertical.", icon: <FaCubes/> },
      ],
    },
    whyItWorks: {
  title: "Why",
  highlight: "It Works",
  subtext: "Our landing systems are engineered to test, learn, and maximize user action through behavioral insights, UX precision, and CRO best practices.",
},
    cta: {
      headline: "Want Pages That Convert? Let’s Test That.",
      button: "",
      link: "tel:+916238422887",
    },
  },

  "Messaging & Positioning for Niche Brands": {
    meta: {
      title: "Messaging & Brand Positioning for Niche Audiences | Social Bureau",
      description: "Go beyond generic messaging. We uncover linguistic, cultural, and psychological drivers that differentiate your brand in saturated markets.",
    },
    hero: {
      headline: "Messaging That Resonates, Not Just Fills Space",
      highlight: "Resonates",
      subtext: "Generic messages don’t cut it. You need positioning that speaks your audience’s language.",
    },
    problems: {
      title: "What ",
      highlight: "We Solve",
      items: [
        { title: "Generic brand voice that lacks market traction", icon: <FaBullhorn/> },
        { title: "Copy that doesn’t speak your niche’s language", icon: <FaMeh/> },
        { title: "Weak differentiation in crowded categories", icon: <FaClone/> },
      ],
    },
    deliveries: {
      title: "How",
      highlight: "We Do It",
      items: [
        { title: "Linguistic + ethnographic market research", description: "Uncover deep customer insights through language patterns and cultural context analysis.", icon: <FaSearch/> },
        { title: "Category code identification", description: "Decode the mental shortcuts your audience uses to perceive and position your brand.", icon: <FaTags/> },
        { title: "Messaging frameworks s based on cognitive triggers", description: "Structure messaging around psychological cues that drive attention, trust, and action.", icon: <FaProjectDiagram/> },
        { title: "A/B tested narratives for resonance + ROI", description: "Validate storytelling angles through split-testing to find what truly moves the needle.", icon: <FaVials/> },
      ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "Our frameworks align with how niche audiences think, feel, and buy.",
    },
    cta: {
      headline: "Speak the Language of Your Market.",
      button: "",
      link: "tel:+916238422887",
    },
  },
"Web Application Development": {
  meta: {
    title: "Custom Web Application Development for Modern Brands | Social Bureau",
    description:
      "From MVPs to scalable platforms, we design, develop, and deploy web apps that are fast, secure, and user-centric.",
  },
  hero: {
    headline: "Code That Performs, Experiences That Convert.",
    highlight: "Performs",
    subtext:
      "We don’t just build websites — we engineer digital platforms that scale with your business, your users, and your ambition.",
  },
  problems: {
    title: "Challenges",
    highlight: "We Tackle",
    items: [
      {
        title: "Outdated, clunky platforms losing users",
        icon: <FaHourglassHalf className="text-[#ff0000] text-3xl mb-4" />,
      },
      {
        title: "Generic templates limiting business potential",
        icon: <FaCubes className="text-[#ff0000] text-3xl mb-4" />,
      },
      {
        title: "Slow dev cycles and missed launches",
        icon: <FaRegClock className="text-[#ff0000] text-3xl mb-4" />,
      },
    ],
  },
  deliveries: {
    title: "What",
    highlight: "We Build",
    items: [
      {
        title: "Custom web apps built for scale",
        description:
          "Tailored architecture with scalability, performance, and security baked in from day one.",
        icon: <FaGlobe className="text-white text-lg" />,
      },
      {
        title: "Full-stack engineering from UX to deployment",
        description:
          "Design-driven development that covers frontend, backend, databases, and cloud hosting.",
        icon: <FaProjectDiagram className="text-white text-lg" />,
      },
      {
        title: "Agile sprint cycles for faster go-to-market",
        description:
          "Lean development processes to ship MVPs fast and iterate based on real user feedback.",
        icon: <FaRocket className="text-white text-lg" />,
      },
      {
        title: "Admin dashboards, APIs, and integrations",
        description:
          "Powerful backend systems, third-party APIs, and internal tools to support operations and growth.",
        icon: <FaTools className="text-white text-lg" />,
      },
    ],
  },
  whyItWorks: {
    title: "Why",
    highlight: "It Works",
    subtext:
      "We bridge design and engineering to craft performant web apps that delight users and deliver outcomes.",
  },
  cta: {
    headline: "Let’s Build Your Platform.",
    button: "Start Your Web App",
    link: "tel:+916238422887",
  },
},

  "API-Driven Growth & Automated Distribution": {
    meta: {
      title: "API-Driven Growth & Automated Marketing Distribution | Social Bureau",
      description: "Connect product, marketing, and ops through API-led automation. Eliminate handoff friction and scale faster with growth loops.",
    },
    hero: {
      headline: "Data Moves Faster Than Humans, So Should Your Marketing",
      highlight: "Faster",
      subtext: "Manual processes stall personalization and waste cycles.",
    },
    problems: {
      title: "The ",
      highlight: "Problem",
      items : [
  { title: "Manual workflows", icon: <FaRegClock  /> },
  { title: "Slow personalization", icon: <FaUserClock  /> },
  { title: "Disconnected tech stack", icon: <FaPuzzlePiece  /> },
],
    },
    deliveries: {
      title: "Our",
      highlight: "Solution",
      items: [
        {
    title: "API integrations across ad, CRM, and analytics platforms",
    description: "Unify data and automate workflows by syncing all your growth tools through seamless API connections.",
    icon: <FaLink />,
  },
  {
    title: "Event-based audience segmentation",
    description: "Dynamically group users based on real-time behavior to enable precise targeting and personalization.",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Growth loops triggered by user behavior",
    description: "Turn user actions into automated growth triggers that continuously attract and retain new users.",
    icon: <FaSyncAlt />,
  },
  {
    title: "Zero-delay personalization engines",
    description: "Deliver instant, behavior-driven experiences that adapt to users in real time for higher conversions.",
    icon: <FaBolt/>,
  },
      ],
    },
    whyItWorks: {
      title: "The",
      highlight: "Impact",
      subtext: "Fewer handoffs. Faster iterations. Growth that compounds without burnout.",
    },
    cta: {
      headline: "Ready to Scale with Automation?",
      button: "Automate Growth",
      link: "tel:+916238422887",
    },
  },

  "Niche Market Penetration Strategy": {
    meta: {
      title: "Niche Market Penetration Strategy for High-Growth Brands | Social Bureau",
      description: "Drive growth in niche verticals with cultural fluency, ethnographic insights, and performance marketing built to fit your market.",
    },
    hero: {
      headline: "In Niche Markets, Culture Converts. We Get It.",
      highlight: "Culture Converts.",
      subtext: "We don’t guess what works in healthtech, crypto, aesthetics, or fintech. We speak the codes and we write new ones.",
    },
    problems: {
      title: "What ",
      highlight: "You Get",
      items: [
        { title: "Vertical-specific insights", icon: <FaMicroscope /> },
  { title: "Creative that mirrors buyer psychology", icon: <FaBrain /> },
  { title: "Hyper-targeted channels", icon: <FaBullseye /> },
      ],
    },
    deliveries: {
      title: "Channel",
      highlight: "Execution",
      items: [
       {
    title: "Deep vertical analysis",
    description: "In-depth research into your specific industry to inform tailored strategy and messaging.",
    icon: <FaBook />,
  },
  {
    title: "Hyper-targeted creatives and audience strategy",
    description: "Custom visuals and audience targeting refined for each segment's unique psychology.",
    icon: <FaPaintBrush />,
  },
  {
    title: "Channel selection that mirrors buying psychology",
    description: "We choose platforms based on where and how your audience actually makes decisions.",
    icon: <FaChartLine />,
  },
  {
    title: "Spend allocation based on niche funnel performance",
    description: "Budgets are distributed based on real-time funnel performance across each niche.",
    icon: <FaBalanceScale />,
  },  ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "We don’t just market to niches, we live in them.",
    },
    cta: {
      headline: "Crack Your Category",
      button: "Talk Strategy",
      link: "tel:+916238422887",
    },
  },

  "Influencer & UGC Growth Engines": {
    meta: {
      title: "Influencer & UGC Growth Systems Tied to Revenue | Social Bureau",
      description: "We contract creators on performance KPIs, not vanity metrics. Our UGC flows into your funnel for trust, reach, and conversion.",
    },
    hero: {
      headline: "Creators Who Convert, Not Just Perform",
      highlight: "Convert",
      subtext: "You’ve tried influencer campaigns. They got 'likes.' But no lift.",
    },
    problems: {
      title: "Your ",
      highlight: "Reality",
      items: [
        { title: "Low ROI influencer spends", icon: <FaMoneyBillWave /> },
  { title: "Lack of funnel integration", icon: <FaRetweet /> },
  { title: "No attribution", icon: <FaQuestionCircle /> },
      ],
    },
    deliveries: {
      title: "How",
      highlight: "We Do It",
      items: [
        { title: "Creator partnerships based on CPA & ROI", description: "Collaborate with creators using performance-based models to drive measurable growth and maximize return on spend.", icon: <FaHandshake /> },
  { title: "UGC built to serve as funnel entry + retargeting asset", description: "Leverage authentic user-generated content to attract new users and power high-converting retargeting campaigns.", icon: <FaVideo /> },
  { title: "Native-style creative that matches platform norms", description: "Craft ads that blend seamlessly into each platform’s look and feel, boosting engagement and trust.", icon: <FaFilm /> },
  { title: "Attribution-first tracking", description: "Implement precise tracking systems that clearly connect content, clicks, and conversions across the entire journey.", icon: <FaMapMarkerAlt /> },

      ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "We design creator-led content as a growth system, not just a campaign.",
    },
    cta: {
      headline: "Let’s Make Influencer Spend Perform.",
      button: "Launch a UGC Engine",
      link: "tel:+916238422887",
    },
  },

  "Lifecycle & Email Automation Strategy": {
    meta: {
      title: "Lifecycle & Email Automation That Drives Repeat Revenue | Social Bureau",
      description: "Trigger-based email flows and nurture systems that increase repeat purchases and reduce churn. Built for vertical-specific behavior.",
    },
    hero: {
      headline: "Retention Isn’t Luck, It’s Engineered",
      highlight: "Engineered",
      subtext: "We build automated flows that turn one-time customers into loyal fans.",
    },
    problems: {
      title: "We ",
      highlight: "Fix",
      items: [
        { title: "Weak onboarding and post-purchase flows", icon: <FaSuitcase /> },
  { title: "Low repeat purchase and rising churn", icon: <FaChartBar /> },
  { title: "Email sequences that feel robotic", icon: <FaRobot /> },
      ],
    },
    deliveries: {
      title: "Our",
      highlight: "System",
      items: [
        { title: "Behavior-based segmentation and triggers", description: "Group users by real-time actions and automate triggers that respond to their behavior.", icon: <FaBullseye /> },
  { title: "30-day revenue scorecard for flows", description: "Track and optimize every automated flow using a performance scorecard focused on revenue.", icon: <FaCalendarAlt /> },
  { title: "Multi-channel nurture architecture", description: "Orchestrate email, SMS, ads, and more to guide leads through a unified, conversion-driven journey.", icon: <FaGlobe /> },
  { title: "Subject line and creative testing at speed", description: "Rapidly experiment with variations to uncover high-performing messages and visuals.", icon: <FaVial /> },

      ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "We don’t guess on retention. We build data-driven systems to engineer it.",
    },
    cta: {
      headline: "Let’s Turn Lifecycle Into Lifetime Value.",
      button: "Book a Retention Audit",
      link: "tel:+916238422887",
    },
  },
  "Software GTM & Growth Architecture": {
    meta: {
      title: "Software Growth Architecture & GTM Strategy for SaaS | Social Bureau",
      description: "Bridge the gap between product, marketing, and rev-ops. We build PLG and sales-assist systems that grow MRR with precision.",
    },
    hero: {
      headline: "More Than Launch, We Build Growth Architecture for SaaS",
      highlight: "Growth Architecture",
      subtext: "From user acquisition to retention, we engineer scalable systems that power sustainable SaaS growth.",
    },
    problems: {
      title: "Problem We ",
      highlight: "Solve",
      items: [
        { title: "Trials don’t convert.", icon: <FaUserClock /> },
  { title: "MRR stagnates.", icon: <FaChartLine /> },
  { title: "Sales and marketing aren’t aligned.", icon: <FaHandshake /> },
      ],
    },
    deliveries: {
      title: "Our",
      highlight: "Solution",
      items: [
        {
    title: "GTM architecture tailored for PLG or hybrid",
    description: "Design product-led or hybrid go-to-market systems using real-time user behavior and smart triggers.",
    icon: <FaProjectDiagram />, // Represents structured systems like GTM architecture
  },
  {
    title: "RevOps + funnel + messaging alignment",
    description: "Unify revenue operations and messaging across the funnel using performance-driven insights.",
    icon: <FaChartPie />, // Reflects analysis and revenue-focused alignment
  },
  {
    title: "Feature-triggered onboarding and upsell flows",
    description: "Automate contextual onboarding, upsells, and retention flows based on in-app feature engagement.",
    icon: <FaRocket />, // Indicates onboarding, growth, and forward momentum
  },
  {
    title: "Cross-functional growth loops",
    description: "Collaborate across teams to iterate, test, and scale the highest-impact growth experiments.",
    icon: <FaSyncAlt />, // Represents continuous loops and team synergy
  },
      ],
    },
    whyItWorks: {
  title: "Why",
  highlight: "It Works",
  subtext: "We architect end-to-end GTM systems that connect product usage to revenue outcomes, intelligently and predictably.",
},

    cta: {
      headline: "Ready to Scale Smarter",
      button: "",
      link: "tel:+916238422887",
    },
  },
};

export default servicesData;
