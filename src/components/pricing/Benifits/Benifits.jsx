import React from 'react'
import {Gem} from 'lucide-react'
const Benifits = () => {
  return (
    <div className="flex justify-center items-center w-[98%] md:w-[100%] max-w-[87em] mx-auto   py-8">
      <div className="flex flex-col md:flex-row gap-6 w-full bg-[#313DEB0D] rounded-2xl shadow-md p-4 md:p-8">
        {/* Free Plan */}
        <div className="  w-auto md:w-[40%] rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
          <ul className="space-y-3 text-base text-gray-700">
            <li className="flex items-center gap-2 mb-2"><span className="text-blue-500">✓</span>5 Search Credits</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span>25 H-1B/Cap-Exempt Jobs</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span>25 Internships/Co-ops</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span>Limited Job Matching Analysis</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span>1 Resume Upload - Unlimited Job Tracking</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span>Follow Up Alerts</li>
          </ul>
        </div>

        
        {/* VisaFriendly Plus */}
        <div className=" bg-[#3846f7] w-auto md:w-[60%] rounded-xl p-6 flex flex-col gap-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Gem  size={20}/>
            <span className="text-base">VisaFriendly Plus</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">The all-in-one solution for unlimited access.</h2>
          <ul className="space-y-3 text-base">
            <li className="flex mb-2 items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Unlimited H-1B Jobs</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Application Tracker with multiple resume support</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Unlimited Cap-Exempt Jobs</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Analytics Dashboard</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>LinkedIn Optimization Guide</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Providing ATS Resume and Cover Letter</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Follow-up Alter System</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Email Job Alerts</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Personalized Job Recommendation</li>
            <li className="flex items-center gap-2"><span className=" text-[#313DEB] bg-white min-w-4 min-h-4 text-center justify-center items-center flex text-xs rounded-full">✔</span>Regular Updates on Hiring Trends and Events</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Benifits
