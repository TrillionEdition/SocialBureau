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
  FaChartPie,
  FaUserCheck,
  FaExclamationTriangle,
  FaArrowDown,
  FaShareAlt,
  FaRandom,
  FaSitemap,
  FaCogs,
  FaTable,
  FaBan,
  FaTrashAlt
} from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";

const servicesData = {
  "Full-Funnel Performance Marketing": {
    meta: {
      title: "Full-Funnel Performance Marketing Agency for Niche Brands | Social Bureau",
      description: "Maximize ROI with full-funnel performance marketing designed for niche brands. We engineer strategies that turn ad spend into sustainable growth.",
    },
    hero: {
      headline: "Beyond the Noise: Performance Marketing that Actually Performs",
      highlight: "Performance Marketing",
      subtext: "No generic solutions here. We design bespoke, full-funnel campaigns tailored to your vertical, optimized for enduring, measurable growth.",
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
        { title: "Accurate Audience Profiles", description: "Custom targeting based on your industry distinct consumer behaviors.", icon: <FaUsers className="text-white text-lg" /> },
        { title: "Every month's innovation", description: "Fast, KPI driven, actionable, and targeted on business impacts not vanity metrics.", icon: <FaRocket className="text-white text-lg" /> },
        { title: "Smarter Bidding", description: "Optimized around lifetime customer value versus short-term ROAS.", icon: <FaBullseye className="text-white text-lg" /> },
        { title: "Full Funnel Optimization", description: "Relentless A/B testing for efficiency and conversions.", icon: <FaFlask className="text-white text-lg" /> },
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
      link: "tel:+918921840486",
    },
  },

  "Funnel Architecture & Growth Pathways": {
    meta: {
      title: "Funnel Architecture & Growth Strategy for Scaling Brands | Social Bureau",
      description: "Design customer journeys that convert. We build funnel architectures that map awareness to revenue with P&L-aligned growth pathways.",
    },
    hero: {
      headline: "Funnel Leaks Destroy Growth, We Seal and Scale Yours",
      highlight: "Seal and Scale",
      subtext: "You are enough to drive traffic, but very few convert. There is no clear way from discovery to revenue. Your funnel is not a system when it's a gamble.",
    },
    problems: {
      title: "What",
      highlight: "We Fix",
      items: [
        { title: "Misaligned messaging throughout the stages of the funnel", icon: <FaRandom className="text-[#ff0000] text-3xl mb-4" /> },
        { title: "Weak transitions from awareness to conversion", icon: <FaShareSquare className="text-[#ff0000] text-3xl mb-4" /> },
        { title: "No visibility on user behaviors or data related to LTV", icon: <FaEyeSlash className="text-[#ff0000] text-3xl mb-4" /> },
      ],
    },
    deliveries: {
      title: "Our",
      highlight: "Method",
      items: [
        { title: "End-to-End Funnel Blueprinting", description: "We create custom funnel strategies for the behavior and needs of your target niche.", icon: <FaSitemap /> },
        { title: "Conversion & Retention Architecture", description: "We create structured frameworks for initial conversions and long-term loyalty", icon: <FaCogs /> },
        { title: "CRO-informed Journey Optimization", description: "We optimize by touchpoint using actual conversion rate data to improve performance through the funnel.", icon: <FaChartLine/> },
        { title: "Funnel as P&L spreadsheet, not marketing 101", description: "We treat your funnel like a business model – it is about profit, not just traffic or impressions.", icon: <FaTable /> },
      ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "We take funnels from guesswork to systems based on revenue.",
    },
    cta: {
      headline: "Map Your Growth Journey Now",
      button: "Schedule Discovery",
      link: "tel:+918921840486",
    },
  },

  "Conversion Rate Optimization & Landing Systems": {
    meta: {
      title: "Conversion Rate Optimization & Landing Pages That Convert | Social Bureau",
      description: "High-converting landing pages and CRO systems based on psychology, friction scoring, and micro-experiments—built for niche markets.",
    },
    hero: {
      headline: "Stop Losing Customers during the Last Voice",
      highlight: "Last Voice",
      subtext: "Your ad worked. They clicked. But your page didn’t convert and now they’re gone.",
    },
    problems: {
      title: "Results You ",
      highlight: "Can Expect",
      items: [
        { title: "Lower bounce rates", icon: <FaUserCheck /> },
        { title: "Increased conversions", icon: <FaArrowUpRightDots /> },
        { title: "Improved funnel efficiency", icon: <FaTachometerAlt /> },
      ],
    },
    deliveries: {
      title: "What",
      highlight: "We Do",
      items: [
        { title: "Rapid friction scoring audits", description: "Quickly identify drop-off points and usability blockers across your funnel with precision scoring.", icon: <FaCalculator/> },
        { title: "Psychology-based copy and CTA design", description: "Craft messaging and calls-to-action rooted in behavioral psychology to boost user response.", icon: <FaBrain/> },
        { title: "72-hour micro-tests for real-life evidence", description: "Get fast, proof-based experiments in the market, to validate ideas and optimize without guesswork.", icon: <FaHourglassHalf/> },
        { title: "Modular landing systems specific to niche", description: "Build customizable landing page components for your audience, offer and vertical. ", icon: <FaCubes/> },
      ],
    },
    whyItWorks: {
  title: "Why",
  highlight: "It Works",
  subtext: "Our landing systems are engineered to test, learn, and boost user action through behavioral insights, UX precision, and CRO best practices.",
},
    cta: {
      headline: "Want Pages That Convert? Let’s Test That.",
      button: "Contact Now",
      link: "tel:+918921840486",
    },
  },

  "Messaging & Positioning for Niche Brands": {
    meta: {
      title: "Messaging & Brand Positioning for Niche Audiences | Social Bureau",
      description: "Go beyond generic messaging. We uncover linguistic, cultural, and psychological drivers that differentiate your brand in saturated markets.",
    },
    hero: {
      headline: "Messaging With Meaning, Not Just Matter",
      highlight: "Meaning",
      subtext: "Generic messages don't cut it. You need positioning that speaks your audience's language.",
    },
    problems: {
      title: "What ",
      highlight: "We Resolve",
      items: [
        { title: "Generic brand voice that has no market traction", icon: <FaBullhorn/> },
        { title: "Copy that does not speak your niches language", icon: <FaMeh/> },
        { title: "Weak differentiation in crowded categories", icon: <FaClone/> },
      ],
    },
    deliveries: {
      title: "How",
      highlight: "We Do It",
      items: [
        { title: "Linguistic + ethnographic market research", description: "Reveal deeper customer insights leveraging language pattern and cultural context analysis", icon: <FaSearch/> },
        { title: "Identifying category codes", description: "Decode the mental shortcuts your audience uses to perceive/position your brand.", icon: <FaTags/> },
        { title: "Messaging frameworks around cognitive triggers", description: "Expend your messaging around psychological cues that drive attention, trust, and action.", icon: <FaProjectDiagram/> },
        { title: "A/B tested narratives for resonance + ROI", description: "Validate storytelling angles through split-testing to determine what actually moves the needle.", icon: <FaBullhorn/> },
      ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "Our frameworks align with how niche audiences think, feel, and buy.",
    },
    cta: {
      headline: "Speak the Language of Your Market.",
      button: "Contact Now",
      link: "tel:+918921840486",
    },
  },
"Web-Development": {
  meta: {
    title: "Custom Web Application Development for Modern Brands | Social Bureau",
    description:
      "From MVPs to scalable platforms, we design, develop, and deploy web apps that are fast, secure, and user-centric.",
  },
  hero: {
    headline: "Code That Works, Experiences That Convert.",
    highlight: "Works",
    subtext:
      "We don’t just build websites. We create digital platforms with your business, your users, and your ambitions in mind that can scale with you.",
  },
  problems: {
    title: "Challenges",
    highlight: "We Solve",
    items: [
      {
        title: "Old, clunky platforms that lose users",
        icon: <FaTrashAlt className="text-[#ff0000] text-3xl mb-4" />,
      },
      {
        title: "Bland, generic templates that limit business growth",
        icon: <FaClone className="text-[#ff0000] text-3xl mb-4" />,
      },
      {
        title: "Slow development cycles where launches are missed",
        icon: <FaRegClock className="text-[#ff0000] text-3xl mb-4" />,
      },
    ],
  },
  deliveries: {
    title: "What",
    highlight: "We Create",
    items: [
      {
        title: "Custom web applications designed for scale",
        description:
          "Custom architecture built to incorporate growth, performance and security from day one.",
        icon: <FaGlobe className="text-white text-lg" />,
      },
      {
        title: "Complete stack development from user experience to deployment",
        description:
          "Design-driven development with Frontend, Backend, Databases and Cloud Hosting.",
        icon: <FaProjectDiagram className="text-white text-lg" />,
      },
      {
        title: "Agile development cycles for speed to market",
        description:
          "Lean development process that allows you to ship MVPs quickly and iterate based on real user feedback.",
        icon: <FaRocket className="text-white text-lg" />,
      },
      {
        title: "Administrative dashboards, APIs, and other integrations",
        description:
          "Strong back-end systems, third-party APIs, and internal tools to facilitate operations and growth.",
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
    link: "tel:+918921840486",
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
      subtext: "Without process automation or knowledge, scale and personalization are challenging.",
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
    title: "API connection between all ad, CRM, and analytics platforms",
    description: "Connect all your growth tools to blend data and automate workflows through API connections.",
    icon: <FaLink />,
  },
  {
    title: "Event-based audience segmentation",
    description: " Create dynamic audiences from user behavior to get precise targeting and personalized experiences.",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Behavior-driven growth loops",
    description: "Take user behavior and turn it into growth triggers that can repeat over and over and can continuously attract and retain new users.",
    icon: <FaSyncAlt />,
  },
  {
    title: "Zero-delay personalization engines",
    description: "Your users will experience how their behavior drives real-time experiences, instantly increasing conversion rates.",
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
      link: "tel:+918921840486",
    },
  },

  "Niche Market Penetration Strategy": {
    meta: {
      title: "Niche Market Penetration Strategy for High-Growth Brands | Social Bureau",
      description: "Drive growth in niche verticals with cultural fluency, ethnographic insights, and performance marketing built to fit your market.",
    },
    hero: {
      headline: "In Niche Markets, Culture Follows. We Get It.",
      highlight: "Follows",
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
    description: "Detailed exploration of your specific industry to create a tailored strategy and messaging.",
    icon: <FaBook />,
  },
  {
    title: "Hyper-targeted creatives and audience strategy",
    description: "Identified custom visuals and audience targeting with a specificity reflecting the distinct psychology of each segment.",
    icon: <FaPaintBrush />,
  },
  {
    title: "Channel selection based on your audience's buying psychology",
    description: "We select channels that mirror the decision-making process of your audience.",
    icon: <FaChartLine />,
  },
  {
    title: "Spend allocation based on niche funnel performance",
    description: "Budgets will be placed based on live performance of the funnel across each niche.",
    icon: <FaBalanceScale />,
  },  ],
    },
    whyItWorks: {
      title: "Why",
      highlight: "It Works",
      subtext: "We don’t just market to niches, we speak their language.",
    },
    cta: {
      headline: "Crack Your Category",
      button: "Talk Strategy",
      link: "tel:+918921840486",
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
      link: "tel:+918921840486",
    },
  },

  "Lifecycle & Email Automation Strategy": {
    meta: {
      title: "Lifecycle & Email Automation That Drives Repeat Revenue | Social Bureau",
      description: "Trigger-based email flows and nurture systems that increase repeat purchases and reduce churn. Built for vertical-specific behavior.",
    },
    hero: {
      headline: "Customer Loyalty, Crafted With Style",
      highlight: "Loyalty",
      subtext: "We build automated flows that turn one-time customers into loyal fans.",
    },
    problems: {
      title: "We ",
      highlight: "Correct",
      items: [
        { title: "Flimsy onboarding and post purchase flows", icon: <FaExclamationTriangle /> },
  { title: "Weak repeat purchase and rising churn", icon: <FaArrowDown /> },
  { title: "Email sequences that are robotic", icon: <FaMeh /> },
      ],
    },
    deliveries: {
      title: "Our",
      highlight: "System",
      items: [
        { title: "Behavioral segmentation and triggers", description: "Segment users based on actions taken in real-time, and automate triggers to react to their behaviors.", icon: <FaBullseye /> },
  { title: "30 revenue scorecard for flows", description: "Measure and optimize each automated flow with a performance scorecard based on revenue.", icon: <FaCalendarAlt /> },
  { title: "Multi-channel nurture system", description: "Arrange email, SMS, ads, and more into a single journey focused on converting leads.", icon: <FaShareAlt /> },
  { title: "Subject line and creative tested at speed", description: "Quickly test variations of both messages and images to find the highest performing combinations.", icon: <FaBolt /> },

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
      link: "tel:+918921840486",
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
      button: "Contact Now",
      link: "tel:+918921840486",
    },
  },
};

export default servicesData;
