import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  {
    name: 'KitKat',
    image: 'assets/kitkat.webp',
    imgClass: 'w-[48px] h-[48px]', // Default size
    GoogleAds: 10,
    MetaAds: 29,
  },
  {
    name: 'Nike',
    image: 'assets/nike.png',
    imgClass: 'w-[38px] h-[38px]', // Little shorter
    GoogleAds: 70,
    MetaAds: 100,
  },
  {
    name: 'Coca-Cola',
    image: 'assets/cola.jpg', // USER: Add Coca-Cola logo URL here
    imgClass: 'w-[63px] h-[53px]', // Little bigger
    GoogleAds: 37,
    MetaAds: 116,
  },
  {
    name: 'Apple',
    image: 'assets/apple.png', // USER: Add Apple logo URL here
    imgClass: 'w-[40px] h-[40px]', // Little shorter
    GoogleAds: 150,
    MetaAds: 54,
  },
  {
    name: 'Samsung',
    image: 'assets/sam.png', // USER: Add Samsung logo URL here
    imgClass: 'w-[90px] h-[50px]', // More bigger
    GoogleAds: 133,
    MetaAds: 91,
  },
];

const CustomXAxisTick = ({ x, y, payload }) => {
  const brand = data.find((d) => d.name === payload.value);
  if (!brand) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* foreignObject allows rendering HTML elements like <img> inside the SVG chart axis */}
      <foreignObject x={-60} y={5} width={120} height={80}>
        <div className="flex flex-col items-center justify-start w-full h-full pt-2 px-1">
          {brand.image ? (
            <img
              src={brand.image}
              alt={brand.name}
              className={`${brand.imgClass || 'w-12 h-12'} object-contain mb-1 flex-shrink-0 transition-all duration-300`}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#f5f5f7] border border-dashed border-[#D2D2D7] flex items-center justify-center mb-2 flex-shrink-0">
              <span className="text-[10px] text-gray-400">Logo</span>
            </div>
          )}
          <span className="text-[11px] sm:text-[12px] font-bold text-[#1D1D1F] text-center w-full leading-tight break-words">
            {brand.name}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const AdChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-[#D2D2D7] shadow-xl group hover:shadow-2xl transition-shadow duration-500"
    >
      <div className="mb-8">
        <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.2em] mb-2 block italic opacity-80">
          Global Market Insights
        </span>
        <h3 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tighter italic">
          Top Brand <span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Ad Spend.</span>
        </h3>
        <div className="text-[15px] font-light text-[#6E6E73] mt-3 leading-relaxed">
          <p>Estimated <b>monthly</b> digital ad spend (in Millions USD) modeling third-party intelligence patterns.</p>
          <p className="text-[12px] mt-2 italic">*Brands do not publicly disclose exact platform-specific media line items. Values model realistic splits based on intelligence trackers.</p>
        </div>
      </div>

      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 60, // Increased bottom margin to fit the image and text
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick />}
              interval={0}
              height={100}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E8E93', fontSize: 12, fontWeight: 600, fontFamily: 'Inter' }}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(232, 0, 26, 0.04)' }}
              contentStyle={{
                backgroundColor: '#1D1D1F',
                borderRadius: '16px',
                border: 'none',
                color: '#fff',
                padding: '16px 20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
              itemStyle={{ fontSize: '14px', fontWeight: 700, padding: '4px 0', fontFamily: 'Inter' }}
              labelStyle={{ color: '#8E8E93', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, fontFamily: 'Inter' }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 700, color: '#1D1D1F', fontFamily: 'Inter' }}
            />
            <Bar
              dataKey="GoogleAds"
              name="Google Ads"
              fill="#E8001A"
              radius={[6, 6, 0, 0]}
              barSize={32}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Bar
              dataKey="MetaAds"
              name="Meta Ads"
              fill="#1515bcff"
              radius={[6, 6, 0, 0]}
              barSize={32}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AdChart;

