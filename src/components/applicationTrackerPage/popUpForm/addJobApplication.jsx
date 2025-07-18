import React, { useState } from "react";
import "./addJobApplication.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const JobApplicationModal = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    jobType: "",
    salary: "",
    resume: "",
    status: "",
    appliedDate: "",
    followUpDate: "",
    notes: "",
  });

  const closeModal = () => {
    setFormData({
      companyName: "",
      role: "",
      jobType: "",
      salary: "",
      resume: "",
      status: "",
      appliedDate: "",
      followUpDate: "",
      notes: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!email) return;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/dashboard/rows`,
        { email, formData }
      );
      if (response.data.success) {
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submiting the job application to tracker:", error);
    }
  }

  return (
    <div>
      <Popup
        trigger={<button className="custom-button">Add Job Application</button>}
        position="center center"
        modal
      >
        {(closeAddApp) => (
          <div
            className={`modal`}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <p>Add Job Application</p>
                <button onClick={closeAddApp} className="close-button">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <form
                  className="form"
                  onSubmit={(e) => {
                    handleSubmit(e);
                    closeAddApp();
                  }}
                >
                  <div className="form-group row">
                    <div className="half">
                      <label>
                        Company Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Enter Company Name"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="half">
                      <label>
                        Role<span>*</span>
                      </label>
                      <input
                        type="text"
                        name="role"
                        placeholder="Enter Role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="half">
                      <label>
                        Job Type<span>*</span>
                      </label>
                      <select
                        name="jobType"
                        required
                        value={formData.jobType}
                        onChange={handleChange}
                      >
                        <option value="">Select Job Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div className="half">
                      <label>Salary</label>
                      <input
                        type="text"
                        name="salary"
                        placeholder="Enter Salary"
                        value={formData.salary}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="half">
                      <label>
                        Resume<span>*</span>
                      </label>
                      <select
                        name="resume"
                        required
                        value={formData.resume}
                        onChange={handleChange}
                      >
                        <option value="">Select Resume</option>
                        <option value="Resume_v1.pdf">Resume_v1.pdf</option>
                        <option value="Resume_v2.pdf">Resume_v2.pdf</option>
                      </select>
                    </div>
                    <div className="half">
                      <label>
                        Status<span>*</span>
                      </label>
                      <select
                        name="status"
                        required
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="half">
                      <label>
                        Applied Date<span>*</span>
                      </label>
                      <input
                        type="date"
                        name="appliedDate"
                        required
                        value={formData.appliedDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="half">
                      <label>Follow Up Date</label>
                      <input
                        type="date"
                        name="followUpDate"
                        value={formData.followUpDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                      placeholder="Type Notes..."
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="footer">
                    <div className="form-actions">
                      <button
                        type="button"
                        onClick={() => {
                          closeModal();
                          closeAddApp();
                        }}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="submit-button">
                        Add Job Application
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default JobApplicationModal;
