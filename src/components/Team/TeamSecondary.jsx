import React from 'react';
import {
    Users,
    CheckCircle,
    ThumbsUp,
    Award,
    Layout,
    Code,
    ShoppingCart,
    Zap,
    Settings
} from 'lucide-react';

const TeamSecondary = () => {
    const stats = [
        { icon: <Award className="text-red-600" size={24} />, value: '1+', label: 'Years Experience' },
        { icon: <CheckCircle className="text-red-600" size={24} />, value: '250+', label: 'Projects Completed' },
        { icon: <ThumbsUp className="text-red-600" size={24} />, value: '99.9%', label: 'Client Satisfaction' },
        { icon: <Users className="text-red-600" size={24} />, value: '15+', label: 'Team Members' },
    ];

    const services = [
        {
            icon: <Layout className="text-red-600" size={24} />,
            title: 'Innovative Design',
            desc: 'Creating UI/UX that delights users'
        },
        {
            icon: <Code className="text-red-600" size={24} />,
            title: 'Web Development',
            desc: 'Clean, scalable & future-ready code'
        },
        {
            icon: <ShoppingCart className="text-red-600" size={24} />,
            title: 'E-Commerce Solutions',
            desc: 'Powerful online stores that convert'
        },
        {
            icon: <Zap className="text-red-600" size={24} />,
            title: 'SEO & Speed Optimization',
            desc: 'Faster websites that rank higher'
        },
        {
            icon: <Settings className="text-red-600" size={24} />,
            title: 'Support & Maintenance',
            desc: '24/7 dedicated technical support'
        },
    ];

    return (
        <section className="relative py-24 px-6 md:px-16 flex flex-col gap-12 overflow-hidden bg-black">
            {/* BACKGROUND GRADIENT FROM DESIGN */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: 'linear-gradient(135deg, #000000 17%, rgba(255, 30, 30, 0.27) 56%, #000000 89%)'
                }}
            />

            {/* SUBTLE DOT PATTERN */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{ backgroundImage: 'radial-gradient(#FF1E1E 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
            />

            <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/10 to-transparent rounded-[24px] blur opacity-40 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative flex flex-wrap md:flex-nowrap items-center justify-between bg-white/[0.03] backdrop-blur-[30px] border border-white/[0.08] rounded-[24px] py-5 px-8 md:px-10 gap-8 shadow-2xl">
                        {stats.map((stat, index) => (
                            <React.Fragment key={index}>
                                <div className="flex items-center gap-5 flex-1 min-w-[200px]">
                                    <div className="p-3 bg-red-600/5 rounded-xl border border-red-600/10">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white leading-none">{stat.value}</div>
                                        <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-medium max-w-[110px]">{stat.label}</div>
                                    </div>
                                </div>
                                {index < stats.length - 1 && (
                                    <div className="hidden md:block w-px h-12 bg-white/10" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/5 to-transparent rounded-[24px] blur opacity-30 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative flex flex-wrap md:flex-nowrap items-center justify-between bg-white/[0.03] backdrop-blur-[30px] border border-white/[0.08] rounded-[24px] py-5 px-8 md:px-10 gap-8 shadow-2xl">
                        {services.map((service, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col gap-4 flex-1 min-w-[180px]">
                                    <div className="flex items-center gap-3">
                                        {service.icon}
                                        <div className="text-sm font-bold text-white uppercase tracking-tight">{service.title}</div>
                                    </div>
                                    <div className="text-[10px] text-gray-500 leading-tight max-w-[117px]">
                                        {service.desc}
                                    </div>
                                </div>
                                {index < services.length - 1 && (
                                    <div className="hidden md:block w-px h-16 bg-white/10" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TeamSecondary;