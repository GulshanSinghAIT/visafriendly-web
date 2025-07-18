import React, { useEffect } from "react";
import styles from "./savedJobs.module.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { JobCardExpansion } from "../jobsAfterSignIn/jobCardExpansion/JobCardExpansion";
import { Header } from "../profile/header/Header";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { LoadingLogo } from "../loadingPage/LoadingLogo";

export function SavedJobs(){
    const { user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    const [savedJobs, setSavedJobs] = React.useState([]);
    const [filteredSavedJobs, setFilteredSaved] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    useEffect(() => {
        const fetchSaved = async () => {
          try {
            if (!email) return;
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/jobs/savedJobs`, {
                params: { email },
              }
            );

            if (response.data.success) {
                setSavedJobs(response.data.savedJobs);
                setFilteredSaved(response.data.savedJobs);
                setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching saved jobs:", error);
            setLoading(false);
          } 
        };
    
        fetchSaved();
    }, [email]);

    const [savedSearchValue, setSavedSearch] = React.useState("");
    const [sortDropDown, setSortDropDown] = React.useState(false);
    const [dateDropDown, setDateDropDown] = React.useState(false);
    
    useEffect(() => {
        const newJobs = savedJobs.filter((savedJob) =>
            savedJob.company.toLowerCase().includes(savedSearchValue.toLowerCase()) || 
            savedJob.title.toLowerCase().includes(savedSearchValue.toLowerCase())
        );
        setFilteredSaved(newJobs);
    }, [savedSearchValue, savedJobs]);

    const sortDrop = ["Old to New", "New to Old"];
    const dateDrop = ["6 Hrs", "24 Hrs", "3 Days", "7 Days", "14 Days", "30 Days"];

    function sortDropHandler() {
        setSortDropDown(!sortDropDown);
        setDateDropDown(false);
    }

    function dateDropHandler() {
        setDateDropDown(!dateDropDown);
        setSortDropDown(false);
    }

    function savedSearchHandler(e) {
        setSavedSearch(e.target.value);
    }

    async function handleSaved(jobId) {
        try {
            if (!email) return;
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/jobs/savedJobs/${jobId}`, {
                params: { email },
                }
            );
            if (response.data.success) {
                setSavedJobs(savedJobs.filter(job => job.id !== jobId));
            }
        } catch (error) {
            console.error("Error removing saved job:", error);
        }
    }

    if (loading) {
        return <LoadingLogo />;
    }

    return (
        <div className={styles.savedJobsMain}>
            <div className={styles.savedJobsHead}>
                <Header></Header>
                <div className={styles.jobSavedFilters}>
                    <div className={styles.jobsSavedSearch}>
                        <div className={styles.jobsSavedSearchInner}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M9.16667 16.7904C12.8486 16.7904 15.8333 13.8056 15.8333 10.1237C15.8333 6.4418 12.8486 3.45703 9.16667 3.45703C5.48477 3.45703 2.5 6.4418 2.5 10.1237C2.5 13.8056 5.48477 16.7904 9.16667 16.7904Z" stroke="#6B7280" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.5008 18.4583L13.9175 14.875" stroke="#6B7280" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input type="text" onChange={savedSearchHandler} placeholder="Search company name, title"></input>
                        </div>
                    </div>
                    <div className={styles.jobSavedFiltersInner}>
                        <div className={styles.filterCover}>
                            <div className={styles.sortFilterByDate} onClick={sortDropHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                                    <path d="M4.5 24.3359L10.5 30.3359M10.5 30.3359L16.5 24.3359M10.5 30.3359V6.33594M16.5 6.33594H31.5M16.5 12.3359H27M16.5 18.3359H22.5" stroke="#545251" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            {sortDropDown && (
                                <div className={styles.multiSelectSetDrop}>
                                    <div className={styles.dropDownCatName}>SORT BY</div>
                                    {sortDrop.map((c, i) => (
                                        <div key={i} className={styles.dropDownCatNames}>
                                            <div>{c}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.filterCover}>
                            <div className={styles.sortFilterByDate} onClick={dateDropHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                                    <g clipPath="url(#clip0_2320_18269)">
                                        <path d="M31.5 17.791C32.2031 18.2715 32.8301 18.8164 33.3809 19.4258C33.9316 20.0352 34.4062 20.7031 34.8047 21.4297C35.2031 22.1562 35.4961 22.9238 35.6836 23.7324C35.8711 24.541 35.9766 25.3672 36 26.2109C36 27.6055 35.7363 28.918 35.209 30.1484C34.6816 31.3789 33.9551 32.4512 33.0293 33.3652C32.1035 34.2793 31.0312 35 29.8125 35.5273C28.5938 36.0547 27.2812 36.3242 25.875 36.3359C24.8086 36.3359 23.7773 36.1777 22.7812 35.8613C21.7852 35.5449 20.8711 35.0879 20.0391 34.4902C19.207 33.8926 18.4688 33.1777 17.8242 32.3457C17.1797 31.5137 16.6816 30.5938 16.3301 29.5859H2.25V2.58594H6.75V0.335938H9V2.58594H24.75V0.335938H27V2.58594H31.5V17.791ZM4.5 4.83594V9.33594H29.25V4.83594H27V7.08594H24.75V4.83594H9V7.08594H6.75V4.83594H4.5ZM15.8027 27.3359C15.7676 26.9727 15.75 26.5977 15.75 26.2109C15.75 25.2031 15.8906 24.2246 16.1719 23.2754C16.4531 22.3262 16.8809 21.4297 17.4551 20.5859H15.75V18.3359H18V19.8477C18.4805 19.25 19.0137 18.7227 19.5996 18.2656C20.1855 17.8086 20.8184 17.416 21.498 17.0879C22.1777 16.7598 22.8867 16.5137 23.625 16.3496C24.3633 16.1855 25.1133 16.0977 25.875 16.0859C27.0469 16.0859 28.1719 16.2793 29.25 16.666V11.5859H4.5V27.3359H15.8027ZM25.875 34.0859C26.9648 34.0859 27.9844 33.8809 28.9336 33.4707C29.8828 33.0605 30.7148 32.498 31.4297 31.7832C32.1445 31.0684 32.707 30.2363 33.1172 29.2871C33.5273 28.3379 33.7383 27.3125 33.75 26.2109C33.75 25.1211 33.5449 24.1016 33.1348 23.1523C32.7246 22.2031 32.1621 21.3711 31.4473 20.6562C30.7324 19.9414 29.9004 19.3789 28.9512 18.9688C28.002 18.5586 26.9766 18.3477 25.875 18.3359C24.7852 18.3359 23.7656 18.541 22.8164 18.9512C21.8672 19.3613 21.0352 19.9238 20.3203 20.6387C19.6055 21.3535 19.043 22.1855 18.6328 23.1348C18.2227 24.084 18.0117 25.1094 18 26.2109C18 27.3008 18.2051 28.3203 18.6152 29.2695C19.0254 30.2188 19.5879 31.0508 20.3027 31.7656C21.0176 32.4805 21.8496 33.043 22.7988 33.4531C23.748 33.8633 24.7734 34.0742 25.875 34.0859ZM27 25.0859H30.375V27.3359H24.75V20.5859H27V25.0859ZM6.75 18.3359H9V20.5859H6.75V18.3359ZM11.25 18.3359H13.5V20.5859H11.25V18.3359ZM11.25 13.8359H13.5V16.0859H11.25V13.8359ZM6.75 22.8359H9V25.0859H6.75V22.8359ZM11.25 22.8359H13.5V25.0859H11.25V22.8359ZM18 16.0859H15.75V13.8359H18V16.0859ZM22.5 16.0859H20.25V13.8359H22.5V16.0859ZM27 16.0859H24.75V13.8359H27V16.0859Z" fill="#545251"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2320_18269">
                                            <rect width="36" height="36" fill="white" transform="translate(0 0.335938)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            {dateDropDown && (
                                <div className={styles.multiSelectSetDrop}>
                                    <div className={styles.dropDownCatName}>POSTED ON</div>
                                    {dateDrop.map((c, i) => (
                                        <div key={i} className={styles.dropDownCatNames}>
                                            <div>{c}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.savedJobCards}>
                {filteredSavedJobs.map((job) => (
                    <Popup
                        key={job.id}
                        trigger={
                            <div className={styles.savedJobDataCard}>
                                <div className={styles.jobDataCardInner}>
                                    <div className={styles.jobDataCardHeader}>
                                        <div className={styles.jobListingJobName}>
                                            <div className={styles.jobListingImage}></div>
                                            <div className={styles.jobListingDetails}>
                                                <div className={styles.jobListingRole}>{job.title}</div>
                                                <div className={styles.jobListingCompanyName}>{job.company}</div>
                                            </div>
                                        </div>
                                        <div className={styles.savedBookApply}>
                                            <svg
                                                onClick={() => handleSaved(job.id)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="40"
                                                height="41"
                                                viewBox="0 0 40 41"
                                                fill="none"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.6665 3.625C10.3404 3.625 9.06865 4.15178 8.13097 5.08947C7.19329 6.02715 6.6665 7.29892 6.6665 8.625V33.855C6.66635 34.2929 6.78125 34.7232 6.99968 35.1028C7.21811 35.4824 7.53242 35.7979 7.91114 36.0178C8.28986 36.2377 8.71971 36.3543 9.15764 36.3558C9.59557 36.3574 10.0262 36.2439 10.4065 36.0267L19.1732 31.0167C19.4249 30.8729 19.7099 30.7972 19.9998 30.7972C20.2898 30.7972 20.5747 30.8729 20.8265 31.0167L29.5932 36.0267C29.9734 36.2439 30.4041 36.3574 30.842 36.3558C31.28 36.3543 31.7098 36.2377 32.0885 36.0178C32.4673 35.7979 32.7816 35.4824 33 35.1028C33.2184 34.7232 33.3333 34.2929 33.3332 33.855V8.625C33.3332 7.29892 32.8064 6.02715 31.8687 5.08947C30.931 4.15178 29.6593 3.625 28.3332 3.625H11.6665Z"
                                                    fill="#313DEB"
                                                />
                                            </svg>
                                            <div className={styles.savedApplyButton}>
                                                <button>Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.horizontalLine}></div>
                                    <div className={styles.jobCardJobDetails}>
                                        <div className={styles.jobCardLocExp}>
                                            <div className={styles.jobCardLoc}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <div>{job.location}</div>
                                            </div>
                                            <div className={styles.jobCardExp}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <div>{job.exp}+ years exp</div>
                                            </div>
                                        </div>
                                        <div className={styles.jobCardTypeSal}>
                                            <div className={styles.jobCardType}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                    <path d="M12.5 18C15.8137 18 18.5 15.3137 18.5 12C18.5 8.68629 15.8137 6 12.5 6C9.18629 6 6.5 8.68629 6.5 12C6.5 15.3137 9.18629 18 12.5 18Z" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M12.5 10V12L13.5 13" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M16.6303 7.66037L15.8204 3.61037C15.7289 3.14997 15.4784 2.73641 15.1128 2.44207C14.7472 2.14773 14.2897 1.99137 13.8204 2.00037H11.1404C10.671 1.99137 10.2135 2.14773 9.8479 2.44207C9.48226 2.73641 9.2318 3.14997 9.14035 3.61037L8.36035 7.66037" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M8.37988 16.3586L9.17988 20.3586C9.27133 20.819 9.52179 21.2326 9.88743 21.5269C10.2531 21.8212 10.7106 21.9776 11.1799 21.9686H13.8999C14.3692 21.9776 14.8267 21.8212 15.1923 21.5269C15.558 21.2326 15.8084 20.819 15.8999 20.3586L16.7099 16.3086" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <div>{job.type} - {job.workSetting}</div>
                                            </div>
                                            <div className={styles.jobCardSal}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                    <path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M16.5 8H10.5C9.96957 8 9.46086 8.21071 9.08579 8.58579C8.71071 8.96086 8.5 9.46957 8.5 10C8.5 10.5304 8.71071 11.0391 9.08579 11.4142C9.46086 11.7893 9.96957 12 10.5 12H14.5C15.0304 12 15.5391 12.2107 15.9142 12.5858C16.2893 12.9609 16.5 13.4696 16.5 14C16.5 14.5304 16.2893 15.0391 15.9142 15.4142C15.5391 15.7893 15.0304 16 14.5 16H8.5" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M12.5 18V6" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <div>{job.salary}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.horizontalLine}></div>
                                    <div className={styles.jobDataCardFooter}>
                                        <div className={styles.jobCardApplicants}>
                                            <div>{job.applicants || 0} applicants</div>
                                        </div>
                                        <div className={styles.jobCardDaysAgo}>
                                            <div>{job.postedDays || 0} days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <JobCardExpansion job={job} />
                    </Popup>
                ))}
            </div>
        </div>
    );
}
