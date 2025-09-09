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
      "Starting a business in 2025 is both exciting and challenging. Most startups face limited budgets, smaller teams, and stiff...",
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
      "Starting a business in 2025 is both exciting and challenging. Most startups face limited budgets, smaller teams, and stiff...",
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