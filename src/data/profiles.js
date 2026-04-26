const profiles = [
  {
    name: "Anjay Ramesh",
    exp:"2",
    role: "Content & Copy Writer",
    tools:[
      { name: "google_seo_planner", img: "https://www.digitalinfoways.com/wp-content/uploads/2022/08/Google-Keyword-Planner.png" },
      { name: "adobe_photoshop", img: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhfRM_njI7Pu32CmBLMdmnnzF6MdNHw4MJwlr.tSWLA2EJBQdZh0p3nNDzGvX2F6NoIc9ZSQ9xJqsGEg5bouOnA-&format=source" },
      { name: "word", img: "https://aijr.org/wp-content/uploads/fadf38a7-word_template.png" },
      { name: "adobe_premiere_pro", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1200px-Adobe_Premiere_Pro_CC_icon.svg.png" },
      { name: "davinci", img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png" },
      { name: "WriterDuet", img: "https://play-lh.googleusercontent.com/nbXaV4mMIzNYndETPFIlBepUUQSGoSlEHBLeSKKGNWSc3MWNPT1Mgs0Blh-VmiENACZV" },
      { name: "clickup", img: "https://clickup.com/images/for-se-page/clickup.png" },
      { name: "canva", img: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.Mgwau0GKaVeM0pe08a.WzU_iFrSseG6B_korWnbE5AKJU2H3tivSIiyanPEqkm7q7NUo-&format=source" },
      { name: "Storyboard.AI", img: "https://story-board-images.s3.us-west-1.amazonaws.com/logo/JPEG/AI-04.jpg" },
      { name: "Surfer SEO", img: "https://zorgle.co.uk/wp-content/uploads/2024/11/Surfer-seo-logo.png" },
      { name: "Evernote", img: "https://cdn-icons-png.flaticon.com/512/2111/2111389.png" },
      { name: "Trello", img: "https://logo.svgcdn.com/d/trello-plain-8x.png" },
      { name: "QuillBot", img: "https://play-lh.googleusercontent.com/7ceJNSX1mA4H3tNuJRzhz24Vp67vKnxFjwVsC_mWM28BYCcutwaDSHLKv_FFASTS" },
      { name: "Copyscape", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAujLJsqz0jGNsPGHPmTfxlAY7yV8pj3lxBg&s" },
      { name: "adobe_suite", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1200px-Adobe_Creative_Cloud_rainbow_icon.svg.png" },
    ],
    reviews: [
  {
    text: "The writing was clear, engaging, and perfectly matched our brand tone. Fantastic work!",
    name: "Aisha Mehta",
    time: "March 14, 2025"
  },
  {
    text: "Delivered SEO-rich content that actually brought in organic traffic. Highly impressed.",
    name: "Karthik Rao",
    time: "April 2, 2025"
  },
  {
    text: "They understood our industry deeply and created copy that resonated with our audience.",
    name: "Sophia D.",
    time: "May 18, 2025"
  },
  {
    text: "Always meets deadlines and delivers content that feels thoughtful and authentic.",
    name: "Ravi Patel",
    time: "June 30, 2025"
  },
  {
    text: "Consistently delivers high-quality articles that strengthen our brand voice and visibility.",
    name: "Neha Sharma",
    time: "July 22, 2025"
  }
],
    img: "assets/cover5.webp",
    photo:"assets/team4.webp",
    user:"assets/anjay.webp",
    rating: "4.6",
    rate: "$9/hr",
    works: "107",
    articles:"",
    projects:"4",
    clients: [
      { name: "TrillionEdition", logo: "https://trillionedition.com/assets/TE.webp" },
      { name: "SocialBureau", logo: "/assets/socialbureau.png" },  
  { name: "Suntips", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3cVk054HJqRCar2oRh3Xhj-Um9SEYgT5_g&s" },
  { name: "News Tamil", logo: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75" },
  { name: "BusinessBureau", logo: "data:image/png;base64,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" },
  
  { name: "News Malayalam", logo: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp" },
  
],
    articlesPublished: [
      "How to Write Effective Landing Pages",
      "Copywriting Trends in 2025",
      "SEO Strategies for Blog Content"
    ],
    links:[
      { name: "medium", url: "https://medium.com/@lostcreationz", img:"https://miro.medium.com/v2/resize:fit:1200/0*pBveBtT6Tulvs85I.png" },
    ]
  },
  {
    name: "Sherin",
    exp:"1",
    role: "COO & HR",
    img: "assets/cover1.webp",
    photo:"assets/team3.webp",
    reviews: [
  {
    text: "Exceptional communication and problem-solving skills — made the whole experience stress-free.",
    name: "Meera Thomas",
    time: "March 12, 2025"
  },
  {
    text: "We’ve never had such proactive support. She truly cared about our satisfaction and results.",
    name: "Aditya Menon",
    time: "April 4, 2025"
  },
  {
    text: "Always ensured our concerns were resolved quickly and with genuine care. Highly reliable!",
    name: "Sarah Fernandes",
    time: "May 15, 2025"
  },
  {
    text: "She made us feel supported at every stage — always available and incredibly helpful.",
    name: "Nikhil Joshi",
    time: "June 2, 2025"
  },
  {
    text: "Consistently went above and beyond to ensure smooth communication and customer satisfaction.",
    name: "Anjali Iyer",
    time: "July 21, 2025"
  }
],


    tools:[
      { name: "zoho", img: "https://www.softwaredekho.in/_next/image?url=https%3A%2F%2Fsoftwaredekho.s3.ap-south-1.amazonaws.com%2Fpublic-assets%2F1c46627d832b8c12dd366f695c04aabe.jpg&w=3840&q=75" },
      { name: "teramind", img: "https://www.teramind.co/wp-content/uploads/2024/05/teramind-logo-full-color-1.png" },
      { name: "wordpress", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQqvP9mSAN_KNxZlbvD9VT-yl4Vf_PuT6Cw&s" },
      { name: "shopify", img: "https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png" },
      { name: "clickup", img: "https://avatars.slack-edge.com/2024-05-01/7057208497908_a4351f6deb91094eac4c_512.png" },
      { name: "canva", img: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.Mgwau0GKaVeM0pe08a.WzU_iFrSseG6B_korWnbE5AKJU2H3tivSIiyanPEqkm7q7NUo-&format=source" },
      { name: "word", img: "https://aijr.org/wp-content/uploads/fadf38a7-word_template.png" },

    ],
    user:"assets/sherin.webp",
    rating: "4.8",
    duration: "12 Days",
    rate: "$55/hr",
    worksDone: [
      "HR process automation",
      "Team management for product launch",
      "Policy documentation"
    ],
    clients: [
      { name: "TrillionEdition", logo: "https://trillionedition.com/assets/TE.webp" },
      { name: "SocialBureau", logo: "/assets/socialbureau.png" },  
  { name: "Suntips", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3cVk054HJqRCar2oRh3Xhj-Um9SEYgT5_g&s" },
  { name: "News Tamil", logo: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75" },
  { name: "News Malayalam", logo: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp" },
  
],
    articlesPublished: [
      "Modern HR Practices for Startups",
      "Building Productive Teams Remotely"
    ]
  },
  {
    name: "Elizebath Thomas",
    exp:"2",
    role: "Web Developer",
    img: "assets/cover3.webp",
    tools:[
      { name: "react", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/862px-React-icon.svg.png" },
      { name: "node", img: "https://cdn-icons-png.flaticon.com/512/919/919825.png" },
      { name: "mongodb", img: "https://toppng.com/uploads/preview/mongodb-logo-11609369386lqoc6r2ga9.png" },
      { name: "clickup", img: "https://clickup.com/images/for-se-page/clickup.png" },
      { name: "python", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" },
      { name: "wordpress", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQqvP9mSAN_KNxZlbvD9VT-yl4Vf_PuT6Cw&s" },
      { name: "shopify", img: "https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png" },
    ],
    reviews: [
  {
    text: "Delivered a smooth, responsive website ahead of schedule — flawless experience.",
    name: "Ananya Gupta",
    time: "March 8, 2025"
  },
  {
    text: "The developer was proactive, quick to respond, and solved complex issues with ease.",
    name: "Rohit Menon",
    time: "April 1, 2025"
  },
  {
    text: "Fast-loading, well-structured website that our customers love. Excellent technical skills!",
    name: "Divya Ramesh",
    time: "May 12, 2025"
  },
  {
    text: "One of the best developers we’ve worked with — attention to detail and great communication.",
    name: "Arjun Pillai",
    time: "June 24, 2025"
  },
  {
    text: "Proactive and innovative throughout — delivered a clean, scalable codebase we can easily build on.",
    name: "Sneha Krishnan",
    time: "July 10, 2025"
  }
],

    photo:"assets/team5.webp",
    user:"assets/elizebath.webp",
    rating: "4.2",
    duration: "5 Days",
    rate: "$35/hr",
    worksDone: [
      "Developed full-stack eCommerce site",
      "Created custom WordPress themes",
      "Integrated payment gateways"
    ],
    clients: [
      { name: "TrillionEdition", logo: "https://trillionedition.com/assets/TE.webp" },
      { name: "SocialBureau", logo: "/assets/socialbureau.png" },  
  { name: "Suntips", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3cVk054HJqRCar2oRh3Xhj-Um9SEYgT5_g&s" },
  { name: "News Tamil", logo: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75" },
  { name: "News Malayalam", logo: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp" },
  
],
    articlesPublished: [
      "React vs Vue: 2025 Comparison",
      "Best Practices for NodeJS APIs"
    ]
  },
  {
    name: "Aneek",
    exp:"1",
    role: "Performance Marketer",
    img: "assets/cover4.webp",
    photo:"assets/team6.webp",
    user:"assets/aneek.webp",
    rating: "4.5",
    duration: "10 Days",
    rate: "$45/hr",
    worksDone: [
      "Managed Google Ads campaigns",
      "Optimized Facebook Ad strategies",
      "Increased ROI for SaaS clients"
    ],
    clients: [
      { name: "TrillionEdition", logo: "https://trillionedition.com/assets/TE.webp" },
      { name: "SocialBureau", logo: "/assets/socialbureau.png" },  
  { name: "Suntips", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3cVk054HJqRCar2oRh3Xhj-Um9SEYgT5_g&s" },
  { name: "News Tamil", logo: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75" },
  { name: "News Malayalam", logo: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp" },
  
],
    reviews: [
  {
    text: "Our engagement rates doubled within weeks. Smart, creative, and data-driven approach!",
    name: "Ishaan Verma",
    time: "March 18, 2025"
  },
  {
    text: "They crafted a marketing strategy that actually worked — great ROI and visibility boost.",
    name: "Ananya Rao",
    time: "April 12, 2025"
  },
  {
    text: "Professional and innovative team. They helped us reach new audiences effectively.",
    name: "Rahul Menon",
    time: "May 20, 2025"
  },
  {
    text: "The campaigns were spot-on and perfectly timed. Highly recommend their marketing expertise.",
    name: "Sneha Pillai",
    time: "June 25, 2025"
  },
  {
    text: "Consistently delivered results and exceeded expectations — a truly reliable marketing partner.",
    name: "Priya Sharma",
    time: "July 14, 2025"
  }
],
    articlesPublished: [
      "5 Ways to Improve Ad Performance",
      "Understanding Conversion Funnels"
    ]
  },
  {
    name: "Afnas",
    exp:"2",
    role: "Cinematographer",
    img: "assets/cover2.webp",
    photo:"assets/team7.webp",
    user:"assets/afnas.webp",
    rating: "4.8",
    duration: "12 Days",
    rate: "$55/hr",
    tools:[
      { name: "adobe_premiere_pro", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1200px-Adobe_Premiere_Pro_CC_icon.svg.png" },
      { name: "adobe_photoshop", img: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhfRM_njI7Pu32CmBLMdmnnzF6MdNHw4MJwlr.tSWLA2EJBQdZh0p3nNDzGvX2F6NoIc9ZSQ9xJqsGEg5bouOnA-&format=source" },
      { name: "davinci", img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png" },
      { name: "capcut", img: "https://m.media-amazon.com/images/I/31OW-+UL+yL.jpg" },
      { name: "dji", img: "https://yt3.googleusercontent.com/fnkGn-bIQ1ii_b9z7EUqPrc-yVU4AAusKdJdLSCGtX9MRvUQZm2W_q8ywoJes38oERnGEV0G_w=s900-c-k-c0x00ffffff-no-rj" },      
      { name: "sony", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjE3wwxw2_S7KNENaG0DFKtDwZ7maDx4Ahzw&s" },
      { name: "canon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT34bVAkgk-TSDge8Y3lziDYJjGFBHKrL7XFQ&s" },
    ],
    reviews: [
  {
    text: "Outstanding visuals and storytelling — the final video exceeded our expectations.",
    name: "Kiran Raj",
    time: "March 5, 2025"
  },
  {
    text: "The cinematographer captured our brand message beautifully. Every shot felt cinematic.",
    name: "Riya D’Souza",
    time: "April 9, 2025"
  },
  {
    text: "Creative, professional, and detail-oriented. Our promotional video got great feedback.",
    name: "Manoj Thomas",
    time: "May 14, 2025"
  },
  {
    text: "Handled everything from lighting to editing with perfection. Truly talented work!",
    name: "Aarav Nair",
    time: "June 28, 2025"
  },
  {
    text: "Captured our story with emotion and precision — a true professional behind the camera.",
    name: "Priya Sharma",
    time: "July 19, 2025"
  }
],
clients: [
      { name: "TrillionEdition", logo: "https://trillionedition.com/assets/TE.webp" },
      { name: "SocialBureau", logo: "/assets/socialbureau.png" },  
  { name: "Suntips", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3cVk054HJqRCar2oRh3Xhj-Um9SEYgT5_g&s" },
  { name: "News Tamil", logo: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75" },
  { name: "News Malayalam", logo: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp" },
  
],
    worksDone: [
      "Corporate video shoots",
      "Product explainer videos",
      "Short films for marketing"
    ],
    articlesPublished: [
      "Lighting Techniques for Brand Videos",
      "Editing Styles: Trends for 2025"
    ]
  },
  {
    name: "Hajira",
    exp:"2",
    role: "Administration Head",
    img: "assets/cover6.webp",
    photo:"assets/team8.webp",
    user:"assets/hajira.webp",
    reviews: [
  {
    text: "Extremely organized and reliable. Every task was managed efficiently from start to finish.",
    name: "Anil Kumar",
    time: "March 10, 2025"
  },
  {
    text: "The admin kept everything running smoothly — deadlines, documentation, and communication.",
    name: "Sanya Verma",
    time: "April 7, 2025"
  },
  {
    text: "Professional, dependable, and always one step ahead in planning. Great support!",
    name: "Rakesh Pillai",
    time: "May 22, 2025"
  },
  {
    text: "They ensured smooth operations and clear coordination between departments. Highly valuable asset.",
    name: "Neha Joshi",
    time: "June 15, 2025"
  },
  {
    text: "Maintained seamless workflow and managed tasks proactively — invaluable contribution.",
    name: "Vikram Sharma",
    time: "July 8, 2025"
  }
],

    tools:[
      { name: "microsoft_365", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Microsoft_365_%282022%29.svg/1091px-Microsoft_365_%282022%29.svg.png" },
      { name: "buffer", img: "https://cdn.prod.website-files.com/5f15081919fdf673994ab5fd/665a52c049dce485ff67e155_Buffer-Logo.svg" },
      { name: "clickup", img: "https://avatars.slack-edge.com/2024-05-01/7057208497908_a4351f6deb91094eac4c_512.png" },
      { name: "canva", img: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.Mgwau0GKaVeM0pe08a.WzU_iFrSseG6B_korWnbE5AKJU2H3tivSIiyanPEqkm7q7NUo-&format=source" },
      { name: "word", img: "https://aijr.org/wp-content/uploads/fadf38a7-word_template.png" },
      { name: "powerpoint", img: "https://www.helpforassessment.com/blog/wp-content/uploads/2022/07/compare-powerpoint-presentations.png" },
    ],
    clients: [
      { name: "TrillionEdition", logo: "https://trillionedition.com/assets/TE.webp" },
      { name: "SocialBureau", logo: "/assets/socialbureau.png" },  
  { name: "Suntips", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3cVk054HJqRCar2oRh3Xhj-Um9SEYgT5_g&s" },
  { name: "News Tamil", logo: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75" },
  { name: "News Malayalam", logo: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp" },
  
],
    rating: "4.6",
    duration: "7 Days",
    rate: "$50/hr",
    worksDone: [
      "Facility management",
      "Vendor relationships",
      "Event organization"
    ],
    articlesPublished: [
      "Streamlining Office Administration",
      "Effective Vendor Management"
    ]
  },
];

export default profiles;

