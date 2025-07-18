import React, { useEffect, useState } from 'react'
import EducationCard from './EducationCard.tsx'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { SquarePlus } from 'lucide-react'
import AddEducationForm from './Form/form.jsx'

const EducationSection = () => {
  const { user } = useUser()
  const email = user?.emailAddresses[0]?.emailAddress;
  const [popup, setPopup] = useState(false)
  const [education, setEducation] = useState([])
  const [editData, setEditData] = useState(null)
  
  const getEducation = async () => {
    try {
      if (!email) return;
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/onboarding/education/${email}`)
      console.log("Education data", res.data)
      setEducation(res.data.data || [])
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEducation()
  }, [email])

  // Callback function to handle education deletion
  const handleEducationDelete = () => {
    getEducation() // Refresh the education list after deletion
  }

  // Callback function to handle education editing
  const handleEducationEdit = (educationData) => {
    setEditData(educationData)
    setPopup(true)
  }

  const handleAddEducation = () => {
    setEditData(null) // Clear any edit data
    setPopup(true)
  }

  const handleCloseForm = () => {
    setPopup(false)
    setEditData(null) // Clear edit data when closing
  }

  const handleSaveEducation = () => {
    getEducation() // Refresh the education list after saving
    setPopup(false)
    setEditData(null) // Clear edit data
  }

  return (
    <div className='flex flex-col gap-4'>
      {education.map((edu, index) => (
        <div className='' key={index}>
          <EducationCard 
            education={edu} 
            onDelete={handleEducationDelete}
            onEdit={handleEducationEdit}
          />
        </div>
      ))}

      <button onClick={handleAddEducation} className='text-[#313DEB]  p-2 text-start rounded-md flex items-center gap-2'><SquarePlus size={17}/>Add Education</button>
    
    {popup && (
      <AddEducationForm 
        onClose={handleCloseForm} 
        onSave={handleSaveEducation}
        editData={editData}
      />
    )}
    </div>
  )
}

export default EducationSection
