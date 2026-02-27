import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AchievementCard from '../components/AchievementCard';
import AddAchievementForm from '../components/AddAchievementForm';
import { getAllCompanyAchievementsAPI } from '../..companyAchievementService';
import LoadingSpinner from '../components/LoadingSpinner';

const CompanyAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdmin, setShowAdmin] = useState(false);

    const fetchAchievements = async () => {
        try {
            const response = await getAllCompanyAchievementsAPI();
            setAchievements(response.data);
        } catch (error) {
            console.error("Error fetching achievements:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-500/30">


            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <h2 className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-fade-in">

                    </h2>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                        Company Achievements
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A testament to our commitment, innovation, and the milestones that define SocialBureau's path to global leadership in digital excellence.
                    </p>
                </div>

                {/* Achievements Grid */}
                <div className="max-w-7xl mx-auto">
                    {achievements.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement._id}
                                    className="group relative p-6 bg-gradient-to-br from-gray-900 to-black 
                                border border-red-500/30 rounded-2xl 
                                hover:border-red-500/60 
                                hover:shadow-lg hover:shadow-red-500/20
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-0
                                transition-all duration-300"
                                >
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

                                    <div className="relative z-10">
                                        <AchievementCard
                                            {...achievement}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-red-500/30 backdrop-blur-sm">
                            <div className="text-6xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold text-gray-300">No achievements recorded yet</h3>
                            <p className="text-gray-500 mt-2">Check back soon to see our latest milestones!</p>
                        </div>
                    )}
                </div>

                {/* Secret Admin Button (Double click to reveal form) */}
                <div
                    className="fixed bottom-4 left-4 w-10 h-10 opacity-0 hover:opacity-10 cursor-help"
                    onDoubleClick={() => setShowAdmin(!showAdmin)}
                ></div>

                {showAdmin && (
                    <div className="mt-20 border-t border-red-500/30 pt-10">
                        <AddAchievementForm onAchievementAdded={fetchAchievements} />
                    </div>
                )}
            </main>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-in;
                }
            `}</style>
        </div>
    );
};

export default CompanyAchievements;