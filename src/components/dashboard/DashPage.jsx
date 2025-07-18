import React, { useState, useEffect } from 'react'
import { NavBarrr } from '../Navbar/NavBar.jsx'
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Footer } from '../landingPage/ninth/Footer.jsx'
import MonthlyStreakCalendar from './MonthlyStreakCalendar.jsx'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'

const DashPage = () => {
  const [streakData, setStreakData] = useState({ currentStreak: 0, highestStreak: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
  });
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [userDataError, setUserDataError] = useState(null);
  const { user, isLoaded, isSignedIn } = useUser();
  // Use email from Clerk or context with proper null checks
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  console.log("tgrgr", userEmail);

  // Fetch user profile from backend (PostgreSQL)
  const fetchUserProfile = async () => {
    if (!isSignedIn) return;
    setUserDataLoading(true);
    setUserDataError(null);
    try {
      if (!userEmail) return;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/settings/general`,
        { orgEmail: userEmail }
      );
      const { firstName, lastName, profilePicture } = response.data;
      setUserData({
        firstName: firstName || "",
        lastName: lastName || "",
      });
    } catch (error) {
      setUserDataError(error.message || "Error fetching user data");
      console.error("Error fetching user data:", error);
    } finally {
      setUserDataLoading(false);
    }
  };

  // Function to record login for streak tracking
  const fetchStreakData = async () => {
    if (!userEmail) return; // Don't fetch if no email available
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login/${encodeURIComponent(userEmail)}/streak`);
      if (!response.ok) {
        throw new Error('Failed to fetch streak data');
      }
      const result = await response.json();
      if (result.success) {
        setStreakData(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch streak data');
      }
    } catch (err) {
      console.error('Error fetching streak data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchStreakData();
      fetchUserProfile();
    }
  }, [userEmail]);

  // Show loading state while Clerk is loading user data
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading user data...</div>
      </div>
    );
  }

  // Show error if user is not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500">Please sign in to view your dashboard.</div>
      </div>
    );
  }

  const chartData = [
    { name: "Visa-sponsored jobs", value: 75, color: "#4F46E5" },
    { name: "Non sponsored jobs", value: 25, color: "#E5E7EB" },
  ]
  const companies = [
    { name: "Amazon", logo: "🟠", openings: 23 },
    { name: "Cognizant", logo: "🔵", openings: 20 },
    { name: "Microsoft", logo: "🟩", openings: 20 },
    { name: "Microsoft", logo: "🟩", openings: 20 },
    { name: "Microsoft", logo: "🟩", openings: 20 },
  ]

  return (
    <>
    <div className="min-h-screen bg-gray-100 pb-10">
      <div className='w-[100vw] h-[60vh] mx-auto absolute top-0 -z-[1] left-0 right-0 mt-10 bg-gradient-to-b from-[#aebcf57e] to-white'> </div>

      <NavBarrr />
      <div className="max-w-[87em] mx-auto mt-10 px-2 sm:px-6">
        {/* Header */}
        <div className="mb-8 ">
          <h1 className="text-xl text-start text-gray-700">
            ☀️ <span className="text-blue-600 font-medium">
              {userDataLoading
                ? 'Loading...'
                : userDataError
                  ? 'Hey there'
                  : userData.firstName
                    ? `Hey ${userData.firstName}`
                    : 'Hey'}
            </span>, Let's get you started on your job search journey.
          </h1>
        </div>
        {/* Main Grid */}
        <div className="space-y-6">
          {/* Top Row - Streak Cards and Weekly Goal Tracker */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Streak Cards */}
              <div className="flex flex-col md:flex-row justify-between gap-4 bg-white rounded-2xl p-4 md:p-8 shadow-sm">
                {/* First Streak Card */}
                <div className="flex items-center gap-4 justify-start md:justify-center ">
                  <img className='h-[40px] w-[40px] lg:h-[71px] lg:w-[71px]' src="/images/noto_fire.svg" alt="streak" />
                  <div className='flex flex-col'>
                    <p className="text-[20px] lg:text-[28px] font-semibold text-start text-gray-900">
                      {loading ? '...' : error ? '0' : streakData.currentStreak} Day Streak
                    </p>
                    <p className="text[#545251] text-sm lg:text-lg">Keep your streak by applying to at least one job daily</p>
                  </div>
                </div>

                {/* Second Streak Card */}
                <div className="flex items-center gap-4 justify-end md:justify-center ">
                  <img className='h-[32px] w-[32px]' src="/images/noto_fire.svg" alt="streak" />
                  <div className='flex flex-col'>
                    <p className="text-lg font-semibold text-[28px] text-gray-900">
                      {loading ? '...' : error ? '0' : streakData.highestStreak} Day Streak
                    </p>
                    <p className="text[#545251] text-sm lg:text-lg">Highest Streak</p>
                  </div>
                </div>
              </div>

              {/* Weekly Goal Tracker */}
              <div className="bg-white rounded-2xl bg-gradient-to-r from-[#aebcf57e] to-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <p className="text-[20px] lg:text-[28px] font-semibold text-[#000]">Weekly Goal Tracker</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-500">Jan 30 - Feb 06</span>
                    <button className="bg-[#313DEB] text-white px-4 md:px-7 py-2 md:py-3 rounded-xl text-md md:text-xl font-medium hover:bg-blue-700 transition-colors">
                      Set Goal
                    </button>
                  </div>
                </div>
                {/* Goal Chart Placeholder */}
                <div className="rounded-lg flex flex-col gap-1 items-center justify-center">
                  <img className='w-[80px] h-[64px] md:w-[120px] md:h-[94px]' src="/images/calender.svg" alt="goal" />
                  <p className="text-[#545251] text-sm md:text-xl text-center">
                    Stay motivated by setting how many jobs you aim to apply for this week.
                  </p>
                </div>
              </div>
            </div>
            {/* Right Column - Monthly Streak Calendar */}
            <div className="lg:col-span-1 h-[100%] bg-white rounded-2xl shadow-sm">
              <MonthlyStreakCalendar />
            </div>
          </div>
          {/* Full Width Sections */}
          {/* Profile Completion */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
              <div className="flex gap-2 items-center ">
                <div className="relative  ">
                  <ResponsiveContainer  width={70} height={70}>
                    <PieChart>
                      <Pie
                        data={[
                          { value: 70, color: "#4F46E5" },
                          { value: 30, color: "#F3F4F6" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={22}
                        outerRadius={32}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                        strokeLinecap="round"
                        stroke="#ffffff"
                        strokeWidth={2}
                        cornerRadius={20}
                      >
                        <Cell fill="#4F46E5" />
                        <Cell fill="#F3F4F6" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-xs">70%</span>
                  </div>
                </div>
                <div>
                  <p className="text-base md:text-[25px] font-semibold text-[#000] mb-1">
                    Complete your profile to unlock job recommendations!
                  </p>
                  <p className="text-gray-600 text-xs md:text-lg ">
                    Get matched with the right jobs based on your skills and preferences.
                  </p>
                </div>
              </div>
              <button className="bg-[#313DEB] text-base md:text-xl text-white px-4 md:px-8 py-2 md:py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors whitespace-nowrap w-full md:w-auto">
                Complete your profile
              </button>
            </div>
          </div>
          {/* FutureHire Radar */}
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-4 gap-2 md:gap-0">
              <div>
                <h className="text-base md:text-[25px] font-semibold mb-1">FutureHire Radar</h>
                <p className="text-gray-600 text-xs md:text-lg ">
                  Get a weekly list of the top 10 companies likely to hire next week based on trends and your
                  preferences
                </p>
              </div>
              <span className="text-xs md:text-sm text-gray-500">Jan 30 - Feb 06 </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 md:mb-4 text-base md:text-lg">Top 10 Companies</h4>
            {/* Companies Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 font-semibold text-gray-500">Company</th>
                      <th className="px-4 py-3 font-semibold text-gray-500">No. openings (same week last year)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.slice(0, 5).map((company, idx) => (
                      <tr key={idx} className="border-b last:border-b-0">
                        <td className="px-4 py-3 flex items-center gap-2">
                          <span className="text-lg">{company.logo}</span>
                          <span className="text-gray-900">{company.name}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 font-medium">{company.openings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 font-semibold text-gray-500">Company</th>
                      <th className="px-4 py-3 font-semibold text-gray-500">No. openings (same week last year)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.slice(0, 5).map((company, idx) => (
                      <tr key={idx} className="border-b last:border-b-0">
                        <td className="px-4 py-3 flex items-center gap-4">
                          <span className="text-lg">{company.logo}</span>
                          <span className="text-gray-900">{company.name}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 font-medium">{company.openings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 md:mt-6 ">
              <p className="text-[#313DEB] text-sm md:text-lg">
                ❄️ Reach out to a recruiter or alum now for a referral before roles go live.
              </p>
            </div>
          </div>
          {/* Bottom Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Upgrade to Pro */}
            <div className="bg-gradient-to-r to-[#aebcf57e] from-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-2 md:gap-3 py-1 md:py-2 ">
                <img className='w-[24px] h-[24px] md:w-[32px] md:h-[32px]' src="https://cdn.builder.io/api/v1/image/assets/TEMP/57dd4e5f28379f36428cf0499a5ca6b8bee68bc296209058e54f1a4655eb0ef9?placeholderIfAbsent=true&apiKey=yo4c72fe2aa3d4438aa36ed14fc35c5c74" alt="visa" />
                <p className="text-lg md:text-[28px] font-semibold">Upgrade to Pro</p>
              </div>
              <p className="text-gray-600 text-base md:text-[20px]  mb-4 md:mb-6 mx-0 md:mx-1">2X Your Job Search with VisaFriendly Pro</p>
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-lg">🎯</span>
                  <span className="text-black text-base md:text-xl font-medium">Unlimited H-1B Jobs</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-lg">📋</span>
                  <span className="text-black text-base md:text-xl font-medium">Application Tracker with multiple resume support</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-lg">🎯</span>
                  <span className="text-black text-base md:text-xl font-medium">Unlimited Cap-Exempt Jobs</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-lg">📊</span>
                  <span className="text-black text-base md:text-xl font-medium">Analytics Dashboard</span>
                </div>
              </div>
              <div className="mt-auto">
                <button className="w-full md:w-[314px] bg-[#313DEB] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  See Plans
                </button>
              </div>
            </div>
            {/* Refer a Friend */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-full">
              <p className="text-lg md:text-[28px] font-semibold py-1 md:py-2">Refer a Friend </p>
              <p className="text-gray-600 text-base md:text-[20px]  mb-4 md:mb-8 ">Earn reward points when you refer</p>
              <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-lg">🔗</span>
                  <span className="text-black text-base md:text-xl font-medium">Share the referal link</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-lg">💎</span>
                  <span className="text-black text-base md:text-xl font-medium">Earn rewards points</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-lg">⭐</span>
                  <span className="text-black text-base md:text-xl font-medium">Redeem for benefits</span>
                </div>
              </div>
              <div className="mt-auto">
                <button className="w-full md:w-[314px] bg-[#313DEB] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Refer Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
      <Footer />
    </>
  )
}

export default DashPage
