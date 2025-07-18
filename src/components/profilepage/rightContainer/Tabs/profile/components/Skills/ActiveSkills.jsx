import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
import styles from './ActiveSkills.module.css';

const ActiveSkills = () => {
    const { user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    const [defaultSkills, setDefaultSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (!email) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/profile/resume/${email}`
                );
                
                if (response.data.success) {
                    const defaultResume = response.data.resumes.find(resume => resume.isDefault);
                    console.log("Found default resume:", defaultResume);
                    
                    if (defaultResume && defaultResume.skills) {
                        setDefaultSkills(defaultResume.skills);
                    } else {
                        setDefaultSkills([]);
                    }
                } else {
                    setError('Failed to fetch resume data');
                }
            } catch (error) {
                console.error("Error fetching resumes:", error);
                setError('Failed to load skills. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, [email]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <span>Loading skills...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <span className={styles.emptyStateIcon}>⚠️</span>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Active Skills <span className='text-gray-500 text-sm font-normal'> (Based on default resume) </span> </h3>
                <span className={styles.skillsCount}>
                    {defaultSkills.length} {defaultSkills.length === 1 ? 'skill' : 'skills'}
                </span>
            </div>
            
            {defaultSkills.length === 0 ? (
                <div className={styles.emptyState}>
                    <span className={styles.emptyStateIcon}>💡</span>
                    <span>No skills found. Add skills to your resume to see them here.</span>
                </div>
            ) : (
                <div className={styles.skillsGrid}>
                    {defaultSkills.map((skill, index) => (
                        <div key={index} className={styles.skillTag}>
                            <span className={styles.skillText}>{skill}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActiveSkills;
