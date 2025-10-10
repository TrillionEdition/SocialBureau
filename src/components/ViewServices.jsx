import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { p } from 'framer-motion/client';
import { Link } from 'react-router-dom';

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
  { image:'assets/service6.webp',title: 'API-Driven-Growth-Automated-Distribution', content: 'Eliminate friction. Merge engineering + marketing for compounding growth loops.' },
  { image:'assets/service1.webp',title: 'Full-Funnel-Performance-Marketing', content: 'Click costs don\'t matter if they don\'t convert. We deploy vertical-informed models and 14-day sprint cycles tied to LTV, not vanity ROAS.' },
  { image:'assets/service2.webp',title: 'Funnel-Architecture-Growth-Pathways', content: 'Stop leaking revenue. We map awareness to LTV with customized, P&L-aligned blueprints.' },
  { image:'assets/service3.webp',title: 'Conversion-Rate-Optimization-Landing-Systems', content: 'Built with psychology, tested with micro-experiments. Bounce less. Convert more.' },
  { image:'assets/service4.webp',title: 'Messaging-Positioning-for-Niche-Brands', content: 'Generic messaging kills growth. We uncover category-specific codes using ethnographic and linguistic analysis.' },
  { image:'assets/service5.webp',title: 'Web-Development', content: 'From MVPs to scalable platforms, we design, develop, and deploy web apps that are fast, secure, and user-centric.' },  
  { image:'assets/service7.webp',title: 'Niche-Market-Penetration-Strategy', content: 'We speak fluent healthtech, crypto, fintech, and more. Penetrate with precision.' },
  { image:'assets/service8.webp',title: 'Influencer-UGC-Growth-Engines', content: 'No vanity metrics. Just creator content built for performance and attribution.' },
  { image:'assets/service9.webp',title: 'Lifecycle-Email-Automation-Strategy', content: 'Trigger behavior-based flows that drive revenue, measured on 30-day impact.' },
  { image:'assets/service10.webp',title: 'Software-GTM-Growth-Architecture', content: 'PLG meets sales-assist in a system that converts trials and grows MRR.' }
];

export default function Ser() {
  const [activeIndex, setActiveIndex] = useState(null);


  return (
   <div className="flex space-x-2 px-6">
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
    'bg-gradient-to-br from-[#ff0000] to-[#000] rounded-xl text-white cursor-pointer flex h-[500px] max-w-[300px] overflow-hidden relative',
    activeIndex === index ? '' : 'justify-center text-center'
  )}
          >
            {activeIndex === index ? (

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm opacity-90 p-0 m-0"
                
              >
                <Link to={`/services/${encodeURIComponent(card.title)}`}>
                <img src={card.image} alt="img" className='min-w-[300px]'/>
                <p className="text-xl font-bold px-2">{card.title}</p>
                <p className='px-2 py-2'>{card.content}</p>
                <p className='px-2 font-bold hover:text-[1rem]'>Read More </p>
                </Link>
              </motion.div>
            ) 
            : (
              <motion.h3
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-90 font-bold whitespace-nowrap text-md tracking-wide"
>
  {card.title}
</motion.h3>

            )}
          </motion.div>
        ))}
      </div>
  );
}