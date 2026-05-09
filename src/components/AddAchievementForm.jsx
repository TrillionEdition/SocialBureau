import React, { useState } from 'react';
import { addCompanyAchievementAPI } from '@/services/companyAchievementService';
import { CheckCircle, Award } from 'lucide-react';


const AddAchievementForm = ({ onAchievementAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        image: '',
        category: 'Milestone'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await addCompanyAchievementAPI(formData);
            setMessage('Achievement added successfully!');
            setFormData({
                title: '',
                description: '',
                date: '',
                image: '',
                category: 'Milestone'
            });
            if (onAchievementAdded) onAchievementAdded();
        } catch (error) {
            setMessage('Error adding achievement: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-red-900/30 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-red-900/40 to-red-800/30 border-b border-red-900/30 px-8 py-8">
                            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                                <Award size={32} className="text-red-500" />
                                Add Company Achievement
                            </h2>
                            <p className="text-red-300 text-sm mt-3">Celebrate and document your wins</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-red-300 text-sm mb-2 font-semibold">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800/50 border border-red-900/40 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="e.g. Best Agency 2024"
                                />
                            </div>

                            <div>
                                <label className="block text-red-300 text-sm mb-2 font-semibold">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800/50 border border-red-900/40 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all min-h-[100px] resize-none"
                                    placeholder="Tell us about the achievement..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-red-300 text-sm mb-2 font-semibold">Date</label>
                                    <input
                                        type="text"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-800/50 border border-red-900/40 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                        placeholder="e.g. January 2024"
                                    />
                                </div>
                                <div>
                                    <label className="block text-red-300 text-sm mb-2 font-semibold">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-800/50 border border-red-900/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all cursor-pointer"
                                    >
                                        <option value="Milestone">Milestone</option>
                                        <option value="Award">Award</option>
                                        <option value="Recognition">Recognition</option>
                                        <option value="Project">Project</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-red-300 text-sm mb-2 font-semibold">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800/50 border border-red-900/40 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 hover:shadow-lg hover:shadow-red-500/50"
                            >
                                {loading ? 'Adding...' : 'Add Achievement'}
                            </button>

                            {message && (
                                <p className={`text-center mt-4 font-medium ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAchievementForm;


