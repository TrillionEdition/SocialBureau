import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

// Categories
const categories = [
  "All Posts",
  "Marketing",
  "Creatives",
  "Case Studies",
  "Technology",
  "Advertisement",
];

function addNewlinesBeforeHeadings(content) {
  // Use regex to add two newlines before each line that starts with "**" (heading)
  return content.replace(/(^|\n)(\*\*.+?\*\*)/g, '\n\n$2');
}

// Posts data
const posts = [
  {
    id: 1,
    category: "Marketing",
    title: "Niche Marketing for Startups",
    excerpt:
      "Starting a business in 2025 is both exciting and challenging. Most startups face limited budgets, smaller teams, and stiff competition from established brands. Niche marketing works because it allows...",
    content: [
      `Starting a business in 2025 is both exciting and challenging. Most startups face limited budgets, smaller teams, and stiff competition from established brands.  
`,
      `**Why Niche Marketing Works for Startups**  

Niche marketing works because it allows startups to address the specific needs of a smaller, highly relevant audience. Focusing on a niche reduces unnecessary spending and increases engagement. Customers in niche markets feel understood, which fosters trust, repeat purchases, and word-of-mouth promotion. Big brands often overlook niche markets, giving startups the chance to establish themselves more easily. Smaller audiences also provide faster feedback, allowing products and campaigns to be refined effectively.  

&nbsp;&nbsp;&nbsp;* Reduces marketing costs and wasted effort  
&nbsp;&nbsp;&nbsp;* Builds deeper customer loyalty  
&nbsp;&nbsp;&nbsp;* Minimizes competition in overlooked markets  
&nbsp;&nbsp;&nbsp;* Provides quick actionable feedback  
`,
      `**How Startups Can Succeed with Niche Marketing**  
Using long-tail SEO strategies helps attract highly qualified traffic, while collaboration with micro-influencers strengthens reach and engagement. Personalizing campaigns to match the audience's preferences enhances effectiveness, and offering exclusive deals or early access creates loyal customers who advocate for the brand. Storytelling that resonates emotionally with the niche audience further strengthens connections. Continuous monitoring and refinement ensure campaigns remain effective and optimized.  

&nbsp;&nbsp;&nbsp;· Identify and understand your micro-market  
&nbsp;&nbsp;&nbsp;· Use tailored content for authority and credibility  
&nbsp;&nbsp;&nbsp;· Engage in niche communities for trust  
&nbsp;&nbsp;&nbsp;· Leverage long-tail SEO for qualified traffic  
&nbsp;&nbsp;&nbsp;· Collaborate with micro-influencers for engagement  
&nbsp;&nbsp;&nbsp;· Personalize campaigns and offers  
&nbsp;&nbsp;&nbsp;· Use storytelling to connect emotionally  
&nbsp;&nbsp;&nbsp;· Track, analyze, and refine campaigns  
`,
      `**SocialBureau's Approach to Startup Growth**  

At SocialBureau, we understand the unique challenges startups face. Our approach combines creativity with data to deliver measurable results in niche markets.  

&nbsp;&nbsp;&nbsp;· Customized niche marketing roadmaps  
&nbsp;&nbsp;&nbsp;· Optimized campaigns for maximum visibility  
&nbsp;&nbsp;&nbsp;· Connect startups with micro-influencers  
&nbsp;&nbsp;&nbsp;· Continuous tracking and campaign refinement  
&nbsp;&nbsp;&nbsp;· Scaling strategy from niche to broader audiences  
`,
      `**Conclusion**  
Startups don't need massive budgets to make an impact. By focusing on niche marketing, they can reach the right audience, build strong connections, and grow sustainably.
`
    ],
    author: "MS Shadil",
    time: "5 min read",
    image: "assets/niche.webp",
  },
  {
    id: 2,
    category: "Marketing",
    title: "The Hidden Power of Dark Social in Digital",
    excerpt:
      "As marketers, we like certainty. We like dashboards full of impressions, CTRs, and conversion rates because they make us feel in control. But here’s the catch: in 2026, some...",
    content: [
      `As marketers, we like certainty. We like dashboards full of impressions, CTRs, and conversion rates because they make us feel in control. But here’s the catch: in 2026, some of the most powerful marketing activity will happen where you cannot measure it.  
      That hidden layer of influence is called dark social.  
      It’s not new, but its importance is about to explode.`,
      `**What Exactly Is Dark Social?**  

Dark social is the private sharing of content that doesn’t leave a visible trail for analytics. Instead of hitting the “share” button on LinkedIn or retweeting something on X, people copy a link and send it through WhatsApp. They drop a recommendation in a Slack channel, forward a newsletter to their colleagues, or DM a podcast to a friend.  

&nbsp;&nbsp;&nbsp;* From your analytics perspective, this traffic looks like it came out of nowhere. It usually shows up as “direct traffic,” giving you no clue about the true path of discovery.  
&nbsp;&nbsp;&nbsp;* Think about your own digital habits. How often do you forward an interesting article to a coworker instead of posting it publicly? Or share a product link with a friend in a private chat rather than leaving a review online? If you do, you’ve already contributed to dark social.  
`, `And you’re not alone. Research suggests more than 70 percent of content sharing happens privately. That means most brand conversations are invisible to the platforms marketers rely on.`,
      `**Why Dark Social Matters More Than Ever in 2026**  
Several shifts are making dark social impossible to ignore.  
&nbsp;&nbsp;&nbsp;· The rise of privacy-first behavior  
&nbsp;&nbsp;&nbsp;Public feeds are losing their appeal as data regulations tighten and people grow cautious about how their information is used. Younger generations, especially Gen Z and Gen Alpha, already prefer private spaces where they control who sees their activity. Messaging apps and encrypted groups are their default way of interacting online.  
&nbsp;&nbsp;&nbsp;· Trust is moving behind closed doors  
&nbsp;&nbsp;&nbsp;An ad may reach thousands of people, but it rarely carries the same weight as a personal recommendation. When a friend drops a link into your WhatsApp group saying, “You need to check this out,” it feels authentic. Trust is strongest in these private exchanges, and that’s exactly where brand influence is shifting.  
&nbsp;&nbsp;&nbsp;· Communities are replacing broadcasts  
&nbsp;&nbsp;&nbsp;The era of mass communication is fading. Smaller, highly engaged groups are shaping buying decisions faster than big public campaigns. Slack channels, Discord communities, and invite-only LinkedIn groups are driving deeper engagement than brand pages ever could. People no longer want to be marketed to they want to belong. 
`,
      `**How Brands Can Work With Dark Social**  

The challenge with dark social is obvious: you cannot fully track it. But you can still harness its power if you adapt.  
&nbsp;&nbsp;&nbsp;· Create content worth forwarding  
&nbsp;&nbsp;&nbsp;Ask yourself: would someone want to send this to a colleague or friend? Short, visual, and practical content performs best in private spaces. Infographics, quick explainer videos, or even well-crafted one-liners often spread far beyond what analytics can show.  
&nbsp;&nbsp;&nbsp;· Use smarter tracking methods  
&nbsp;&nbsp;&nbsp;No tool can fully measure dark social, but you can capture hints of it. Branded short links, UTM parameters, and referral codes can help you see which pieces of content spark private sharing.  
&nbsp;&nbsp;&nbsp;· Build exclusive communities  
&nbsp;&nbsp;&nbsp;If people are already gathering in private spaces, why not create those spaces yourself? A curated LinkedIn group, a Telegram channel, or a WhatsApp community can give your audience insider access while allowing your brand to participate directly in meaningful conversations.  
&nbsp;&nbsp;&nbsp;· Rethink your metrics  
&nbsp;&nbsp;&nbsp;Impressions and clicks are not enough anymore. Pay attention to spikes in direct traffic, the redemption of referral codes, and the conversations inside your own groups. These signals tell a more accurate story about your influence than vanity metrics.  
`,`**Real-World Signals**  

Some of the world’s most successful brands are already benefiting from dark social often without explicitly talking about it.  
Each of these examples shows how brand influence often spreads invisibly, yet powerfull`,
`**The Bigger Picture**  

Dark social is not a new phenomenon, but it is becoming more dominant. As public platforms get noisier and audiences grow skeptical of paid ads, private conversations will hold more sway. This does not mean marketers should abandon traditional social media, but it does mean we need to rethink what influence looks like.  
In 2026, success will not only be about creating content that gets likes on a public feed. It will be about creating content that people want to share in private, trusted spaces. It will be about building communities where conversations feel authentic.`,
`**Final Thought**  

The future of marketing is not only visible. Much of it is invisible, happening behind closed doors in chats, DMs, and private groups.  
Dark social is not a blind spot to fear , it is an opportunity to rethink how trust and influence really work online. The brands that recognize this shift early will gain an edge. They will not just be part of the conversation. They will be the conversation.  
So the question is not whether dark social exists. It is whether your brand will be part of it in 2026.  `,`**Conclusion**  
Startups don't need massive budgets to make an impact. By focusing on niche marketing, they can reach the right audience, build strong connections, and grow sustainably.
`
    ],
    author: "MS Shadil",
    time: "8 min read",
    image: "assets/dark.webp",
  },
  {
      id: 3,
    category: "Marketing",
    title: "How Storytelling Powers Niche Brands and Builds Loyal Communities.",
    excerpt:
      "Nowadays, in the marketplace, people don't just buy products. They buy into stories. This is especially relevant for niche...",
    content: [
      `Nowadays, in the marketplace, people don't just buy products. They buy into stories. This is especially relevant for niche brands. Unlike mass-market companies that compete based on scale and price, niche brands are able to survive and thrive by engaging into their passions with a smaller, and more specific audience - it is the story that will connect on a deeper level. In the world of niche brands, storytelling is much more than a marketing tactic, it is the essence of the brand. It is the component that shifts a product into an experience, a purchase into a belief, and a brand into a community.`,
      `**Why Storytelling Matters for Niche Brands**  

In the past decade, marketing has changed rapidly. Audiences are fragmented, attention spans are shorter, and consumers are more selective about who they interact with. This is the advantage of niche brands.  

For them, being everything for everyone isn't the goal. Being something meaningful for someone, is. Storytelling is important because:  

&nbsp;&nbsp;&nbsp;* It helps you be unique in a crowded market,  
&nbsp;&nbsp;&nbsp;* It establishes trust and authenticity,  
&nbsp;&nbsp;&nbsp;* It turns "casual" buyers into true believers that feel part of a movement.  
`, `Stories give meaning to products. They create reasons for customers to care (to engage, to share). Without the story, the best product in the world is at risk of being forgotten.  

A study conducted by Stanford University found that stories can be as much as 22 times more memorable than facts. In niche markets, where awareness and loyalty are at the top of the list, that difference is incredible.`,
      `**Examples of Storytelling in Action**  
In order to understand the impact of storytelling, we should consider brands that have exemplified it well.  

Patagonia has built its entire persona around environmental activism. They don’t simply sell outdoor gear—they invite their consumers to join a movement to protect the planet. Their campaigns, "Don't Buy This Jacket," were a complete inversion of standard marketing when they encouraged people to shop less. But, alarmingly, this honesty resulted in greater loyalty and sales because people were not just buying clothing—they were buying into values that they cared about.  
Glossier demonstrates how storytelling can also come from the community and not just the brand. Rather than establish themselves as the experts in beauty by telling their customers how to use things, their story is, "beauty inspired by real life." Their products are shaped by customer reviews and their marketing celebrates how customers are individuals. Once again, Glossier, as the brand, positioned the customers as the heroes in the story and turned buyers into ambassadors who were excited to share their experiences on social media.  

The examples above are the core of a simple lesson: storytelling is not about contriving something glamorous. It's about establishing alignment with real values, building on them, and creating real narratives that speak to your audience. 
`,
      `**How Storytelling Builds Communities**  

Stories do more than just captivate customers, they create communities.  

When a brand's story resonates with people on an emotional level, they begin to view themselves as part of something bigger. They are not merely consumers, they are taking part in a shared identity. That is the bedrock of community building.  

And through the playful act of telling stories, brands create consumers that do the following:  
&nbsp;&nbsp;&nbsp;· Advocate for the brand by sharing their own stories,  
&nbsp;&nbsp;&nbsp;· Develop alongside the brand as it grows,  
&nbsp;&nbsp;&nbsp;· Stick around because they are emotionally tied to something greater than the product itself.  
Consider the evolution of motorcycle company, Harley-Davidson to a worldwide community of riders. Their story is not about horsepower or chrome, it’s about freedom, rebellion and belonging. Riders don the brand as a badge of identity. That’s what storytelling entails; creating customers, and ultimately, communities for life.  
In the age of social media, these communities are self-propelling. People share experiences, document purchases and recommend brands they hold emotional ties to. Storytelling is the spark, and community is the flame.  
`,`**The Role of Digital Platforms in Storytelling**  

Storytelling will only continue to gain momentum as we move through an era of personalization and increased technologies. The advancement of technology - AI, big data, customer insights - will allow brands to tell individual-focused stories for the individual customer that will be relevant to them.  
There is also a caveat here. Customers are becoming rejected inauthentic content. The old generic personalization strategies simply will not work anymore. Storytelling cannot be used for manipulation. The future will be won by brands who use storytelling to connect - an authentic connection and not some calculated and presumed fake engagement.  
Successful niche brands do not have stories to tell to their audiences. They co-create stories with their audiences. Customers will become collaborators. We have already begun to see this with brands crowdsourcing and allowing feedback loops, as well as brands incorporating customer driven content in traditional campaigns.  
Trust will be the ultimate form of currency and thus authentic storytelling will be the bridge keeping niche brands on the forward path.  `,
`**Final Thought**  

Niche brands don’t need to shout the loudest, they need to communicate the most authentic, human, and memorable stories. The right storytelling can do more than just market; it can forge loyal communities.  
A good story can create a symbol out of a product, a relationship out of a transaction, and a movement out of a brand. That is the power of a narrative!  
Question for you: Which brand’s storytelling has had the greatest impact?`
    ],
    author: "MS Shadil",
    time: "8 min read",
    image: "assets/STORY.webp",
  },
  {
      id: 4,
    category: "Marketing",
    title: "The Creative Edge: Why Digital Marketing in 2025 Belongs to Bold Ideas, Not Just Algorithms",
    excerpt:
      "In 2025, every brand is playing in the same environment full of digital noise. Your strategies are the same. Your brand...",
    content: [
      `In 2025, every brand is playing in the same environment full of digital noise. Your strategies are the same. Your brand messages are the similar. The algorithms that drive your content are the same. Paid ads and automated tools have also changed the digital landscape. So the question becomes, how do you break through when everyone is playing the same game?  
      By being creative.  
      Digital marketing is no longer simply about SEO optimization, ad targeting, or performance campaigns. These are important parts of the toolkit, but have become the baseline for how you communicate. How you communicate will set you apart. What distinguishes good brands from memorable ones, is creativity. Creative brand marketing is how you tell stories, showcase memorable campaigns, or emotionally connect with an audience.  
      At SocialBureau, we have seen it time and time again: brands using SEO content marketing in combination with bold creative marketers occupy digital spaces faster than brands focused solely on technical executions.  `,
      `**Why Creativity Is the New Differentiator in Digital Marketing**  

Digital marketing for the past several years has been dominated by analytics, keywords, and paid search. While they are still important, the reality is: data can only optimize what exists. If you are lacking creativity, you are only becoming more efficient at being mediocre.  

Creativity cuts through the clutter. It drives SEO engagement metrics like dwell time, shares, and backlinks. It changes your brand from just another advertisement into a memorable story.  

And in 2025, as content saturation and automation with AI become more commonplace, creativity will be what differentiates your brand and makes it unique.  
`,
      `**The Three Pillars of Creative Digital Marketing in 2025**  

&nbsp;&nbsp;&nbsp;1. **Storytelling That Builds Authority**  
&nbsp;&nbsp;&nbsp;Customers now not only buy products, but rather, they buy stories. Storytelling is one of the strongest forms of brand building and SEO content marketing.    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• A tech company no longer shares features; it tells how entrepreneurs use its technology to innovate.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• A wellness brand not only sells products; it tells the transformation journey.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• A niche B2B agency like SocialBureau, doesn’t just run ads, it shows how it helps niche businesses grow, with strategy, storytelling, and creativity.   

&nbsp;&nbsp;&nbsp;2. **Design as a Growth Language**  
Aesthetics, is only part of the definition of great design. Great design is digital marketing. The design of your landing pages determines conversion rates. Consistent brand identity, leads to higher click through, clicks and brand recognition.  

As of 2025, design is now part of SEO performance. Google rewards sites with better UX, faster load time, and visually engaging structure. Design is creativity, and creativity has visibility in search.  


&nbsp;&nbsp;&nbsp;3. **Content as Conversation, Not Broadcast**  
&nbsp;&nbsp;&nbsp;· The notion of social media has shifted from one-way marketing to a conversation. Content must encourage engagement and not just push information.  
&nbsp;&nbsp;&nbsp;· Interactive blog posts using SEO keywords that stimulate comments.  
&nbsp;&nbsp;&nbsp;· Articles on LinkedIn that generate questions and discussion among professionals.  
&nbsp;&nbsp;&nbsp;· Campaigns that generate user-generated content, backlinks and build organic visibility for SEO.  
At SocialBureau we refer to this as “conversational content marketing” transforming your SEO-optimized postings into discussions that enhance ranking and relationships.  
`,
      `**Examples of Creativity in Digital Marketing**  
&nbsp;&nbsp;&nbsp;· Spotify Wrapped: A campaign that turned data into individual narratives, that generated millions of backlinks and shares.  
&nbsp;&nbsp;&nbsp;· Nike: they don't just show shoes they tell emotional stories about athletes. This also builds authority and creates organic coverage.  
&nbsp;&nbsp;&nbsp;· Duolingo: their humorous meme-based TikTok strategy illustrates how creativity accumulates to create reach, even in cut-throat environments.   
All of these examples combine content marketing, creativity, and digital storytelling; demonstrating creativity drives human connection, and SEO.  
`,
      `**How to Add Creativity to Your Digital Marketing Strategy**  

&nbsp;&nbsp;&nbsp;1. **Start With Audience Insight**  
Do not ask, “What should we post?” Ask, “What would my audience share?” Creative marketing always starts with empathy.

&nbsp;&nbsp;&nbsp;2. **Blend SEO With Storytelling**  
Use keyword research to identify what people are searching for, then wrap those keywords in engaging, creative narratives. This ensures your content ranks while staying memorable.  

&nbsp;&nbsp;&nbsp;3. **Experiment Boldly**  
From short-form videos to interactive infographics, creativity thrives on testing. Not every piece will work, but the ones that do will set you apart.  

&nbsp;&nbsp;&nbsp;4. **Invest in Cross-Functional Creativity**  
Creativity is not just a design team’s job. At SocialBureau, we integrate creative direction into performance marketing, SEO strategy, and even ad copywriting.  

&nbsp;&nbsp;&nbsp;5. **Think in Campaigns, Not Posts**  
A campaign-driven approach allows you to connect multiple SEO-optimized content pieces into a larger story arc.  

`,
      `**The Challenges of Creative Digital Marketing**  

&nbsp;&nbsp;&nbsp;· Fear of risk: Many brands avoid creative thinking due to a worry it could be “a flop.”  
&nbsp;&nbsp;&nbsp;· Chasing trends: Chasing single viral format dilutes long-term SEO and brand awareness and recognition.  
&nbsp;&nbsp;&nbsp;· Budget issues: High-quality creative campaigns require investment in design, storytelling and content creation.  
But the reality is that being forgettable costs more than being creative.  
`,
      `**The Future of Creativity in Digital Marketing**  

The next wave of digital marketing will be shaped by:   
&nbsp;&nbsp;&nbsp;· AI-powered content creation combined with human creativity.  
&nbsp;&nbsp;&nbsp;· Immersive experiences like AR/VR, where creative campaigns become interactive.  
&nbsp;&nbsp;&nbsp;· Community-driven SEO where users co-create content and boost organic rankings.  
At SocialBureau, we believe the winning formula for 2025 is SEO + creativity + community. Brands that embrace this blend will thrive in an era of both automation and saturation.  
`,`**Final Takeaway**  

Digital marketing in 2025 is not about chasing algorithms. It is about creating ideas that algorithms cannot ignore.  
Creativity is the differentiator. It is the edge that turns SEO content into conversations, ads into experiences, and campaigns into cultural moments.  
At SocialBureau, we help brands unlock that edge. Because when creativity meets strategy, the results are unforgettable.`
    ],
    author: "MS Shadil",
    time: "10 min read",
    image: "assets/creative.webp",
  },
  {
      id: 5,
    category: "Marketing",
    title: "Finding the Rhythm Between ROI and Creative Flow",
    excerpt:
      "Marketing is no longer an art or a science in the rapidly evolving digital world of today; rather, it is the rhythm of both disciplines operating in perfect harmony. Performance marketers...",
    content: [
      `Marketing is no longer an art or a science in the rapidly evolving digital world of today; rather, it is the rhythm of both disciplines operating in perfect harmony. Performance marketers who are adept at striking this balance regularly outperform rivals who depend on hunches, increase ROI, and develop stronger brands.  
      In order to ensure that campaigns not only look good but also produce quantifiable growth, this article examines how to balance creativity and analytics.  `,
      `**1. Understanding the Rhythm in Marketing**  
There is a recurring cadence to the planning, execution, analysis, and optimization of every successful campaign. Throwing ideas at the wall or running one-off advertisements are not the answer. Rather, you create an ever-evolving cycle:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Customer needs and market gaps are revealed by research and insights.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Insights are transformed into captivating narratives and images through creative ideation.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Feedback and testing hone what appeals to your audience.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Winning concepts are expanded through iteration and scaling, while underperforming concepts are retired.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Teams are able to measure, learn, and improve continuously when this rhythm is ingrained in your culture.`,
      `**2. The Power of ROI-Driven Decisions**  
The anchor that maintains creative flow rooted in business results is return on investment. Without it, even the most creative advertisements run the risk of turning into costly experiments.
To maintain ROI at the center:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Establish success early. Prior to creating assets, choose specific KPIs like return on ad spend, cost per acquisition, or click-through rate.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Invest in trustworthy tracking tools to determine which campaigns generate the most revenue.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• To determine which copy, image, or landing page variations convert the best, conduct A/B tests on a regular basis.   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Look past vanity metrics; likes and impressions are helpful markers but do not demonstrate growth.  `,
      `**3. Syncing Data With Creative Flow**  
When data encourages creativity rather than stifles it, the most successful campaigns are created.
**Start with knowledge rather than presumptions.**  
Customer behavior, preferences, and pain points are revealed by analytics. Give motion-first creatives priority if your audience prefers watching videos over still photos.  
**Convert data into stories**  
High checkout page abandonment rates, as reported in a report, are actually a story about user friction. Teams can create better solutions when they interpret numbers as stories.  
**Encourage teams to work together.**  
Creative designers and data analysts shouldn't operate separately. Frequent gatherings where both parties evaluate performance can generate concepts supported by data.  
**Adopt a creative, dynamic optimization strategy.**  
Multiple headlines, images, and calls-to-action can be tested simultaneously using platforms like Google Ads and Meta, which use algorithms to determine the most effective combination.
  `,
      `**4. Building Campaigns With Flow**  
      When strategy, analytics, and creativity work together harmoniously, a marketing "flow state" is achieved. To accomplish it:  
&nbsp;&nbsp;&nbsp;· Prior to creating assets, map out the customer journey so that each touchpoint leads potential customers to convert.    
&nbsp;&nbsp;&nbsp;· To keep messaging relevant and personal, generate ideas based on audience segments rather than just products.  
&nbsp;&nbsp;&nbsp;· Instead of overspending on unproven ideas, quickly prototype and iterate based on early feedback.  
&nbsp;&nbsp;&nbsp;· Regularly review outcomes using dashboards and performance reports.    
  `,
      `**5. Balancing Brand and Performance**  
Increasing conversions is not the only goal of creative flow. Customer trust and brand equity are key components of long-term ROI. Over time, emotionally charged campaigns frequently outperform hard-sell messaging.  
In order to balance both:   
&nbsp;&nbsp;&nbsp;· Combine compelling calls to action with brand storytelling.  
&nbsp;&nbsp;&nbsp;· Even when testing quickly, keep your visual identity.    
&nbsp;&nbsp;&nbsp;· Combine short-term performance goals with long-term learning or thought leadership materials.    
  `,
      `**6. Technology as a Conductor**  
      Performance marketing benefits from tools that keep all the parts in harmony, much like an orchestra depends on a conductor:  
&nbsp;&nbsp;&nbsp;· Analytics platforms combine information from several sources into a dashboard.  
&nbsp;&nbsp;&nbsp;· Campaign management is streamlined and the amount of manual labor is decreased with automation software.  
&nbsp;&nbsp;&nbsp;· Tools for creative collaboration enable rapid changes while upholding brand standards.  
&nbsp;&nbsp;&nbsp;· Artificial intelligence frees up teams to think strategically by assisting with large-scale data analysis, asset resizing, and headline suggestions.  

`,
      `**7. Future Trends**  

In the upcoming years, the relationship between creativity and data will only get stronger:   
&nbsp;&nbsp;&nbsp;· Before campaigns launch, marketers will be able to predict results and budget requirements thanks to predictive analytics.  
&nbsp;&nbsp;&nbsp;· Rapid personalization will be made possible by artificial intelligence, while authenticity will be ensured by human oversight.  
&nbsp;&nbsp;&nbsp;· First-party and zero-party data will become the main focus of privacy-first strategies, which call for value-driven and transparent storytelling.  
Market leaders will be brands that maintain their adaptability and willingness to try new things while still requiring quantifiable results.
`,`**8. Conclusion**  
High-performing campaigns are driven by their alignment, not just by data or creativity. You can build a marketing engine that is dependable and creative by creating a rhythm that links strategy, analytics, and design.  
The force that gives this engine its vitality and relevance is creativity, while ROI acts as the compass that keeps it headed in the right direction. Without information, concepts run the risk of becoming conjecture; without imagination, figures are inert and do not motivate action. When the two are combined, each click, impression, and conversion contributes to a greater story in which your brand gains credibility, produces quantifiable outcomes, and maintains its flexibility in a rapidly evolving environment.  
Marketers who approach experimentation as a discipline rather than an afterthought will succeed as channels, algorithms, and customer expectations continue to change. Without losing sight of the human connection that converts prospects into devoted advocates, they will measure, learn, and improve.  
Ultimately, aligning data with creative flow is a sustainable approach to growth, not just a strategy. Campaigns cease to be discrete endeavors and begin to evolve into an ongoing source of knowledge, creativity, and lasting value when rhythm and ROI align.  `
    ],
    author: "MS Shadil",
    time: "10 min read",
    image: "assets/roi.webp",
  },
];

export default function BlogPosts() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [activePost, setActivePost] = useState(null);

  const filteredPosts =
    selectedCategory === "All Posts"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-black">
      {/* If a post is selected, show detailed view */}
      {activePost ? (
        <div className="bg-gradient-to-br from-black to-[#3f0000] rounded-xl p-8 shadow-xl border border-[#3f0000]">
          <button
            onClick={() => setActivePost(null)}
            className="flex items-center text-sm text-gray-400 hover:text-[#ff0000] transition-colors mb-6"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Posts
          </button>

          <div className="flex items-center mb-3 space-x-3 pt-10">
            <span className="text-xs font-medium bg-white text-[#ff0000] px-3 py-1 rounded-full">
              {activePost.category}
            </span>
            <span className="text-xs text-white">{activePost.time}</span>
          </div>
          <img src={activePost.image} alt={activePost.title} />
          <h2 className="text-3xl text-white font-semibold mb-4 pt-5">
            {activePost.title}
          </h2>

          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed mb-6">
            {activePost.content.map((section, index) => (
              <div key={index}>
                <ReactMarkdown>
                  {addNewlinesBeforeHeadings(section)}
                </ReactMarkdown>
                {index < activePost.content.length - 1 && (
                  <div className="mb-8"></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#ffffffff] rounded-full flex items-center justify-center">
              <i className="fa fa-user " aria-hidden="true"></i>
            </div>
            <span className="text-sm text-gray-400">{activePost.author}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-10 lg:px-20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    selectedCategory === category
                      ? "bg-[#ff0000] text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="rounded-lg border shadow-sm overflow-hidden flex flex-col hover:border-[#ff0000] hover:scale-105 transition"
              >
                <div className={`h-1 bg-[#ff0000]`}></div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full mr-2">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.time}</span>
                  </div>
                  <img src={post.image} alt={post.title} />
                  <h3 className="text-lg text-white font-semibold mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 ">
                      <i
                        className="fa fa-user bg-white p-1 rounded-full"
                        aria-hidden="true"
                      ></i>
                      <span className="text-xs text-gray-700">
                        {post.author}
                      </span>
                    </div>
                    <button
                      onClick={() => setActivePost(post)}
                      className="text-sm text-[#ff0000] font-medium hover:scale-105"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}