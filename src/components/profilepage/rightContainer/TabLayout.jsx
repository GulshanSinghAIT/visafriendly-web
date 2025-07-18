import React, { useState } from 'react'
import { Preferences } from './Tabs/preferences/Preferences'
import JobAlertsPage from './Tabs/alert/JobAlertsPage'
import { ResumeUpload } from './Tabs/resume/ResumeUpload'
import { Profile } from './Tabs/profile/Profile'

const TabLayout = () => {
    const [activeTab, setActiveTab] = useState("Profile")
    const Tabs = [{
        name: "Profile",
        icon: "/images/user.png"
    },
    {
        name: "Resume",
        icon: "/images/resume.png"
    },
    {
        name: "Preferences",
        icon: "/images/briefcase.png"
    },
    {
        name: "Alerts",
        icon: "/images/bell-ring.png"
    },
    ]
    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 bg-white rounded-lg border-[1.6px] border-[#D9D9D9] p-1 gap-2 overflow-x-auto'>
                {
                    Tabs.map((tab, index) => (
                        <button
                            onClick={() => setActiveTab(tab.name)}
                            className={`${activeTab === tab.name
                                    ? "bg-[#313DEB] text-white"
                                    : "bg-white text-black"
                                } hover:-translate-y-1 transition-all duration-300 rounded-lg flex flex-row gap-2 items-center border-[1px] md:border-none  border-[#D9D9D9] md:justify-center px-3 py-2 sm:px-4 text-sm sm:text-base whitespace-nowrap min-w-fit`}
                            key={index}
                        >
                            <img
                                src={tab.icon}
                                alt={tab.name}
                                className={`w-4 h-4 ${activeTab === tab.name ? "filter invert brightness-0" : ""}`}
                            />

                            <p>{tab.name}</p>
                        </button>
                    ))
                }
            </div>
            <div className='min-h-[400px]'>
                {
                    activeTab === "Preferences" ? <Preferences /> :
                        activeTab === "Alerts" ? <JobAlertsPage /> :
                            activeTab === "Resume" ? <ResumeUpload /> :
                                activeTab === "Profile" ? <Profile /> : null
                }
            </div>
        </div>
    )
}

export default TabLayout
