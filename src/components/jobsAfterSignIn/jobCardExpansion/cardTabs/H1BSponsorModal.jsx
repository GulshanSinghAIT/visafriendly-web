import React, { useState, useEffect } from 'react';
import { X, Search, ChevronDown, Loader2 } from 'lucide-react';

const H1BSponsorModal = ({ isOpen, onClose, companyName = "" }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCompany, setSearchCompany] = useState(companyName);
    const [searchJobTitle, setSearchJobTitle] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [h1bData, setH1bData] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 15
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // API Functions
    const fetchH1bData = async (page = 1, company = '', role = '', year = '') => {
        setLoading(true);
        setError(null);
        
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '15'
            });
            
            if (company) params.append('company', company);
            if (role) params.append('role', role);
            if (year) params.append('year', year);
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs/h1b-sponsor-cases?${params}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch H1B data');
            }
            
            const data = await response.json();
            
            if (data.success) {
                setH1bData(data.data);
                setPagination(data.pagination);
                setCurrentPage(data.pagination.currentPage);
            } else {
                throw new Error(data.message || 'Failed to fetch H1B data');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching H1B data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableYears = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs/h1b-sponsor-cases/years`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch available years');
            }
            
            const data = await response.json();
            
            if (data.success) {
                setAvailableYears(data.years);
            }
        } catch (err) {
            console.error('Error fetching available years:', err);
        }
    };

    // Effects
    useEffect(() => {
        if (isOpen) {
            fetchAvailableYears();
            fetchH1bData(1, searchCompany, searchJobTitle, selectedYear);
        }
    }, [isOpen]);

    // Debounced search effect
    useEffect(() => {
        if (isOpen) {
            const debounceTimer = setTimeout(() => {
                fetchH1bData(1, searchCompany, searchJobTitle, selectedYear);
            }, 500); // 500ms delay

            return () => clearTimeout(debounceTimer);
        }
    }, [searchCompany, searchJobTitle, selectedYear, isOpen]);

    // Handle pagination
    const handlePageChange = (page) => {
        fetchH1bData(page, searchCompany, searchJobTitle, selectedYear);
    };

    // Reset filters
    const resetFilters = () => {
        setSearchCompany(companyName);
        setSearchJobTitle('');
        setSelectedYear('');
    };

    // Format salary for display
    const formatSalary = (salary) => {
        if (!salary) return 'N/A';
        return `$${salary.toLocaleString()}`;
    };

    // Format date for display
    const formatDate = (dateNum) => {
        if (!dateNum) return 'N/A';
        const dateStr = dateNum.toString();
        if (dateStr.length === 8) {
            const year = dateStr.substring(0, 4);
            const month = dateStr.substring(4, 6);
            const day = dateStr.substring(6, 8);
            return `${year}-${month}-${day}`;
        }
        return dateStr;
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">H1B Labor Certification Report</h2>
                        {pagination.totalCount > 0 && (
                            <p className="text-sm text-gray-600 mt-1">
                                {pagination.totalCount.toLocaleString()} total records found
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search Filters */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Company Search */}
                        <div className="relative flex-1 min-w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchCompany}
                                onChange={(e) => setSearchCompany(e.target.value)}
                                placeholder="Search company"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Job Title Search */}
                        <div className="relative flex-1 min-w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchJobTitle}
                                onChange={(e) => setSearchJobTitle(e.target.value)}
                                placeholder="Search Job Title"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Year Filter */}
                        <div className="relative">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Years</option>
                                {availableYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Reset Filters Button */}
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto overflow-y-auto max-h-96">
                    {loading && (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="animate-spin mr-2" size={20} />
                            <span className="text-gray-600">Loading H1B data...</span>
                        </div>
                    )}
                    
                    {error && (
                        <div className="flex items-center justify-center py-8">
                            <span className="text-red-600">Error: {error}</span>
                        </div>
                    )}
                    
                    {!loading && !error && (
                        <table className="w-full">
                            <thead className="bg-gray-50 backdrop-blur-2xl sticky top-0 z-10">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Year</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Employer</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Job Title</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Experience Level</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Base Salary</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Location</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Submit Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Start Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Case Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {h1bData.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center py-8 text-gray-500">
                                            No H1B data found for the selected filters.
                                        </td>
                                    </tr>
                                ) : (
                                    h1bData.map((item, index) => (
                                        <tr key={item.caseId || index} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-gray-600 text-sm">{item.year}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">{item.EmployerName || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">{item.jobTitle || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm text-center">{item.experienceLevel || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">{formatSalary(item.baseSalary)}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">{item.Location || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">{formatDate(item.submitDate)}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">{formatDate(item.startDate)}</td>
                                            <td className="py-3 px-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.caseStatus === 1 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {item.caseStatus === 1 ? 'Certified' : 'Other'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                        Showing {pagination.totalCount > 0 ? ((pagination.currentPage - 1) * pagination.limit + 1) : 0} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount.toLocaleString()} results
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
                            disabled={!pagination.hasPrevPage || loading}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            « Previous
                        </button>
                        
                        {/* Show first few pages */}
                        {[...Array(Math.min(3, pagination.totalPages))].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    disabled={loading}
                                    className={`px-3 py-1 text-sm rounded ${
                                        pagination.currentPage === pageNumber
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                    } disabled:opacity-50`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                        
                        {/* Show ellipsis if there are many pages */}
                        {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                            <span className="px-2 text-sm text-gray-600">...</span>
                        )}
                        
                        {/* Show current page if it's not in the first 3 */}
                        {pagination.currentPage > 3 && pagination.currentPage < pagination.totalPages - 2 && (
                            <button
                                onClick={() => handlePageChange(pagination.currentPage)}
                                disabled={loading}
                                className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
                            >
                                {pagination.currentPage}
                            </button>
                        )}
                        
                        {/* Show ellipsis before last page */}
                        {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                            <span className="px-2 text-sm text-gray-600">...</span>
                        )}
                        
                        {/* Show last page if there are more than 3 pages */}
                        {pagination.totalPages > 3 && (
                            <button
                                onClick={() => handlePageChange(pagination.totalPages)}
                                disabled={loading}
                                className={`px-3 py-1 text-sm rounded ${
                                    pagination.currentPage === pagination.totalPages
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                } disabled:opacity-50`}
                            >
                                {pagination.totalPages}
                            </button>
                        )}
                        
                        <button
                            onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                            disabled={!pagination.hasNextPage || loading}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            Next »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default H1BSponsorModal; 
