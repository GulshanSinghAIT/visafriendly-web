import React, { useEffect, useState, useMemo } from "react";
import styles from "./JobCardExpansion.module.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useDefaultResumeStore from "../../../store/defaultResumeStore";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineClock, HiOutlineCurrencyDollar } from "react-icons/hi";
import { Check, Ticket } from "lucide-react";
import JobDescription from './cardTabs/JobDescription';
import PermReport from './cardTabs/PermReport';
import H1BReport from "./cardTabs/H1BReport";
import { calculateSkillMatchPercentage, getSkillMatchDetails, getMatchColor } from "../../../utils/skillMatchingUtils";

// Skills highlighting component with memoization
// Skeleton loader component
const SkeletonLoader = () => (
    <div className={styles.skeletonContainer}>
        <div className={styles.skeletonHeader}>
            <div className={styles.skeletonAvatar}></div>
            <div className={styles.skeletonText}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonSubtitle}></div>
            </div>
        </div>
        <div className={styles.skeletonContent}>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine} style={{ width: '70%' }}></div>
        </div>
        <div className={styles.skeletonSkills}>
            {[...Array(6)].map((_, index) => (
                <div key={index} className={styles.skeletonSkill}></div>
            ))}
        </div>
    </div>
);

const SkillsHighlightSection = React.memo(({ jobSkills, userSkills, isLoading }) => {
    const skillMatchDetails = useMemo(() => {
        if (isLoading) return { skillDetails: [] };
        return getSkillMatchDetails(jobSkills, userSkills);
    }, [jobSkills, userSkills, isLoading]);
    
    if (isLoading) {
        return (
            <div className={styles.skillsSection}>
                <div className={styles.skillsTitle}>Required Skills:</div>
                <div className={styles.skillsGrid}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className={styles.skeletonSkill}></div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div className={styles.skillsSection}>
            <div className={styles.skillsTitle}>Required Skills:</div>
            <div className={styles.skillsGrid}>
                {skillMatchDetails.skillDetails.map((skillDetail, index) => (
                    <span
                        key={index}
                        className={`${styles.skillTag} ${
                            skillDetail.isMatching 
                                ? styles.matchingSkillTag 
                                : styles.nonMatchingSkillTag
                        }`}
                    >
                        {skillDetail.displayName}
                        {skillDetail.isMatching && <Check size={12} />}
                    </span>
                ))}
            </div>
        </div>
    );
});

export function JobCardExpansion(props) {
    const navigate = useNavigate();
    const { user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    const { defaultSkills, setDefaultSkills } = useDefaultResumeStore();
    const [activeTab, setActiveTab] = useState("Job Description");
    const [isLoading, setIsLoading] = useState(true);
    const [skillsLoading, setSkillsLoading] = useState(true);
    const tabs = ["Job Description", "H1B Report", "PERM Report"];
    // Fetch default resume skills
    useEffect(() => {
        const fetchDefaultResumeSkills = async () => {
            try {
                setSkillsLoading(true);
                if (!email) {
                    setSkillsLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/profile/resume/${email}`
                );
                if (response.data.success) {
                    const defaultResume = response.data.resumes.find(resume => resume.isDefault);
                    console.log("Found default resume in JobCardExpansion:", defaultResume);
                    if (defaultResume) {
                        console.log("Setting default skills in JobCardExpansion:", defaultResume.skills);
                        setDefaultSkills(defaultResume.skills);
                    } else {
                        console.log("No default resume found in JobCardExpansion");
                    }
                }
            } catch (error) {
                console.error("Error fetching default resume skills in JobCardExpansion:", error);
            } finally {
                setSkillsLoading(false);
            }
        };

        fetchDefaultResumeSkills();
    }, [email, setDefaultSkills]);

    // Handle overall loading state
    useEffect(() => {
        const initializeComponent = async () => {
            setIsLoading(true);
            // Simulate component initialization
            await new Promise(resolve => setTimeout(resolve, 100));
            setIsLoading(false);
        };

        initializeComponent();
    }, [props.clickedJobData]);

    // Memoized skill match calculation for better performance
    const skillMatchPercentage = useMemo(() => {
        if (!props.clickedJobData.skills || !defaultSkills.length) return 0;
        return calculateSkillMatchPercentage(props.clickedJobData.skills, defaultSkills);
    }, [props.clickedJobData.skills, defaultSkills]);

    // Legacy function for backward compatibility
    const calculateSkillMatch = (jobSkills) => {
        return calculateSkillMatchPercentage(jobSkills, defaultSkills);
    };

    function naviJobTarcker() {
        navigate("/jobDashboard");
    }
    const [appliedJobs, setApplied] = React.useState([]);
    const [appliedJobsLoading, setAppliedJobsLoading] = React.useState(true);
    
    useEffect(() => {
        const fetchSaved = async () => {
            try {
                setAppliedJobsLoading(true);
                if (!email) {
                    setAppliedJobsLoading(false);
                    return;
                }
                console.log(email);
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/jobs/appliedJobs`, {
                    params: { email },
                }
                );

                if (response.data.success) {
                    let appliedJobs = [];
                    console.log(response.data.appliedJobs);
                    response.data.appliedJobs.map((job, _) => appliedJobs.push(job.appliedJobId));

                    setApplied(appliedJobs);

                    console.log(appliedJobs);
                }
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
            } finally {
                setAppliedJobsLoading(false);
            }
        };

        fetchSaved();
    }, [email]);

    const text = "Join Visafriendly";
    const url = "https://www.visafriendly.com?ref_code=m0ca9c"
    const message = encodeURIComponent(`${text}\n Link: ${url}`);

    // Social media share handlers
    const handleWhatsAppShare = () => {
        window.open(`https://wa.me/?text=${message}`, "_blank");
    };


    const handleTelegramShare = () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
    };

    const handleFacebookShare = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    };

    const handleTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
    };

    const handleLineShare = () => {
        window.open(`https://line.me/R/msg/text/?${message}`, "_blank");
    };

    const handleEmailShare = () => {
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${message}`, "_blank");
    };


    async function appliedJobsHandler(jobId) {
        console.log('entering applied ahndler');
        try {
            if (!email) return;
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/jobs/appliedJobs/${jobId}`, { email },
            );

            if (response.data.success) {
                setApplied(appliedJobs => [...appliedJobs, jobId]);
                console.log("yoyshh", appliedJobs);
            }
        } catch (error) {
            console.error("Error fetching saved jobs:", error);
        }
    }

    async function addToDashboard(job) {
        let formData = {};
        formData.companyName = job.company;
        formData.status = "Applied";
        formData.role = job.title;
        formData.resume = "";
        formData.salary = job.salary;
        formData.jobType = job.type;
        formData.appliedDate = Date.now();
        formData.followUpDate = "";
        formData.notes = "";

        try {
            if (!email) return;
            console.log(email);
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/dashboard/rows`, { email, formData }
            );
            if (response.data.success) {
            }
        } catch (error) {
            console.error("Error submiting the job application to tracker:", error);
        }
    }

    const recordLogin = async (email) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login/record`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                console.error('Failed to record login for streak tracking');
            }
        } catch (error) {
            console.error('Error recording login:', error);
        }
    };




    console.log(props.clickedJobData);
    
    // Show skeleton loader while loading
    if (isLoading || skillsLoading) {
        return (
            <div className={props.fromSaved ? styles.completeJobDetailsFrom : styles.completeJobDetails}>
                <div className={styles.completeJobDetailsInner}>
                    <SkeletonLoader />
                </div>
            </div>
        );
    }
    
    return (
        <div className={props.fromSaved ? styles.completeJobDetailsFrom : styles.completeJobDetails}>
            <div className={styles.completeJobDetailsInner}>
                <div className={styles.completeJobHeader}>
                    <div className="flex  gap-2  items-center">

                        <img className="w-12 md:w-14 md:h-14 h-12 mr-2 md:rounded-lg" src="./images/companyLogo.png"></img>

                        <div className="flex flex-col">
                            <div className=" text-lg md:text-2xl font-semibold">{props.clickedJobData.title}</div>
                            <div className=" text-sm md:text-lg font-light">{props.clickedJobData.company}</div>
                        </div>
                    </div>
                    <div className={styles.headerJobLogos}>

                        <div className={styles.jobLogosInner}>


                            <Popup trigger={<div className={styles.jobLogosInnerInner}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path d="M22.5 10C24.5711 10 26.25 8.32107 26.25 6.25C26.25 4.17893 24.5711 2.5 22.5 2.5C20.4289 2.5 18.75 4.17893 18.75 6.25C18.75 8.32107 20.4289 10 22.5 10Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.5 18.75C9.57107 18.75 11.25 17.0711 11.25 15C11.25 12.9289 9.57107 11.25 7.5 11.25C5.42893 11.25 3.75 12.9289 3.75 15C3.75 17.0711 5.42893 18.75 7.5 18.75Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M22.5 27.5C24.5711 27.5 26.25 25.8211 26.25 23.75C26.25 21.6789 24.5711 20 22.5 20C20.4289 20 18.75 21.6789 18.75 23.75C18.75 25.8211 20.4289 27.5 22.5 27.5Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.7373 16.8867L19.2748 21.8617" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19.2623 8.13672L10.7373 13.1117" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>} position="center center" nested modal>
                                {closeJobsApply => (
                                    <div className={styles.sharePopUp}>
                                        <div className={styles.shareText}>
                                            <div className={styles.textShare}>Share</div>
                                            <div className={styles.crossSvg} onClick={closeJobsApply}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M12 4L4 12" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M4 4L12 12" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={styles.shareBody}>
                                            <div className={styles.shareTypes}>
                                                <div className="shareLinkMain">
                                                    <input value="https://Visafriendly?ref_code=m0ca9c"></input>
                                                    <div className="verticalDivider"></div>
                                                    <div className="refCopy" onClick={() => { navigator.clipboard.writeText("https://Visafriendly?ref_code=m0ca9c") }}>
                                                        <img src="./images/copy.png"></img>
                                                        <div>Copy</div>
                                                    </div>
                                                </div>
                                                <div className={styles.acrossIcons}>
                                                    <div className={styles.acrossIcon} onClick={handleFacebookShare}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                            <g clip-path="url(#clip0_3297_25835)">
                                                                <path d="M28.1665 55.5039C43.3543 55.5039 55.6665 43.1917 55.6665 28.0039C55.6665 12.8161 43.3543 0.503906 28.1665 0.503906C12.9787 0.503906 0.666504 12.8161 0.666504 28.0039C0.666504 43.1917 12.9787 55.5039 28.1665 55.5039Z" fill="#1977F3" />
                                                                <path d="M38.871 35.9559L40.0892 28.0048H32.463V22.8459C32.463 20.6725 33.5265 18.5494 36.9452 18.5494H40.4141V11.7817C40.4141 11.7817 37.2661 11.2441 34.2574 11.2441C27.977 11.2441 23.87 15.0495 23.87 21.9448V28.0048H16.8857V35.9559H23.87V55.1722C25.2699 55.3926 26.7047 55.5048 28.1665 55.5048C29.6283 55.5048 31.0631 55.3888 32.463 55.1722V35.9559H38.871Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_3297_25835">
                                                                    <rect width="55" height="55" fill="white" transform="translate(0.666504 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className={styles.acrossIcon} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="56" viewBox="0 0 55 56" fill="none">
                                                            <g clip-path="url(#clip0_3297_25837)">
                                                                <path d="M27.5138 0.916016C16.2046 0.916016 12.8971 0.927682 12.2542 0.981016C9.93336 1.17393 8.48919 1.53935 6.91586 2.32268C5.70336 2.92477 4.74711 3.62268 3.80336 4.60102C2.08461 6.38518 1.04294 8.58018 0.665856 11.1893C0.482522 12.456 0.429189 12.7143 0.418356 19.1843C0.414189 21.341 0.418356 24.1793 0.418356 27.9864C0.418356 39.2864 0.430856 42.5906 0.485022 43.2323C0.672522 45.4906 1.02669 46.9114 1.77669 48.4656C3.21002 51.4406 5.94752 53.6739 9.17252 54.5073C10.2892 54.7948 11.5225 54.9531 13.1059 55.0281C13.7767 55.0573 20.6142 55.0781 27.4559 55.0781C34.2975 55.0781 41.1392 55.0698 41.7934 55.0364C43.6267 54.9502 44.6913 54.8073 45.8684 54.5031C49.1142 53.6656 51.8017 51.4656 53.2642 48.4489C53.9996 46.9323 54.3725 45.4573 54.5413 43.3168C54.5779 42.8502 54.5934 35.4098 54.5934 27.9793C54.5934 20.5477 54.5767 13.121 54.54 12.6543C54.3692 10.4793 53.9963 9.01685 53.2371 7.47102C52.6142 6.2056 51.9225 5.2606 50.9184 4.29435C49.1263 2.58268 46.9346 1.54102 44.3229 1.16435C43.0575 0.981432 42.8054 0.927266 36.3304 0.916016H27.5138Z" fill="url(#paint0_radial_3297_25837)" />
                                                                <path d="M27.5138 0.916016C16.2046 0.916016 12.8971 0.927682 12.2542 0.981016C9.93336 1.17393 8.48919 1.53935 6.91586 2.32268C5.70336 2.92477 4.74711 3.62268 3.80336 4.60102C2.08461 6.38518 1.04294 8.58018 0.665856 11.1893C0.482522 12.456 0.429189 12.7143 0.418356 19.1843C0.414189 21.341 0.418356 24.1793 0.418356 27.9864C0.418356 39.2864 0.430856 42.5906 0.485022 43.2323C0.672522 45.4906 1.02669 46.9114 1.77669 48.4656C3.21002 51.4406 5.94752 53.6739 9.17252 54.5073C10.2892 54.7948 11.5225 54.9531 13.1059 55.0281C13.7767 55.0573 20.6142 55.0781 27.4559 55.0781C34.2975 55.0781 41.1392 55.0698 41.7934 55.0364C43.6267 54.9502 44.6913 54.8073 45.8684 54.5031C49.1142 53.6656 51.8017 51.4656 53.2642 48.4489C53.9996 46.9323 54.3725 45.4573 54.5413 43.3168C54.5779 42.8502 54.5934 35.4098 54.5934 27.9793C54.5934 20.5477 54.5767 13.121 54.54 12.6543C54.3692 10.4793 53.9963 9.01685 53.2371 7.47102C52.6142 6.2056 51.9225 5.2606 50.9184 4.29435C49.1263 2.58268 46.9346 1.54102 44.3229 1.16435C43.0575 0.981432 42.8054 0.927266 36.3304 0.916016H27.5138Z" fill="url(#paint1_radial_3297_25837)" />
                                                                <path d="M27.5012 8C22.0695 8 21.3878 8.02375 19.2545 8.12083C17.1253 8.21833 15.672 8.55542 14.4003 9.05C13.0849 9.56083 11.9691 10.2442 10.8574 11.3563C9.74493 12.4679 9.06159 13.5837 8.54909 14.8987C8.05326 16.1708 7.71576 17.6246 7.61993 19.7529C7.52451 21.8862 7.49951 22.5683 7.49951 28C7.49951 33.4317 7.52368 34.1112 7.62035 36.2446C7.71826 38.3738 8.05535 39.8271 8.54951 41.0987C9.06076 42.4142 9.7441 43.53 10.8562 44.6417C11.9674 45.7542 13.0833 46.4392 14.3978 46.95C15.6703 47.4446 17.1241 47.7817 19.2528 47.8792C21.3862 47.9762 22.0674 48 27.4987 48C32.9308 48 33.6103 47.9762 35.7437 47.8792C37.8728 47.7817 39.3278 47.4446 40.6003 46.95C41.9153 46.4392 43.0295 45.7542 44.1408 44.6417C45.2533 43.53 45.9366 42.4142 46.4491 41.0992C46.9408 39.8271 47.2783 38.3733 47.3783 36.245C47.4741 34.1117 47.4991 33.4317 47.4991 28C47.4991 22.5683 47.4741 21.8867 47.3783 19.7533C47.2783 17.6242 46.9408 16.1708 46.4491 14.8992C45.9366 13.5837 45.2533 12.4679 44.1408 11.3563C43.0283 10.2438 41.9158 9.56042 40.5991 9.05C39.3241 8.55542 37.8699 8.21833 35.7408 8.12083C33.6074 8.02375 32.9283 8 27.4949 8H27.5012ZM25.707 11.6042C26.2395 11.6033 26.8337 11.6042 27.5012 11.6042C32.8412 11.6042 33.4741 11.6233 35.5828 11.7192C37.5328 11.8083 38.5912 12.1342 39.2962 12.4079C40.2295 12.7704 40.8949 13.2037 41.5945 13.9037C42.2945 14.6037 42.7278 15.2704 43.0912 16.2037C43.3649 16.9079 43.6912 17.9662 43.7799 19.9162C43.8758 22.0246 43.8966 22.6579 43.8966 27.9954C43.8966 33.3329 43.8758 33.9662 43.7799 36.0746C43.6908 38.0246 43.3649 39.0829 43.0912 39.7871C42.7287 40.7204 42.2945 41.385 41.5945 42.0846C40.8945 42.7846 40.2299 43.2179 39.2962 43.5804C38.592 43.8554 37.5328 44.1804 35.5828 44.2696C33.4745 44.3654 32.8412 44.3862 27.5012 44.3862C22.1608 44.3862 21.5278 44.3654 19.4195 44.2696C17.4695 44.1796 16.4112 43.8537 15.7058 43.58C14.7724 43.2175 14.1058 42.7842 13.4058 42.0842C12.7058 41.3842 12.2724 40.7192 11.9091 39.7854C11.6353 39.0813 11.3091 38.0229 11.2203 36.0729C11.1245 33.9646 11.1053 33.3312 11.1053 27.9904C11.1053 22.6496 11.1245 22.0196 11.2203 19.9113C11.3095 17.9613 11.6353 16.9029 11.9091 16.1979C12.2716 15.2646 12.7058 14.5979 13.4058 13.8979C14.1058 13.1979 14.7724 12.7646 15.7058 12.4012C16.4108 12.1262 17.4695 11.8013 19.4195 11.7117C21.2645 11.6283 21.9795 11.6033 25.707 11.5992V11.6042ZM38.177 14.925C36.852 14.925 35.777 15.9987 35.777 17.3242C35.777 18.6492 36.852 19.7242 38.177 19.7242C39.502 19.7242 40.577 18.6492 40.577 17.3242C40.577 15.9992 39.502 14.9242 38.177 14.9242V14.925ZM27.5012 17.7292C21.8291 17.7292 17.2303 22.3279 17.2303 28C17.2303 33.6721 21.8291 38.2687 27.5012 38.2687C33.1733 38.2687 37.7703 33.6721 37.7703 28C37.7703 22.3279 33.1728 17.7292 27.5008 17.7292H27.5012ZM27.5012 21.3333C31.1828 21.3333 34.1678 24.3179 34.1678 28C34.1678 31.6817 31.1828 34.6667 27.5012 34.6667C23.8191 34.6667 20.8345 31.6817 20.8345 28C20.8345 24.3179 23.8191 21.3333 27.5012 21.3333Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <radialGradient id="paint0_radial_3297_25837" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.8073 59.2497) rotate(-90) scale(53.6786 49.939)">
                                                                    <stop stop-color="#FFDD55" />
                                                                    <stop offset="0.1" stop-color="#FFDD55" />
                                                                    <stop offset="0.5" stop-color="#FF543E" />
                                                                    <stop offset="1" stop-color="#C837AB" />
                                                                </radialGradient>
                                                                <radialGradient id="paint1_radial_3297_25837" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-8.6584 4.81776) rotate(78.6776) scale(23.9948 98.9326)">
                                                                    <stop stop-color="#3771C8" />
                                                                    <stop offset="0.128" stop-color="#3771C8" />
                                                                    <stop offset="1" stop-color="#6600FF" stop-opacity="0" />
                                                                </radialGradient>
                                                                <clipPath id="clip0_3297_25837">
                                                                    <rect width="55.0017" height="55" fill="white" transform="translate(-0.000488281 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className={styles.acrossIcon} onClick={handleEmailShare}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                            <g clip-path="url(#clip0_3297_25839)">
                                                                <path d="M4.08796 48.3357H12.8495V27.1502L0.333008 17.7344V44.5841C0.333008 46.6438 2.02642 48.3357 4.08796 48.3357Z" fill="#4285F4" />
                                                                <path d="M42.8184 48.3357H51.5799C53.6415 48.3357 55.3349 46.6438 55.3349 44.5841V17.7344L42.8184 27.0766" fill="#34A853" />
                                                                <path d="M42.8184 10.8935V27.1504L55.3349 17.8082V12.7325C55.3349 8.09814 50.0338 5.44995 46.3524 8.24526" fill="#FBBC04" />
                                                                <path d="M12.8501 27.1476V10.8906L27.8699 22.1454L42.8161 10.8906V27.1476L27.7963 38.3288" fill="#EA4335" />
                                                                <path d="M0.333008 12.7309V17.7331L12.8495 27.0753V10.8919L9.31545 8.24372C5.63412 5.52197 0.333008 8.17016 0.333008 12.7309Z" fill="#C5221F" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_3297_25839">
                                                                    <rect width="55" height="55" fill="white" transform="translate(0.333008 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className={styles.acrossIcon} onClick={handleWhatsAppShare}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                            <g clip-path="url(#clip0_3297_25848)">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M47.6546 8.48647C42.4851 3.33888 35.6096 0.502612 28.284 0.5C13.1887 0.5 0.9035 12.7161 0.898247 27.7318C0.895621 32.532 2.1575 37.2174 4.55389 41.3465L0.668457 55.4599L15.186 51.6729C19.1856 53.8433 23.6895 54.9859 28.2722 54.9872H28.284C43.3766 54.9872 55.6633 42.7698 55.6685 27.754C55.6711 20.4767 52.8256 13.6354 47.6546 8.48778V8.48647ZM28.284 50.388H28.2748C24.191 50.3868 20.1849 49.295 16.6895 47.2331L15.8583 46.7422L7.2431 48.9895L9.54231 40.636L9.00131 39.7794C6.7231 36.1754 5.519 32.0097 5.52163 27.7332C5.52688 15.2533 15.7374 5.09914 28.2933 5.09914C34.3728 5.10175 40.0874 7.45879 44.3851 11.738C48.6828 16.0159 51.0477 21.7042 51.0451 27.7514C51.0397 40.2326 40.8293 50.3868 28.284 50.3868V50.388ZM40.7688 33.4357C40.0847 33.0949 36.7206 31.4495 36.0929 31.2224C35.4653 30.9951 35.0097 30.8816 34.554 31.5631C34.0984 32.2449 32.7866 33.7779 32.3874 34.231C31.9882 34.6854 31.589 34.7416 30.9049 34.4007C30.2209 34.0599 28.0161 33.3417 25.4018 31.0238C23.3679 29.2191 21.9942 26.9915 21.5952 26.3097C21.196 25.6282 21.5532 25.2599 21.8945 24.9217C22.2017 24.6161 22.5786 24.1264 22.9213 23.7294C23.2641 23.3324 23.377 23.0479 23.6054 22.5947C23.834 22.1402 23.7197 21.7434 23.5491 21.4024C23.3783 21.0616 22.0101 17.7121 21.4389 16.3502C20.8834 15.0235 20.3189 15.2037 19.9 15.1815C19.5008 15.1619 19.0452 15.158 18.5882 15.158C18.1313 15.158 17.3906 15.3277 16.763 16.0094C16.1354 16.691 14.3679 18.3376 14.3679 21.6858C14.3679 25.0339 16.8195 28.2712 17.1622 28.7256C17.5049 29.1801 21.9877 36.0526 28.8512 39.0012C30.4835 39.7024 31.7584 40.1216 32.7524 40.435C34.3912 40.9534 35.8828 40.8803 37.062 40.7053C38.3765 40.5095 41.1103 39.0586 41.6801 37.4694C42.25 35.8802 42.25 34.5169 42.0793 34.2335C41.9087 33.9502 41.4517 33.7791 40.7676 33.4383L40.7688 33.4357Z" fill="#25D366" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_3297_25848">
                                                                    <rect width="55" height="55" fill="white" transform="translate(0.666504 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className={styles.acrossIcon} onClick={handleTelegramShare}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="56" viewBox="0 0 55 56" fill="none">
                                                            <g clip-path="url(#clip0_3297_25851)">
                                                                <path d="M27.5214 55.5429C42.7211 55.5429 55.0429 43.2211 55.0429 28.0214C55.0429 12.8218 42.7211 0.5 27.5214 0.5C12.3218 0.5 0 12.8218 0 28.0214C0 43.2211 12.3218 55.5429 27.5214 55.5429Z" fill="url(#paint0_linear_3297_25851)" />
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4322 27.7211C20.4486 24.2059 25.8072 21.9339 28.5079 20.8193C36.1384 17.647 37.7245 17.0897 38.7534 17.0469C38.9677 17.0469 39.4821 17.0897 39.8251 17.347C40.0823 17.5613 40.168 17.8614 40.2109 18.0757C40.2538 18.2901 40.2966 18.7616 40.2538 19.1474C39.8251 23.4771 38.0675 34.0656 37.1244 38.9097C36.7386 40.9674 35.9669 41.6533 35.2382 41.739C33.652 41.8676 32.4089 40.6673 30.8656 39.6813C28.465 38.0952 27.0932 37.1092 24.7354 35.566C22.0347 33.7655 23.7923 32.7795 25.3356 31.1934C25.7214 30.7647 32.7947 24.3774 32.9233 23.7772C32.9233 23.6915 32.9662 23.4342 32.7947 23.3056C32.6232 23.177 32.4089 23.2199 32.2374 23.2628C31.9802 23.3056 28.122 25.8777 20.6201 30.9362C19.5055 31.7078 18.5195 32.0508 17.6193 32.0508C16.6333 32.0508 14.7471 31.4935 13.3325 31.0219C11.6178 30.4646 10.246 30.1646 10.3746 29.2215C10.4603 28.7499 11.1462 28.2355 12.4322 27.7211Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <linearGradient id="paint0_linear_3297_25851" x1="0" y1="28.0015" x2="55.003" y2="28.0015" gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#2AABEE" />
                                                                    <stop offset="1" stop-color="#229ED9" />
                                                                </linearGradient>
                                                                <clipPath id="clip0_3297_25851">
                                                                    <rect width="55" height="55" fill="white" transform="translate(0 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className={styles.acrossIcon} onClick={handleLineShare}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                            <g clip-path="url(#clip0_3297_25857)">
                                                                <path d="M42.933 55.5H12.733C5.93301 55.5 0.333008 49.9 0.333008 43.1V12.9C0.333008 6.1 5.93301 0.5 12.733 0.5H42.933C49.733 0.5 55.333 6.1 55.333 12.9V43.1C55.333 49.9 49.733 55.5 42.933 55.5Z" fill="#06C755" />
                                                                <path d="M46.1303 25.398C46.1303 17.198 37.9303 10.498 27.8303 10.498C17.7303 10.498 9.53027 17.198 9.53027 25.398C9.53027 32.798 16.0303 38.898 24.8303 40.098C25.4303 40.198 26.2303 40.498 26.4303 40.998C26.6303 41.498 26.5303 42.198 26.5303 42.698C26.5303 42.698 26.3303 43.998 26.2303 44.298C26.1303 44.798 25.8303 46.098 27.8303 45.298C29.8303 44.498 38.4303 39.098 42.2303 34.698C44.9303 31.698 46.1303 28.698 46.1303 25.398Z" fill="white" />
                                                                <path d="M40.0327 30.0988H34.9327C34.7327 30.0988 34.5327 29.8988 34.5327 29.6988V21.6988C34.5327 21.4988 34.7327 21.2988 34.9327 21.2988H40.0327C40.2327 21.2988 40.4327 21.4988 40.4327 21.6988V22.9988C40.4327 23.1988 40.2327 23.3988 40.0327 23.3988H36.5327V24.7988H40.0327C40.2327 24.7988 40.4327 24.9988 40.4327 25.1988V26.4988C40.4327 26.6988 40.2327 26.8988 40.0327 26.8988H36.5327V28.2988H40.0327C40.2327 28.2988 40.4327 28.4988 40.4327 28.6988V29.9988C40.4327 29.9988 40.2327 30.0988 40.0327 30.0988Z" fill="#06C755" />
                                                                <path d="M21.0326 30.0988C21.2326 30.0988 21.4326 29.8988 21.4326 29.6988V28.4988C21.4326 28.2988 21.2326 28.0988 21.0326 28.0988H17.5326V21.6988C17.5326 21.4988 17.3326 21.2988 17.1326 21.2988H15.8326C15.6326 21.2988 15.4326 21.4988 15.4326 21.6988V29.6988C15.4326 29.8988 15.6326 30.0988 15.8326 30.0988H21.0326Z" fill="#06C755" />
                                                                <path d="M24.1331 21.3984H22.8331C22.6331 21.3984 22.4331 21.5984 22.4331 21.7984V29.7984C22.4331 29.9984 22.6331 30.1984 22.8331 30.1984H24.1331C24.3331 30.1984 24.5331 29.9984 24.5331 29.7984V21.7984C24.4331 21.5984 24.3331 21.3984 24.1331 21.3984Z" fill="#06C755" />
                                                                <path d="M32.9325 21.3984H31.6325C31.4325 21.3984 31.2325 21.5984 31.2325 21.7984V26.4984L27.5325 21.5984H26.2325C26.0325 21.5984 25.8325 21.7984 25.8325 21.9984V29.9984C25.8325 30.1984 26.0325 30.3984 26.2325 30.3984H27.3325C27.5325 30.3984 27.7325 30.1984 27.7325 29.9984V25.1984L31.4325 30.1984L31.5325 30.2984H31.6325H32.9325C33.1325 30.2984 33.3325 30.0984 33.3325 29.8984V21.8984C33.3325 21.5984 33.1325 21.3984 32.9325 21.3984Z" fill="#06C755" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_3297_25857">
                                                                    <rect width="55" height="55" fill="white" transform="translate(0.333008 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </Popup>
                        </div>
                        <div className={styles.jobLogosInner}>
                            <div className={styles.jobLogosInnerInner} onClick={props.handleSaved.bind(this, props.clickedJobData.jId)}>
                                {props.savedJobs.includes(props.clickedJobData.jId) ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6665 3.625C10.3404 3.625 9.06865 4.15178 8.13097 5.08947C7.19329 6.02715 6.6665 7.29892 6.6665 8.625V33.855C6.66635 34.2929 6.78125 34.7232 6.99968 35.1028C7.21811 35.4824 7.53242 35.7979 7.91114 36.0178C8.28986 36.2377 8.71971 36.3543 9.15764 36.3558C9.59557 36.3574 10.0262 36.2439 10.4065 36.0267L19.1732 31.0167C19.4249 30.8729 19.7099 30.7972 19.9998 30.7972C20.2898 30.7972 20.5747 30.8729 20.8265 31.0167L29.5932 36.0267C29.9734 36.2439 30.4041 36.3574 30.842 36.3558C31.28 36.3543 31.7098 36.2377 32.0885 36.0178C32.4673 35.7979 32.7816 35.4824 33 35.1028C33.2184 34.7232 33.3333 34.2929 33.3332 33.855V8.625C33.3332 7.29892 32.8064 6.02715 31.8687 5.08947C30.931 4.15178 29.6593 3.625 28.3332 3.625H11.6665Z" fill="#313DEB" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <path d="M21.25 3.75H8.75C8.08696 3.75 7.45107 4.01339 6.98223 4.48223C6.51339 4.95107 6.25 5.58696 6.25 6.25V25.1725C6.25004 25.2819 6.27881 25.3895 6.33345 25.4843C6.38809 25.5791 6.46667 25.658 6.56134 25.7129C6.65601 25.7678 6.76344 25.7969 6.87289 25.7973C6.98234 25.7977 7.08996 25.7693 7.185 25.715L13.76 21.9587C14.1377 21.743 14.5651 21.6296 15 21.6296C15.4349 21.6296 15.8623 21.743 16.24 21.9587L22.815 25.7162C22.9101 25.7706 23.0179 25.799 23.1274 25.7985C23.237 25.7981 23.3445 25.7689 23.4392 25.7138C23.5339 25.6588 23.6125 25.5798 23.667 25.4847C23.7216 25.3897 23.7502 25.2821 23.75 25.1725V6.25C23.75 5.58696 23.4866 4.95107 23.0178 4.48223C22.5489 4.01339 21.913 3.75 21.25 3.75Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                }
                            </div>
                        </div>
                        {appliedJobsLoading ? (
                            <button disabled className={styles.loadingButton}>
                                <div className={styles.buttonSpinner}></div>
                                Loading...
                            </button>
                        ) : appliedJobs.includes(props.clickedJobData.jId) ? (
                            <button>Applied</button>
                        ) : (
                            <Popup trigger={<button>Apply</button>}  nested modal>
                                {closeJobsApply => (
                                    <div className='delPopUp'>
                                        <img src='./images/checkMark.png' className="popUpCheckimage"></img>
                                        <div className={styles.delContentButtons}>
                                            <div className='delContent'>
                                                <h2>Have You applied this job? </h2>
                                            </div>
                                            <div className='delButtons'>
                                                <button className='cancelBut' onClick={closeJobsApply}>No</button>
                                                <Popup onOpen={() => { appliedJobsHandler(props.clickedJobData.jId); addToDashboard(props.clickedJobData); recordLogin(email); }} trigger={<button className='submitBut' onClick={() => { closeJobsApply(); }}>Yes</button>} position="center center" nested modal>
                                                    {closeDashboard => (
                                                        <div className={styles.appliedJobPopup}>
                                                            <img src='./images/checkMark.png' ></img>
                                                            <div className={styles.appliedJobDashboardContentButton}>
                                                                <div className={styles.appliedJobDashboardContent}>
                                                                    <div className={styles.contentHeadPop}>Job Added to Tracker</div>
                                                                    <div className={styles.contentSubHeadPop}>Your applied job has been successfully added to your Job Tracker.</div>
                                                                </div>
                                                                <div className={styles.contentButtonsPop}>
                                                                    <button className={styles.closeBut} onClick={event => {
                                                                        closeDashboard();
                                                                        closeJobsApply();
                                                                        window.location.reload();
                                                                    }}>Close</button>
                                                                    <button className={styles.naviJobDashboard} onClick={naviJobTarcker}>View Job Tracker</button>
                                                                </div>
                                                            </div>
                                                            <div className={styles.closePopUp} onClick={event => {
                                                                closeDashboard();
                                                                closeJobsApply();
                                                                window.location.reload();

                                                            }
                                                            }>
                                                            </div>

                                                        </div>

                                                    )}
                                                </Popup>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        )}
                    </div>
                </div>
                <div className={styles.horizontalLineMain}></div>

                <div className="flex flex-col md:flex-row gap-2 p-2 md:items-center justify-between w-full">
                    <div className=" flex  items-center gap-2 ">

                        {props.clickedJobData.skills && (
                            <div className={styles.skillMatch}>
                                <div className={styles.matchChart}>
                                    <ResponsiveContainer width={58} height={60}>
                                        <PieChart>
                                                                        <Pie
                                data={[
                                    { value: skillMatchPercentage, color: skillMatchPercentage >= 70 ? '#4CAF50' : skillMatchPercentage >= 40 ? '#FFA500' : '#FF4444' },
                                    { value: 100 - skillMatchPercentage, color: '#E5E7EB' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={28}
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
                                ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <text
                                x="50%"
                                y="55%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    fontFamily: 'Gellix, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    fill: '#313DEB'
                                }}
                            >
                                {skillMatchPercentage}%
                            </text>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                        <div className=" relative text-sm  md:text-lg md:font-semibold">Skills Match</div>
                    </div>
                    <div className=" flex items-center gap-1 justify-end ">
                        <AiOutlineThunderbolt className=" text-lg text-[#313DEB]" />
                        <p className="text-sm   font-semibold text-[#313DEB]">Boost your match Percentage</p>
                    </div>
                </div>

                {/* Skills display section with highlighting */}
                {props.clickedJobData.skills && (
                    <SkillsHighlightSection 
                        jobSkills={props.clickedJobData.skills}
                        userSkills={defaultSkills}
                        isLoading={skillsLoading}
                    />
                )}

                <div className={styles.mainDescription}>
                    <div className={styles.jobDetailsGrid}>
                        <div className={styles.jobDetailCard}>
                            <div className={styles.jobDetailIcon}>
                                <HiOutlineLocationMarker size={18} />
                            </div>
                            <div className={styles.jobDetailContent}>
                                <div className={styles.jobDetailLabel}>Location</div>
                                <div className={styles.jobDetailValue}>{props.clickedJobData.location}</div>
                            </div>
                        </div>

                        <div className={styles.jobDetailCard}>
                            <div className={styles.jobDetailIcon}>
                                <HiOutlineBriefcase size={18} />
                            </div>
                            <div className={styles.jobDetailContent}>
                                <div className={styles.jobDetailLabel}>Job Type</div>
                                <div className={styles.jobDetailValue}>{props.clickedJobData.workSetting}</div>
                            </div>
                        </div>

                        <div className={styles.jobDetailCard}>
                            <div className={styles.jobDetailIcon}>
                                <HiOutlineClock size={18} />
                            </div>
                            <div className={styles.jobDetailContent}>
                                <div className={styles.jobDetailLabel}>Experience</div>
                                {props.clickedJobData.exp > -1 ?
                                    <div className={styles.jobDetailValue}>{props.clickedJobData.exp}+ years</div> :
                                    <div className={styles.jobDetailValue}>Experience not listed</div>
                                }

                            </div>
                        </div>

                        <div className={styles.jobDetailCard}>
                            <div className={styles.jobDetailIcon}>
                                <HiOutlineCurrencyDollar size={18} />
                            </div>
                            <div className={styles.jobDetailContent}>
                                <div className={styles.jobDetailLabel}>Salary</div>
                                {
                                    props.clickedJobData.salary ?
                                        <div className={styles.jobDetailValue}>$ {new Intl.NumberFormat('en-us').format(props.clickedJobData.salary)}</div> :

                                        <div className={styles.jobDetailValue}>Salary not listed</div>
                                }

                            </div>
                        </div>
                    </div>
                    <div className={styles.horizontalLineMain}></div>

                    <div className={styles.fullJobDescClicked}>

                        <div className="grid grid-cols-3 items-center mb-2  w-full">
                            {
                                tabs.map((tabs, index) => {
                                    return (
                                        <div key={index} className={` cursor-pointer duration-300 text-center border-b-2  py-1 ${activeTab === tabs ? "border-b-2 border-[#313DEB] text-[#313DEB] font-semibold" : ''}`} onClick={() => setActiveTab(tabs)}>{tabs}</div>
                                    )
                                })
                            }
                        </div>

                        {
                            activeTab === "Job Description" &&
                            <JobDescription discriptionData={props.clickedJobData.fullDesc} />
                        }
                        {activeTab === "H1B Report" && <H1BReport companyName={props.clickedJobData.company} />}
                        {activeTab === "PERM Report" && <PermReport companyName={props.clickedJobData.company} />}
                    </div>
                </div>

            </div>
        </div>
    )
}
