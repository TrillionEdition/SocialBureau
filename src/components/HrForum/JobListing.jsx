import { Link } from "react-router-dom";

const jobs = [
    {
        title: "Front Office Receptionist",
        location: "Ernakulam, Kerala",
        candidates: 10,
        newCandidates: 0,
        status: "Paused",
        date: "February 9, 2026",
    },
    {
        title: "Web Developer Intern",
        location: "Kochi, Kerala",
        candidates: 89,
        newCandidates: 57,
        status: "Paused",
        date: "February 5, 2026",
    },
    {
        title: "Content Writers / Director",
        location: "Kochi, Kerala",
        candidates: 17,
        newCandidates: 0,
        status: "Open",
        date: "February 3, 2026",
    },
];

export default function JobsList() {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Main */}
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Jobs</h1>
                    <Link to="/appy-job">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            Post a job
                        </button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-6">
                    {["Status", "Title", "Location", "Sponsorship"].map((f) => (
                        <button
                            key={f}
                            className="border px-3 py-1 rounded-full text-sm"
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Job title</th>
                                <th className="p-3">Candidates</th>
                                <th className="p-3">Date posted</th>
                                <th className="p-3">Job status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobs.map((job, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-3">
                                        <Link to="/job-details">
                                            <p className="text-blue-600 font-medium hover:underline cursor-pointer">
                                                {job.title}
                                            </p>
                                        </Link>
                                        <p className="text-gray-500">{job.location}</p>
                                    </td>

                                    <td className="p-3">
                                        <p>{job.candidates} All</p>
                                        <p className="text-blue-600">{job.newCandidates} New</p>
                                    </td>

                                    <td className="p-3">{job.date}</td>

                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${job.status === "Open"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {job.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main >
        </div >
    );
}
