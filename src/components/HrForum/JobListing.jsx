import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/hr-jobs";

export default function JobsList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setJobs(response.data);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Failed to load jobs");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main */}
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Jobs</h1>
                    <Link to="/appy-job">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Post a job
                        </button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-6">
                    {["Status", "Title", "Location", "Sponsorship"].map((f) => (
                        <button
                            key={f}
                            className="bg-white border text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">Job title</th>
                                <th className="p-4 font-semibold text-gray-600">Company</th>
                                <th className="p-4 font-semibold text-gray-600">Date posted</th>
                                <th className="p-4 font-semibold text-gray-600">Job status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500 bg-white">
                                        No jobs found. Start by posting one!
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <Link to={`/job-details/${job._id}`}>
                                                <p className="text-blue-600 font-semibold hover:underline cursor-pointer">
                                                    {job.jobTitle}
                                                </p>
                                            </Link>
                                            <p className="text-gray-500 mt-1">{job.location} ({job.locationType})</p>
                                        </td>

                                        <td className="p-4">
                                            <p className="font-medium text-gray-900">{job.companyName}</p>
                                            {job.companyWebsite && (
                                                <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-blue-500 truncate block max-w-[150px]">
                                                    {job.companyWebsite.replace(/^https?:\/\//, '')}
                                                </a>
                                            )}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {new Date(job.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : job.status === "paused"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main >
        </div >
    );
}
