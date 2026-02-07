import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
    {
        id: '1',
        number: 'NO. 03',
        category: 'BRAND INSTALLATION',
        title: 'Silent Symphony',
        tags: ['DENTSU', 'SONY'],
        description: 'An immersive audio-visual experience created for the launch of the new noise-canceling headphones.',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '2',
        number: 'NO. 04',
        category: '3D ANIMATION',
        title: 'Future City Vision',
        tags: ['SEOUL', 'CHEIL WORLDWIDE', 'SAMSUNG'],
        description: 'A futuristic 3D cityscape animation created for Samsung\'s global innovation conference.',
        imageUrl: 'https://images.unsplash.com/photo-1449156001935-d28734b467bb?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '3',
        number: 'NO. 05',
        category: 'EVENT PRODUCTION',
        title: 'Waves of Light',
        tags: ['NEW YORK', 'W+K', 'NIKE'],
        description: 'A kinetic light-based stage design for Nike\'s athlete unveiling event.',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-e81342ee5ff30?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '4',
        number: 'NO. 06',
        category: 'ART DIRECTION',
        title: 'Beyond the Canvas',
        tags: ['LOS ANGELES', 'DROGA5', 'ADOBE'],
        description: 'A mixed-media digital exhibition showcasing AI-assisted creativity for Adobe Max.',
        imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '5',
        number: 'NO. 07',
        category: 'BRAND ACTIVATION',
        title: 'The Green Pulse',
        tags: ['COPENHAGEN', 'OGILVY', 'IKEA'],
        description: 'A biodegradable pop-up forest installation promoting sustainable living.',
        imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000'
    }
];

// ProjectCard Component
const ProjectCard = ({ project, isFirst }) => {
    return (
        <div
            className={`flex items-center min-w-fit px-[5vw] ${isFirst ? 'pl-[10vw]' : ''
                }`}
        >
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 h-full py-20">
                {/* Project Image */}
                <div className="relative group overflow-hidden w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] flex-shrink-0">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                </div>

                {/* Project Info */}
                <div className="flex flex-col max-w-[400px] lg:max-w-[500px] flex-shrink-0">
                    <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-8 uppercase">
                        <span>{project.number}</span>
                        <span className="w-8 h-px bg-zinc-800" />
                        <span>{project.category}</span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-serif leading-tight mb-8">
                        {project.title}
                    </h2>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] lg:text-xs font-bold tracking-widest text-zinc-400 uppercase"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-zinc-400 text-lg lg:text-xl leading-relaxed mb-12 font-light">
                        {project.description}
                    </p>

                    <a
                        href="#"
                        className="group relative inline-flex items-center self-start text-[10px] tracking-[0.2em] font-bold uppercase py-2"
                    >
                        <span className="relative z-10 transition-colors group-hover:text-white">
                            View Case Study
                        </span>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-white group-hover:h-[2px]" />
                    </a>
                </div>
            </div>

            {/* Vertical Divider between cards */}
            <div className="h-[60vh] w-px bg-zinc-900 mx-[5vw]" />
        </div>
    );
};
