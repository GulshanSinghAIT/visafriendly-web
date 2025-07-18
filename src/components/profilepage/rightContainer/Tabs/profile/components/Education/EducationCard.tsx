import React, { useState } from "react";
import { GraduationCap, Pencil, Trash2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";


const EducationCard = ({ education, onDelete, onEdit }) => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Add confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this education entry?");
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/onboarding/education/${education.id}`, {
        data: {
          email: email
        }
      })
      console.log("Education deleted successfully")
      // Call the onDelete callback to notify parent component
      if (onDelete) {
        onDelete()
      }
    } catch (error) {
      console.log(error)
      alert("Failed to delete education. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(education)
    }
  }

  return (
    <div className="flex w-[100%] items-start bg-white rounded-xl shadow-sm border border-gray-200 p-2 py-3 sm:py-4 sm:p-4 gap-4 ">
      {/* Icon */}
      <div className="bg-blue-100 rounded-lg flex items-center justify-center w-14 h-14 mt-1">
        <GraduationCap className="text-blue-600 w-8 h-8" />
      </div>
      {/* Details */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg text-gray-900">{education.school}</p>
          <div className="flex gap-2">
            <button 
              onClick={handleEdit}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDelete} 
              disabled={isDeleting}
              className={`text-gray-500 hover:text-red-500 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center text-gray-500 text-sm md:text-base font-semibold mt-1 gap-x-2 gap-y-1">
          <span>{education.major}</span>
          <span className="mx-[1px] text-gray-400">•</span>
          <span>{education.degree}</span>
          <span className="mx-[1px] text-gray-400">•</span>
          <span>{education.gpa} / 4.0</span>
        </div>
        <div className="text-gray-500 text-sm mt-1">
          {education.startMonth} {education.startYear} - {education.endMonth} {education.endYear}
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
