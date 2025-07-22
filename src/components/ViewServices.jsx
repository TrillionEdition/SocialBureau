import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { p } from 'framer-motion/client';

const icons = [
  <i className="fas fa-chart-line text-white text-2xl"></i>,
  <i className="fas fa-sitemap text-2xl"></i>,
  <i className="fas fa-bullseye text-2xl"></i>,
  <i className="fas fa-comments  text-2xl"></i>,
  <i className="fas fa-cogs text-2xl"></i>,
  <i className="fas fa-crosshairs text-2xl"></i>,
  <i className="fas fa-users  text-2xl"></i>,
  <i className="fas fa-envelope text-2xl"></i>,
  <i className="fas fa-rocket text-2xl"></i>,
];
const cards = [
  { image:'',title: 'Full-Funnel Performance Marketing', content: 'Click costs don\'t matter if they don\'t convert. We deploy vertical-informed models and 14-day sprint cycles tied to LTV, not vanity ROAS.' },
  { image:'',title: 'Funnel Architecture & Growth Pathways', content: 'Stop leaking revenue. We map awareness to LTV with customized, P&L-aligned blueprints.' },
  { image:'',title: 'Conversion Rate Optimization & Landing Systems', content: 'Built with psychology, tested with micro-experiments. Bounce less. Convert more.' },
  { image:'',title: 'Messaging & Positioning for Niche Brands', content: 'Generic messaging kills growth. We uncover category-specific codes using ethnographic and linguistic analysis.' },
  { image:'',title: 'Web Application Development', content: 'From MVPs to scalable platforms, we design, develop, and deploy web apps that are fast, secure, and user-centric.' },
  { image:'',title: 'API-Driven Growth & Automated Distribution', content: 'Eliminate friction. Merge engineering + marketing for compounding growth loops.' },
  { image:'',title: 'Niche Market Penetration Strategy', content: 'We speak fluent healthtech, crypto, fintech, and more. Penetrate with precision.' },
  { image:'',title: 'Influencer & UGC Growth Engines', content: 'No vanity metrics. Just creator content built for performance and attribution.' },
  { image:'',title: 'Lifecycle & Email Automation Strategy', content: 'Trigger behavior-based flows that drive revenue, measured on 30-day impact.' },
  { image:'',title: 'Software GTM & Growth Architecture', content: 'PLG meets sales-assist in a system that converts trials and grows MRR.' }
];

export default function Ser() {
  const [activeIndex, setActiveIndex] = useState(null);


  return (
   <div className="flex space-x-2 px-6 pb-20">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            animate={{
              flex: activeIndex === index ? 3 : 1,
              transition: { duration: 0.4, ease: 'easeInOut' }
            }}
            className={clsx(
              'bg-gradient-to-br from-[#ff0000] to-[#000] h-[500px] max-w-[300px] rounded-xl text-white  flex overflow-hidden relative',
              'transition-all duration-300 '
            )}
          >
            {activeIndex === index ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm opacity-90 text-left "
              >
                 <img src={card.image} alt="img" className='w-[100vh]'/>
                <h3 className="text-xl font-bold mb-2 px-5 max-w-[300px]">{card.title}</h3><br/>
                <p className='px-5 max-w-[300px]'>{card.content}</p><br/>
                <a href={`/services/${encodeURIComponent(card.title)}`} className='px-5 font-bold hover:text-[1rem]'>Read More →</a>
              </motion.div>
            ) : (
            //   <motion.h3
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     className="transform -rotate-90 font-bold whitespace-nowrap text-md tracking-wide"
            //   >
            //     {card.title}
            //   </motion.h3>
        <p>
            {/* {icons[index]} */}
            <img src={card.image} className='h-[500px] object-cover' alt="img" />
        </p>
            )}
          </motion.div>
        ))}
      </div>
  );
}
