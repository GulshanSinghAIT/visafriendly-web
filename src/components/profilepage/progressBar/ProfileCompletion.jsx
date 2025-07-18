import React from "react";
import { Avatar } from "./Avatar";
import { PieChart, Pie, ResponsiveContainer, Text } from "recharts"


export const ProfileCompletion = () => {
  // Create proper data structure for the pie chart
  const completedValue = 70;
  const progressData = [
    { name: "completed", value: completedValue, fill: "#4F46E5" },
    { name: "remaining", value: 100 - completedValue, fill: "#E5E7EB" }
  ];


  return (
    <div className="flex  p-4 md:p-7 bg-[#FFFFFF] rounded-xl gap-[1em] justify-between items-center ">
      <div className="flex gap-3 items-center">
        <Avatar imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/28a370643cf4e24ccc5c51b315863183f18668bc4c7917c2cdb977422d84c39b?placeholderIfAbsent=true&apiKey=${REACT_APP_API_NEW_KEY}" />
        <div className="flex flex-col gap-[0.3em] sm:gap-[0.5em] items-start">
          <h1 className="text-[1.2em] sm:text-[1.8em] text-start font-semibold">Complete your Profile</h1>
          <p className="text-[0.8em] sm:text-[1em] text-gray-500">
            Fill your resume, portfolio, or professional bio to finish your
            profile
          </p>
        </div>
      </div>

      <div className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={progressData}
              cx="50%"
              cy="50%"
              fill="#fff"
              innerRadius={24}
              outerRadius={32}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="#ffffff00"
              strokeWidth={4}
              cornerRadius={20}
            >
            </Pie>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#4F46E5"
            >
              {progressData[0].value}%
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
