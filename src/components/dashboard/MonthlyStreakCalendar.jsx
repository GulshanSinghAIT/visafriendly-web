import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './MonthlyStreakCalendar.css';
import { useUser } from "@clerk/clerk-react"

const MonthlyStreakCalendar = () => {
    const today = new Date();
    const [date, setDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [loginDays, setLoginDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user, isLoaded, isSignedIn } = useUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    const fetchLoginDays = async (year, month) => {
        if (!userEmail) return; // Don't fetch if no email available
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login/${encodeURIComponent(userEmail)}/month?year=${year}&month=${month + 1}`);
            if (!response.ok) {
                throw new Error('Failed to fetch login data');
            }
            const result = await response.json();
            if (result.success) {
                setLoginDays(result.data);
            } else {
                throw new Error(result.message || 'Failed to fetch login data');
            }
        } catch (err) {
            console.error('Error fetching login days:', err);
            setError(err.message);
            setLoginDays([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userEmail) {
            fetchLoginDays(date.getFullYear(), date.getMonth());
        }
    }, [date, userEmail]);

    // Helper to get the indices of the current streak (ending at today or last true)
    const getCurrentStreakIndices = (loginDays, todayIdx) => {
        let indices = [];
        for (let i = todayIdx; i >= 0; i--) {
            if (loginDays.includes(i + 1)) {
                indices.unshift(i);
            } else {
                break;
            }
        }
        return indices;
    };

    // Find the current streak indices for the displayed month
    let currentStreakIndices = [];
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
        currentStreakIndices = getCurrentStreakIndices(loginDays, today.getDate() - 1);
    } else {
        // For previous months, no current streak, all trues are faded
        currentStreakIndices = [];
    }

    // Custom tile content
    const tileContent = ({ date: tileDate, view }) => {
        if (view === 'month' && tileDate.getMonth() === date.getMonth()) {
            const day = tileDate.getDate();
            const idx = day - 1;
            const hasLogin = loginDays.includes(day);
            if (hasLogin) {
                if (currentStreakIndices.includes(idx)) {
                    return <span className="streak-fire bright"> <img className='h-[25px] w-[25px]' src="/images/noto_fire.svg" alt="streak" /></span>;
                } else {
                    return <span className="streak-fire faded"> <img className='h-[25px] w-[25px]' src="/images/noto_fire.svg" alt="streak" /></span>;
                }
            }
        }
        return null;
    };

    const tileClassName = ({ date: tileDate, view }) => {
        if (view === 'month' && tileDate.getMonth() === date.getMonth()) {
            const day = tileDate.getDate();
            const idx = day - 1;
            const hasLogin = loginDays.includes(day);
            if (hasLogin) {
                return currentStreakIndices.includes(idx) ? 'streak-day-bright' : 'streak-day-faded';
            }
        }
        return null;
    };

    // Only allow navigation within the last 5 months
    const minDate = new Date(today.getFullYear(), today.getMonth() - 4, 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Show loading state while Clerk is loading user data
    if (!isLoaded) {
        return (
            <div className="p-4 md:p-8">
                <div className="text-lg md:text-[22px] font-semibold text-[#000] mb-2">Monthly Streak</div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading user data...</div>
                </div>
            </div>
        );
    }

    // Show error if user is not signed in
    if (!isSignedIn) {
        return (
            <div className="p-4 md:p-8">
                <div className="text-lg md:text-[22px] font-semibold text-[#000] mb-2">Monthly Streak</div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-500">Please sign in to view your streak.</div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-4 md:p-8">
                <div className="text-lg md:text-[22px] font-semibold text-[#000] mb-2">Monthly Streak</div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-8">
                <div className="text-lg md:text-[22px] font-semibold text-[#000] mb-2">Monthly Streak</div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 ">
            <div className="text-lg md:text-[22px] font-semibold text-[#000] mb-2">Monthly Streak</div>
            <Calendar
                value={date}
                onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
                activeStartDate={date}
                minDetail="month"
                maxDetail="month"
                minDate={minDate}
                maxDate={maxDate}
                showNeighboringMonth={false}
                tileContent={tileContent}
                tileClassName={tileClassName}
                prev2Label={null}
                next2Label={null}
                className="w-full"
                formatMonthYear={(locale, date) =>
                    date.toLocaleString('default', { month: 'long', year: 'numeric' })
                }
            />
        </div>
    );
};

export default MonthlyStreakCalendar;
