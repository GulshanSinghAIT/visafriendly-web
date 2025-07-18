import React, { useMemo } from "react";
import styles from "./JobsAfterSignIn.module.css";
import { useEffect } from "react";
import { JobCardExpansion } from "./jobCardExpansion/JobCardExpansion";
import { FiltersMainJob } from "./filtersMainJob/FiltersMainJob";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import useDefaultResumeStore from "../../store/defaultResumeStore";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { NavBarrr } from "../Navbar/NavBar";
import { MapPin } from 'lucide-react';
import { calculateSkillMatchPercentage } from "../../utils/skillMatchingUtils";

// Memoized job card component for better performance
const JobCard = React.memo(({ 
    stat, 
    index, 
    clickedIndex, 
    handleClickedIndex, 
    defaultSkills, 
    calculateDaysAgo 
}) => {
    const skillMatchPercentage = useMemo(() => {
        if (!stat.skills || !defaultSkills.length) return 0;
        return calculateSkillMatchPercentage(stat.skills, defaultSkills);
    }, [stat.skills, defaultSkills]);

    return (
        <div 
            className={index === clickedIndex ? styles.jobDataCardBorder : styles.jobDataCard} 
            onClick={() => handleClickedIndex(index)}
        >
            <div className={styles.jobDataCardInner}>
                <div className={styles.jobDataCardHeader}>
                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <div className={styles.jobListingImage}></div>
                        <div className={styles.jobListingDetails}>
                            <div className="text-lg font-semibold line-clamp-2">{stat.title}</div>
                            <div className="text-sm font-light">{stat.company}</div>
                        </div>
                    </div>
                    {stat.skills && (
                        <div className={styles.jobListingSkills}>
                            <div className={styles.skillMatch}>
                                <div className={styles.matchChart}>
                                    <ResponsiveContainer width={55} height={70}>
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { value: skillMatchPercentage, color: skillMatchPercentage >= 70 ? '#313DEB' : skillMatchPercentage >= 40 ? '#313DEB' : '#313DEB' },
                                                    { value: 100 - skillMatchPercentage, color: '#E5E7EB' }
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={20}
                                                outerRadius={27}
                                                startAngle={90}
                                                endAngle={450}
                                                dataKey="value"
                                                stroke="#ffffff"
                                                strokeWidth={2}
                                                cornerRadius={20}
                                            >
                                                {[
                                                    { value: skillMatchPercentage, color: skillMatchPercentage >= 70 ? '#313DEB' : skillMatchPercentage >= 40 ? '#313DEB' : '#313DEB' },
                                                    { value: 100 - skillMatchPercentage, color: '#E5E7EB' }
                                                ].map((entry, entryIndex) => (
                                                    <Cell key={`cell-${entryIndex}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div 
                                        className={styles.matchPercentage} 
                                        style={{
                                            color: skillMatchPercentage >= 70 ? '#313DEB' :
                                                skillMatchPercentage >= 40 ? '#313DEB' : '#313DEB'
                                        }}
                                    >
                                        {skillMatchPercentage}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <hr className={styles.horizontalLine} />
                <div className="grid grid-cols-2 justify-between gap-4">
                    <div className="flex gap-2 items-center">
                        <MapPin size={24} color="#545251" />
                        <p className="text-[#545251] truncate w-[95%]">{stat.location}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MapPin size={20} color="#545251" />
                        <p className="text-[#545251]">{stat.workSetting}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MapPin size={20} color="#545251" />
                        <p className="text-[#545251]">{stat.exp > 0 ? stat.exp : 0}+ years exp</p>
                    </div>
                    {stat.salary ? (
                        <div className="flex gap-2 text-[#545251] items-center">
                            <MapPin size={20} />
                            $ {new Intl.NumberFormat('en-us').format(stat.salary)}
                        </div>
                    ) : null}
                </div>
                <hr className={styles.horizontalLine} />
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">54 applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                            {calculateDaysAgo(stat.date)} days ago
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export function JobsAfterSignIn(props) {
    const jobCats = ["Engineering(Software)", "Data Science & Analytics", "Data Engineering", "AI & ML", "Business Analytics & BI", "UI/UX & Design", "Product Management", "Other IT"];
    const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];
    const workSet = ["Onsite", "Hybrid", "Remote"];
    const h1bTypes = ["Regular H-1B", "Cap-Exempt H1B", "Green Card"];
    const sortDrop = ["Recommended", "Old to New", "New to Old"];
    const dateDrop = ["Last 6 Hr", "Last 24 Hr", "Last 3 Days", "Last 7 Days", "Last 14 Days", "Last 30 Days"];
    // new code in free plan also.
    const { user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    const [saved, setSaved] = React.useState([]);
    const { defaultSkills, setDefaultSkills } = useDefaultResumeStore();
    // console.log("Default Resume Skills in JobsAfterSignIn:", defaultSkills);

    // Fetch default resume skills
    useEffect(() => {
        const fetchDefaultResumeSkills = async () => {
            try {
                if (!email) {
                    console.log("No email available for fetching skills");
                    return;
                }

                console.log("Fetching resume skills for email:", email);
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/profile/resume/${email}`
                );
                if (response.data.success) {
                    console.log("Resume API response:", response.data);
                    const defaultResume = response.data.resumes.find(resume => resume.isDefault);
                    console.log("Found default resume:", defaultResume);
                    if (defaultResume) {
                        // console.log("Setting default skills:", defaultResume.skills);
                        console.log("Skills type:", typeof defaultResume.skills);
                        console.log("Skills length:", defaultResume.skills ? defaultResume.skills.length : 0);
                        setDefaultSkills(defaultResume.skills || []);
                    } else {
                        console.log("No default resume found");
                        setDefaultSkills([]);
                    }
                } else {
                    console.log("Resume API failed:", response.data);
                }
            } catch (error) {
                console.error("Error fetching default resume skills:", error);
                setDefaultSkills([]);
            }
        };

        fetchDefaultResumeSkills();
    }, [email, setDefaultSkills]);

    useEffect(() => {
        const fetchUserSkills = async () => {
            try {
                if (!email) return;
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/profile/general/${email}`
                );
                if (response.data.success) {
                    const formattedSkills = response.data.data.skills.map((skill, index) => ({
                        id: index + 1,
                        name: skill.name,
                        years: skill.experienceInYears
                    }));
                    // setSkills(formattedSkills);
                }
            } catch (error) {
                console.error("Error fetching user skills:", error);
            }
        };

        fetchUserSkills();
    }, [email]);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                if (!email) return;
                console.log(email);
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/jobs/savedJobs`, {
                    params: { email },
                }
                );

                if (response.data.success) {
                    let savedJobs = [];
                    response.data.savedJobs.map((stat, _) => savedJobs.push(stat.savedJobId))
                    setSaved(savedJobs);
                }
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchSaved();
    }, [email]);
    console.log(saved);

    async function handleSaved(jobId) {
        if (saved.includes(jobId)) {
            try {
                if (!email) return;
                console.log(email);
                const response = await axios.delete(
                    `${process.env.REACT_APP_API_URL}/jobs/savedJobs/${jobId}`, {
                    params: { email },
                }
                );
                if (response.data.success) {
                    setSaved(saved => {
                        return saved.filter(jId => jId !== jobId)
                    });
                }
            } catch (error) {
                console.error("Error inserting saved jobs:", error);
            }

        }
        else {
            try {
                if (!email) return;
                console.log(email);
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/jobs/savedJobs/${jobId}`, { email }
                );
                if (response.data.success) {
                    setSaved(saved => [...saved, jobId]);
                }
            } catch (error) {
                console.error("Error inserting saved jobs:", error);
            }
        }
    }

    function calculateNoOfSkills(skills) {
        const skillsArray = skills.split(',');
        return skillsArray.length;
    }


    const [jobCatsBool, setJobCats] = React.useState([false, false, false, false, false, false, false, false]);
    const [jobTypeBool, setJobType] = React.useState([false, false, false, false]);
    const [workSetBool, setWorkSet] = React.useState([false, false, false]);
    const [h1bTypeBool, setH1bType] = React.useState([false, false, false]);
    const [sortDropDown, setSortDropDown] = React.useState(false);
    const [dateDropDown, setDateDropDown] = React.useState(false);
    const [jobDataFilter, setJobsFilter] = React.useState(props.jobData);


    function sortDropHandler() {
        setSortDropDown(!sortDropDown)
        setDateDropDown(false)
    }
    function dateDropHandler() {
        setDateDropDown(!dateDropDown)
        setSortDropDown(false)
    }
    const prevSymbol = "<";
    const nextSymbol = ">";
    let lastPage = Math.floor((jobDataFilter.length) / 6);
    const remainderLastPage = (jobDataFilter.length) % 6;
    if (remainderLastPage !== 0) {
        lastPage = lastPage + 1;
    }
    const [currentPage, setCurrent] = React.useState(1);
    const [clickedPage, setClicked] = React.useState(1);
    const [clickedIndex, setClickedIndex] = React.useState(0);
    useEffect(() => {
        setClickedIndex(0);
        setClicked(1);
        setCurrent(1);
        setJobsFilter(props.jobData);
    }, [props.jobData])

    useEffect(() => {
        setClickedIndex(0);
        setClicked(1);
        setCurrent(1);
        console.log(jobDataFilter)
    }, [jobDataFilter])


    const clickedJobData = jobDataFilter[clickedIndex];

    const [showExpansion, setShowExpansion] = React.useState(false);

    function handleClickedIndex(index) {
        setClickedIndex(index);
        setShowExpansion(true);
    }

    function handleBackToList() {
        setShowExpansion(false);
    }

    function handleNextPagination() {
        if (currentPage + 5 <= lastPage) {
            setCurrent(currentPage + 1);
        }
    }
    function handlePrevPagination() {
        if (currentPage - 1 >= 1) {
            setCurrent(currentPage - 1);
        }
    }

    function handleClicked(page) {
        setClicked(page);
    }

    // Function to calculate skill match percentage
    // Function to calculate days ago from ISO date string
    const calculateDaysAgo = (dateString) => {
        if (!dateString) return 0;
        
        const jobDate = new Date(dateString);
        const currentDate = new Date();
        
        // Calculate the difference in milliseconds
        const timeDifference = currentDate.getTime() - jobDate.getTime();
        
        // Convert to days
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        
        return daysDifference;
    };

    // Simplified skill match calculation using utility
    const calculateSkillMatch = (jobSkills) => {
        return calculateSkillMatchPercentage(jobSkills, defaultSkills);
    };

    const currentPageJobs = jobDataFilter
        .filter((c, i) => (i >= (clickedPage - 1) * 6 && i < (clickedPage) * 6))

    const forPageIndices = [];
    for (let i = 0; i < lastPage; i++) {
        forPageIndices.push(i);
    }

    return (
        <div className={styles.JobsAfterSignIn}>
            <NavBarrr />

            <div className={styles.jobListingHead}>
                <FiltersMainJob
                    jobData={props.jobData} setJobsFilter={setJobsFilter}
                    jobCats={jobCats} jobTypes={jobTypes} workSet={workSet} h1bTypes={h1bTypes}
                    jobCatsBool={jobCatsBool} setJobCats={setJobCats}
                    jobTypeBool={jobTypeBool} setJobType={setJobType}
                    workSetBool={workSetBool} setWorkSet={setWorkSet}
                    h1bTypeBool={h1bTypeBool} setH1bType={setH1bType}
                ></FiltersMainJob>
            </div>
            <div className={styles.allListings}>
                <div className={styles.jobListSortFilters}>
                    <div className=" text-lg md:text-xl text-[#313DEB] font-semibold">{jobDataFilter.length} Jobs found</div>
                    <div className={styles.totalJobsFilters}>
                        <a href="/resume">
                            <button className=" text-sm md:text-base md:px-5 md:py-3 px-3 py-2 rounded-lg bg-[#313DEB] text-white ">Change Resume</button>
                        </a>
                        <div className={styles.filterCover}>
                            <div className={styles.sortFilterByDate} onClick={sortDropHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                                    <path d="M4.5 24.3359L10.5 30.3359M10.5 30.3359L16.5 24.3359M10.5 30.3359V6.33594M16.5 6.33594H31.5M16.5 12.3359H27M16.5 18.3359H22.5" stroke="#545251" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            {sortDropDown &&
                                (<div className={styles.multiSelectSetDrop}>
                                    <div className={styles.dropDownCatName}>SORT BY</div>
                                    {
                                        sortDrop.map((c, i) => (
                                            <div className={styles.dropDownCatNames}>
                                                <div>{c}</div>
                                            </div>
                                        ))
                                    }
                                </div>)
                            }
                        </div>
                        <div className={styles.filterCover}>
                            <div className={styles.sortFilterByDate} onClick={dateDropHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                                    <g clip-path="url(#clip0_2320_18269)">
                                        <path d="M31.5 17.791C32.2031 18.2715 32.8301 18.8164 33.3809 19.4258C33.9316 20.0352 34.4062 20.7031 34.8047 21.4297C35.2031 22.1562 35.4961 22.9238 35.6836 23.7324C35.8711 24.541 35.9766 25.3672 36 26.2109C36 27.6055 35.7363 28.918 35.209 30.1484C34.6816 31.3789 33.9551 32.4512 33.0293 33.3652C32.1035 34.2793 31.0312 35 29.8125 35.5273C28.5938 36.0547 27.2812 36.3242 25.875 36.3359C24.8086 36.3359 23.7773 36.1777 22.7812 35.8613C21.7852 35.5449 20.8711 35.0879 20.0391 34.4902C19.207 33.8926 18.4688 33.1777 17.8242 32.3457C17.1797 31.5137 16.6816 30.5938 16.3301 29.5859H2.25V2.58594H6.75V0.335938H9V2.58594H24.75V0.335938H27V2.58594H31.5V17.791ZM4.5 4.83594V9.33594H29.25V4.83594H27V7.08594H24.75V4.83594H9V7.08594H6.75V4.83594H4.5ZM15.8027 27.3359C15.7676 26.9727 15.75 26.5977 15.75 26.2109C15.75 25.2031 15.8906 24.2246 16.1719 23.2754C16.4531 22.3262 16.8809 21.4297 17.4551 20.5859H15.75V18.3359H18V19.8477C18.4805 19.25 19.0137 18.7227 19.5996 18.2656C20.1855 17.8086 20.8184 17.416 21.498 17.0879C22.1777 16.7598 22.8867 16.5137 23.625 16.3496C24.3633 16.1855 25.1133 16.0977 25.875 16.0859C27.0469 16.0859 28.1719 16.2793 29.25 16.666V11.5859H4.5V27.3359H15.8027ZM25.875 34.0859C26.9648 34.0859 27.9844 33.8809 28.9336 33.4707C29.8828 33.0605 30.7148 32.498 31.4297 31.7832C32.1445 31.0684 32.707 30.2363 33.1172 29.2871C33.5273 28.3379 33.7383 27.3125 33.75 26.2109C33.75 25.1211 33.5449 24.1016 33.1348 23.1523C32.7246 22.2031 32.1621 21.3711 31.4473 20.6562C30.7324 19.9414 29.9004 19.3789 28.9512 18.9688C28.002 18.5586 26.9766 18.3477 25.875 18.3359C24.7852 18.3359 23.7656 18.541 22.8164 18.9512C21.8672 19.3613 21.0352 19.9238 20.3203 20.6387C19.6055 21.3535 19.043 22.1855 18.6328 23.1348C18.2227 24.084 18.0117 25.1094 18 26.2109C18 27.3008 18.2051 28.3203 18.6152 29.2695C19.0254 30.2188 19.5879 31.0508 20.3027 31.7656C21.0176 32.4805 21.8496 33.043 22.7988 33.4531C23.748 33.8633 24.7734 34.0742 25.875 34.0859ZM27 25.0859H30.375V27.3359H24.75V20.5859H27V25.0859ZM6.75 18.3359H9V20.5859H6.75V18.3359ZM11.25 18.3359H13.5V20.5859H11.25V18.3359ZM11.25 13.8359H13.5V16.0859H11.25V13.8359ZM6.75 22.8359H9V25.0859H6.75V22.8359ZM11.25 22.8359H13.5V25.0859H11.25V22.8359ZM18 16.0859H15.75V13.8359H18V16.0859ZM22.5 16.0859H20.25V13.8359H22.5V16.0859ZM27 16.0859H24.75V13.8359H27V16.0859Z" fill="#545251" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2320_18269">
                                            <rect width="36" height="36" fill="white" transform="translate(0 0.335938)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            {dateDropDown &&
                                (<div className={styles.multiSelectSetDrop}>
                                    <div className={styles.dropDownCatName}>POSTED ON</div>
                                    {
                                        dateDrop.map((c, i) => (
                                            <div className={styles.dropDownCatNames}>
                                                <div>{c}</div>
                                            </div>
                                        ))
                                    }
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={`${styles.jobListingsData} ${showExpansion ? styles.showExpansion : ''}`}>
                    <div className={styles.allJobDataCards}>
                        <div className={styles.jobDataCards}>
                            {currentPageJobs.map((stat, index) => (
                                <JobCard
                                    key={`${stat.jId}-${index}`}
                                    stat={stat}
                                    index={(clickedPage - 1) * 6 + index}
                                    clickedIndex={clickedIndex}
                                    handleClickedIndex={handleClickedIndex}
                                    defaultSkills={defaultSkills}
                                    calculateDaysAgo={calculateDaysAgo}
                                />
                            ))
                            }
                        </div>

                        {jobDataFilter.length === 0 ? null : null}
                        {lastPage <= 5 && jobDataFilter.length !== 0 ? (
                            <div className={styles.jobCardPagination} role="navigation" aria-label="Job listings pagination">
                                <div className={styles.paginationPages}>
                                    {forPageIndices.map((stat, page) => {
                                        const pageNumber = currentPage + page;
                                        return (
                                            <button
                                                key={pageNumber}
                                                className={pageNumber === clickedPage ? styles.clickedPagination : styles.clickablePagination}
                                                onClick={() => handleClicked(pageNumber)}
                                                aria-label={`Go to page ${pageNumber}`}
                                                aria-current={pageNumber === clickedPage ? "page" : undefined}
                                                disabled={pageNumber > lastPage}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}
                        {lastPage > 5 ? (
                            <div className={styles.jobCardPagination} role="navigation" aria-label="Job listings pagination">
                                <button
                                    className={styles.paginationPrev}
                                    onClick={handlePrevPagination}
                                    disabled={currentPage <= 1}
                                    aria-label="Go to previous page"
                                >
                                    <span className={styles.symbolNext} aria-hidden="true">{prevSymbol}</span>
                                    <span className={styles.symbolText}>Previous</span>
                                </button>
                                <div className={styles.paginationPages}>
                                    <button
                                        className={currentPage === clickedPage ? styles.clickedPagination : styles.clickablePagination}
                                        onClick={() => handleClicked(currentPage)}
                                        aria-label={`Go to page ${currentPage}`}
                                        aria-current={currentPage === clickedPage ? "page" : undefined}
                                    >
                                        {currentPage}
                                    </button>
                                    <button
                                        className={currentPage + 1 === clickedPage ? styles.clickedPagination : styles.clickablePagination}
                                        onClick={() => handleClicked(currentPage + 1)}
                                        aria-label={`Go to page ${currentPage + 1}`}
                                        aria-current={currentPage + 1 === clickedPage ? "page" : undefined}
                                        disabled={currentPage + 1 > lastPage}
                                    >
                                        {currentPage + 1}
                                    </button>
                                    <button
                                        className={currentPage + 2 === clickedPage ? styles.clickedPagination : styles.clickablePagination}
                                        onClick={() => handleClicked(currentPage + 2)}
                                        aria-label={`Go to page ${currentPage + 2}`}
                                        aria-current={currentPage + 2 === clickedPage ? "page" : undefined}
                                        disabled={currentPage + 2 > lastPage}
                                    >
                                        {currentPage + 2}
                                    </button>
                                    {currentPage === lastPage - 4 ? (
                                        <button
                                            className={currentPage + 3 === clickedPage ? styles.clickedPagination : styles.clickablePagination}
                                            onClick={() => handleClicked(currentPage + 3)}
                                            aria-label={`Go to page ${currentPage + 3}`}
                                            aria-current={currentPage + 3 === clickedPage ? "page" : undefined}
                                        >
                                            {currentPage + 3}
                                        </button>
                                    ) : (
                                        <span className={styles.nonClickablePagination} aria-hidden="true">...</span>
                                    )}
                                    <button
                                        className={clickedPage === lastPage ? styles.clickedPagination : styles.clickablePagination}
                                        onClick={() => handleClicked(lastPage)}
                                        aria-label={`Go to page ${lastPage}`}
                                        aria-current={clickedPage === lastPage ? "page" : undefined}
                                    >
                                        {lastPage}
                                    </button>
                                </div>
                                <button
                                    className={styles.paginationNext}
                                    onClick={handleNextPagination}
                                    disabled={currentPage + 5 > lastPage}
                                    aria-label="Go to next page"
                                >
                                    <span className={styles.symbolText}>Next</span>
                                    <span className={styles.symbolNext} aria-hidden="true">{nextSymbol}</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                    {jobDataFilter.length !== 0 ? (
                        <div className={styles.jobExpansionContainer}>
                            <button className={styles.backButton} onClick={handleBackToList}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Back to List
                            </button>
                            <JobCardExpansion
                                clickedJobData={clickedJobData}
                                fromSaved={false}
                                savedJobs={saved}
                                handleSaved={handleSaved}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
