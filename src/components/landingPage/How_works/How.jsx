import React from 'react'

const How = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">How VisaFriendly Works in 60 Secs</h2>
            <p className="text-lg  text-center mb-10 max-w-xl">Skip the guesswork. See how finding a visa-friendly job really works.</p>

            {/* Platform UI Mockup */}
            <div className="bg-white relative rounded-xl shadow-xl p-6 md:p-10 w-full max-w-5xl mb-10 border border-gray-100">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg text-sm">VisaFriendly</div>
                        <div className="text-xs text-gray-400">H-1B + Cap-Exempt Jobs</div>
                        <div className="text-xs text-blue-600 font-semibold">H-1B Jobs</div>
                        <div className="text-xs text-gray-400">Cap-Exempt Jobs</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold text-blue-600">A</div>
                    </div>
                </div>
                {/* Search bar */}
                <div className="flex items-center space-x-2 mb-6">
                    <input className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none" placeholder="Search Role, Company" />
                    <input className="w-48 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none" placeholder="United States" />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg></button>
                </div>

                {/* Jobs List and Details */}
                <div className="flex flex-col md:flex-row gap-6 mt-6">
                    {/* Jobs List */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="text-xs text-blue-600 mb-2">2,368 Jobs found</div>
                        <div className="space-y-4">
                            <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                                <div className="font-semibold text-sm mb-1">Procurement Data Analyst - Audit & Compliance</div>
                                <div className="text-xs text-gray-500 mb-2">Infosys</div>
                                <div className="flex items-center text-xs text-gray-400 space-x-3 mb-2">
                                    <span>Seattle, WA</span>
                                    <span>•</span>
                                    <span>Full time - Onsite</span>
                                    <span>•</span>
                                    <span>2+ years exp</span>
                                    <span>•</span>
                                    <span>$3,000/month</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">54 Applicants</span>
                                    <span className="text-xs text-gray-400">10 days ago</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                                <div className="font-semibold text-sm mb-1">Data Analyst</div>
                                <div className="text-xs text-gray-500 mb-2">Infosys</div>
                                <div className="flex items-center text-xs text-gray-400 space-x-3 mb-2">
                                    <span>Seattle, WA</span>
                                    <span>•</span>
                                    <span>Full time - Onsite</span>
                                    <span>•</span>
                                    <span>2+ years exp</span>
                                    <span>•</span>
                                    <span>$3,000/month</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">45 Applicants</span>
                                    <span className="text-xs text-gray-400">10 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Job Details */}
                    <div className="flex-1 bg-white rounded-xl p-6 border border-gray-100 shadow relative">

                        <div className="font-semibold text-lg mb-1 mt-6">Procurement Data Analyst Audit & Compliance</div>
                        <div className="text-xs text-gray-500 mb-4">Wipro Limited</div>
                        <div className="flex items-center text-xs text-gray-400 space-x-6 mb-4">
                            <span><span className="font-semibold text-gray-700">Location:</span> Seattle, WA</span>
                            <span><span className="font-semibold text-gray-700">Job Type:</span> Full time - Onsite</span>
                            <span><span className="font-semibold text-gray-700">Experience:</span> 2+ years</span>
                            <span><span className="font-semibold text-gray-700">Salary:</span> $3,000/month</span>
                        </div>
                        <div className="mb-2 font-semibold text-gray-700">Job Description</div>
                        <p className="text-sm text-gray-500 mb-2">We're seeking a skilled Data Analyst to join [Company Name] and help drive data-driven decision-making across the organization. This role is perfect for individuals with a passion for analyzing data, uncovering trends, and providing actionable insights to improve business performance.</p>
                        <div className="mb-2 font-semibold text-gray-700">Key Responsibilities</div>
                        <ul className="list-disc list-inside text-sm text-gray-500">
                            <li>Collect, clean, and analyze large datasets to identify patterns and trends.</li>
                            <li>Prepare reports and visualizations for stakeholders.</li>
                            <li>Collaborate with cross-functional teams.</li>
                        </ul>
                        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold float-right">Apply</button>
                    </div>
                </div>
                <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 border border-gray-100">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><polygon points="10,8 16,12 10,16" fill="currentColor" /></svg>
                </div>
            </div>

            {/* Call to Action Button */}
            <button className="bg-[#313DEB] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition">Explore Platform →</button>
        </section>
    )
}

export default How
