import React, { useState } from 'react'; 
import H1BSponsorModal from './H1BSponsorModal';

const H1BReport = ({ companyName }) => {
    const [selectedYear, setSelectedYear] = useState('2025');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Sample data - you can replace this with actual data passed as props
    const yearlyIntakes = [
        { year: '2025', intakes: 40 },
        { year: '2024', intakes: 207 },
        { year: '2023', intakes: 156 }
    ];
    
    const jobTitlesData = {
        '2025': [
            { title: 'Data Analytics', intakes: 10 },
            { title: 'UX UI', intakes: 16 },
            { title: 'Software', intakes: 18 },
            { title: 'Software', intakes: 17 },
            { title: 'Data Analytics', intakes: 54 }
        ],
        '2024': [
            { title: 'Software Engineer', intakes: 45 },
            { title: 'Data Scientist', intakes: 38 },
            { title: 'Product Manager', intakes: 22 },
            { title: 'UX Designer', intakes: 19 },
            { title: 'DevOps Engineer', intakes: 15 }
        ],
        '2023': [
            { title: 'Full Stack Developer', intakes: 52 },
            { title: 'Data Analyst', intakes: 41 },
            { title: 'UI/UX Designer', intakes: 28 },
            { title: 'Backend Developer', intakes: 24 },
            { title: 'Frontend Developer', intakes: 18 }
        ]
    };

    return (
        <div className="w-full max-w-none py-4 bg-white overflow-y-auto max-h-96 scrollbar-hide">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">H1B Report</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                    View H1B Sponsor Case
                </button>
            </div>

            <div className="space-y-6">
                {/* Yearly Intakes Table */}
                <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                    <p className="text-lg font-semibold p-4 text-gray-900 bg-gray-100">Yearly Intakes</p>
                    <div className="bg-white">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">Year</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">No. of Intakes</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {yearlyIntakes.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                                        <td className="py-3 px-4 text-gray-600 text-sm md:text-base">{item.year}</td>
                                        <td className="py-3 px-4 text-gray-900 text-sm md:text-base">{item.intakes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top H1B Job Titles */}
                <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                    <div className="flex justify-between items-center p-4 bg-gray-100">
                        <p className="text-lg font-semibold text-gray-900">Top H1b Job Titles</p>
                        <div className="relative">
                            <select 
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {Object.keys(jobTitlesData).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="bg-white">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">Job Title</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">No. of Intakes</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {jobTitlesData[selectedYear]?.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100  last:border-b-0">
                                        <td className="py-3 px-4 text-gray-600 text-sm md:text-base ">{item.title}</td>
                                        <td className="py-3 px-4 text-gray-900 font-medium text-sm md:text-base ">{item.intakes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* H1B Sponsor Modal */}
            <H1BSponsorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                companyName={companyName}
            />
        </div>
    );
};

export default H1BReport; 
