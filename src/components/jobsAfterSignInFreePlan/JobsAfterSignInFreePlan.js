import React from "react";
import "./JobsAfterSignInFreePlan.css";
import { Header } from "../profile/header/Header";
import { useEffect } from "react";
import { JobCardExpansionFreePlan } from "./jobCardExpansionFreePlan/JobCardExpansionFreePlan";
import { FiltersMainJobFreePlan } from "./filtersMainJobFreePlan/FiltersMainJobFreePlan";
import Popup from "reactjs-popup";


export function JobsAfterSignInFreePlan(props){
    const jobCats=["Engineering(Software)", "Data Science & Analytics","Data Engineering" ,"AI & ML","Business Analytics & BI","UI/UX & Design","Product Management","Other IT"];
    const jobTypes=["Full-Time","Part-Time","Contract","Internship"];
    const workSet=["On-Site","Hybrid","Remote"];
    const sortDrop=["Recommended","Most Active","Most Recent","Closing Soon"];
    const dateDrop = ["Today","Yesterday","Last 3 Days","Last 7 Days","Last 30 Days"];

    const [jobCatsBool,setJobCats]=React.useState([false,false,false,false,false,false,false,false]);
    const [jobTypeBool,setJobType]=React.useState([false,false,false,false]);
    const [workSetBool,setWorkSet]=React.useState([false,false,false]);
    const [sortDropBool,setSortDrop] = React.useState([false,false,false,false]);
    const [dateDropBool,setDateDrop] = React.useState([false,false,false,false,false]);
    const [sortDropDown,setSortDropDown] = React.useState(false);
    const [dateDropDown,setDateDropDown] = React.useState(false);
    const [jobDataFilter,setJobsFilter]=React.useState(props.jobData);
    function changeDateDrop(index){
        const newSort=dateDropBool.map((stat,i) => {
            if(i===index){
                return !stat;
            }
            else{
                return false;
            }
        })
        setDateDrop(newSort)
    }
    function changeSortDrop(index){
        const newSort=sortDropBool.map((stat,i) => {
            if(i===index){
                return !stat;
            }
            else{
                return false;
            }
        })
        setSortDrop(newSort)
    }

    function sortDropHandler(){
        setSortDropDown(!sortDropDown)
        setDateDropDown(false)
    }
    function dateDropHandler(){
        setDateDropDown(!dateDropDown)
        setSortDropDown(false)
    }
    const prevSymbol="<<";
    const nextSymbol=">>";
    let lastPage= Math.floor((jobDataFilter.length)/6);
    const remainderLastPage = (jobDataFilter.length)%6;
    if(remainderLastPage != 0){
        lastPage = lastPage+1;
    }
    const [currentPage,setCurrent]=React.useState(1);
    const [clickedPage,setClicked] = React.useState(1);
    const [clickedIndex,setClickedIndex] = React.useState(0);
    useEffect(()=>{
        setClickedIndex(0);
        setClicked(1);
        setCurrent(1);
        setJobsFilter(props.jobData);
    },[props.jobData])

    useEffect(()=>{
        setClickedIndex(0);
        setClicked(1);
        setCurrent(1);
    },[jobDataFilter])
    
  
    const clickedJobData = jobDataFilter[clickedIndex];

    function handleClickedIndex(index){
        setClickedIndex(index);
    }

    function handleNextPagination(){
        if(currentPage+5 <= lastPage){
            setCurrent(currentPage+1);
        }
    }
    function handlePrevPagination(){
        if(currentPage-1 >= 1){
            setCurrent(currentPage-1);
        }
    }

   

    const currentPageJobs = jobDataFilter
    .filter( (c,i)=>(i>=(clickedPage-1)*6 && i<(clickedPage)*6-2))

    const currentPageBlurJobs = jobDataFilter
    .filter( (c,i)=>(i>=(clickedPage)*6-2 && i<(clickedPage)*6))
    
    console.log(currentPageBlurJobs)

    const forPageIndices=[];
    for(let i=0;i<lastPage;i++){
        forPageIndices.push(i);
    }
    

    return(
        <div className="JobsAfterSignIn">
            <div className="jobListingHead">
                <Header ></Header>
                <FiltersMainJobFreePlan
                jobData={props.jobData} setJobsFilter={setJobsFilter}
                jobCats={jobCats} jobTypes={jobTypes} workSet={workSet}
                jobCatsBool={jobCatsBool} setJobCats={setJobCats}
                jobTypeBool={jobTypeBool} setJobType={setJobType}
                workSetBool={workSetBool} setWorkSet={setWorkSet}
                ></FiltersMainJobFreePlan>
            </div>
            <div className="allListings">
                <div className="jobListSortFilters">
                    <div className="totalJobsFound">{jobDataFilter.length} Jobs found</div>
                    <div className="totalJobsFilters">
                        <div className="filterCover">
                        <div className="sortFilterByDate" onClick={sortDropHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                                <path d="M4.5 24.3359L10.5 30.3359M10.5 30.3359L16.5 24.3359M10.5 30.3359V6.33594M16.5 6.33594H31.5M16.5 12.3359H27M16.5 18.3359H22.5" stroke="#545251" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        {sortDropDown && 
                            (<div className="multiSelectSetDrop">
                                <div className="dropDownCatName">SORT BY</div>
                                {
                                    sortDrop.map((c,i) => (
                                        <div className="dropDownCatNames">
                                            <input type="checkbox"  className="check" checked={sortDropBool[i]} onChange={changeSortDrop.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                }
                            </div>)
                        }
                        </div>
                        <div className="filterCover">
                        <div className="sortFilterByDate" onClick={dateDropHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                            <g clip-path="url(#clip0_2320_18269)">
                                <path d="M31.5 17.791C32.2031 18.2715 32.8301 18.8164 33.3809 19.4258C33.9316 20.0352 34.4062 20.7031 34.8047 21.4297C35.2031 22.1562 35.4961 22.9238 35.6836 23.7324C35.8711 24.541 35.9766 25.3672 36 26.2109C36 27.6055 35.7363 28.918 35.209 30.1484C34.6816 31.3789 33.9551 32.4512 33.0293 33.3652C32.1035 34.2793 31.0312 35 29.8125 35.5273C28.5938 36.0547 27.2812 36.3242 25.875 36.3359C24.8086 36.3359 23.7773 36.1777 22.7812 35.8613C21.7852 35.5449 20.8711 35.0879 20.0391 34.4902C19.207 33.8926 18.4688 33.1777 17.8242 32.3457C17.1797 31.5137 16.6816 30.5938 16.3301 29.5859H2.25V2.58594H6.75V0.335938H9V2.58594H24.75V0.335938H27V2.58594H31.5V17.791ZM4.5 4.83594V9.33594H29.25V4.83594H27V7.08594H24.75V4.83594H9V7.08594H6.75V4.83594H4.5ZM15.8027 27.3359C15.7676 26.9727 15.75 26.5977 15.75 26.2109C15.75 25.2031 15.8906 24.2246 16.1719 23.2754C16.4531 22.3262 16.8809 21.4297 17.4551 20.5859H15.75V18.3359H18V19.8477C18.4805 19.25 19.0137 18.7227 19.5996 18.2656C20.1855 17.8086 20.8184 17.416 21.498 17.0879C22.1777 16.7598 22.8867 16.5137 23.625 16.3496C24.3633 16.1855 25.1133 16.0977 25.875 16.0859C27.0469 16.0859 28.1719 16.2793 29.25 16.666V11.5859H4.5V27.3359H15.8027ZM25.875 34.0859C26.9648 34.0859 27.9844 33.8809 28.9336 33.4707C29.8828 33.0605 30.7148 32.498 31.4297 31.7832C32.1445 31.0684 32.707 30.2363 33.1172 29.2871C33.5273 28.3379 33.7383 27.3125 33.75 26.2109C33.75 25.1211 33.5449 24.1016 33.1348 23.1523C32.7246 22.2031 32.1621 21.3711 31.4473 20.6562C30.7324 19.9414 29.9004 19.3789 28.9512 18.9688C28.002 18.5586 26.9766 18.3477 25.875 18.3359C24.7852 18.3359 23.7656 18.541 22.8164 18.9512C21.8672 19.3613 21.0352 19.9238 20.3203 20.6387C19.6055 21.3535 19.043 22.1855 18.6328 23.1348C18.2227 24.084 18.0117 25.1094 18 26.2109C18 27.3008 18.2051 28.3203 18.6152 29.2695C19.0254 30.2188 19.5879 31.0508 20.3027 31.7656C21.0176 32.4805 21.8496 33.043 22.7988 33.4531C23.748 33.8633 24.7734 34.0742 25.875 34.0859ZM27 25.0859H30.375V27.3359H24.75V20.5859H27V25.0859ZM6.75 18.3359H9V20.5859H6.75V18.3359ZM11.25 18.3359H13.5V20.5859H11.25V18.3359ZM11.25 13.8359H13.5V16.0859H11.25V13.8359ZM6.75 22.8359H9V25.0859H6.75V22.8359ZM11.25 22.8359H13.5V25.0859H11.25V22.8359ZM18 16.0859H15.75V13.8359H18V16.0859ZM22.5 16.0859H20.25V13.8359H22.5V16.0859ZM27 16.0859H24.75V13.8359H27V16.0859Z" fill="#545251"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_2320_18269">
                                <rect width="36" height="36" fill="white" transform="translate(0 0.335938)"/>
                                </clipPath>
                            </defs>
                            </svg>
                        </div>
                        {dateDropDown && 
                            (<div className="multiSelectSetDrop">
                                <div className="dropDownCatName">POSTED ON</div>
                                {
                                    dateDrop.map((c,i) => (
                                        <div className="dropDownCatNames">
                                            <input type="checkbox"  className="check" checked={dateDropBool[i]} onChange={changeDateDrop.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                }
                            </div>)
                        }
                        </div>
                    </div>
                </div>
                <div className="jobListingsData">
                    <div className="allJobDataCards">
                        <div className="jobDataCards">
                            {currentPageJobs.map((stat,index) => (
                                <div className={(clickedPage-1)*6+index ===clickedIndex ? "jobDataCardBorder": "jobDataCard"} onClick={handleClickedIndex.bind(this,(clickedPage-1)*6+index)}>
                                    <div className="jobDataCardInner">
                                        <div className="jobDataCardHeader">
                                            <div className="jobListingJobName">
                                                <div className="jobListingImage"></div>
                                                <div className="jobListingDetails">
                                                    <div className="jobListingRole">{stat.title}</div>
                                                    <div className="jobListingCompanyName">{stat.company}</div>
                                                    {stat.skills && (
                                                        <div className="jobListingSkills">
                                                            <strong>Skills:</strong> {stat.skills}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="jobListingBookmark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M21.25 3.75H8.75C8.08696 3.75 7.45107 4.01339 6.98223 4.48223C6.51339 4.95107 6.25 5.58696 6.25 6.25V25.1725C6.25004 25.2819 6.27881 25.3895 6.33345 25.4843C6.38809 25.5791 6.46667 25.658 6.56134 25.7129C6.65601 25.7678 6.76344 25.7969 6.87289 25.7973C6.98234 25.7977 7.08996 25.7693 7.185 25.715L13.76 21.9587C14.1377 21.743 14.5651 21.6296 15 21.6296C15.4349 21.6296 15.8623 21.743 16.24 21.9587L22.815 25.7162C22.9101 25.7706 23.0179 25.799 23.1274 25.7985C23.237 25.7981 23.3445 25.7689 23.4392 25.7138C23.5339 25.6588 23.6125 25.5798 23.667 25.4847C23.7216 25.3897 23.7502 25.2821 23.75 25.1725V6.25C23.75 5.58696 23.4866 4.95107 23.0178 4.48223C22.5489 4.01339 21.913 3.75 21.25 3.75Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="horizontalLine"></div>
                                        <div className="jobCardJobDetails">
                                            <div className="jobCardLocExp">
                                                <div className="jobCardLoc">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.location}</div>
                                                </div>
                                                <div className="jobCardExp">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.exp}+ years exp</div>
                                                </div>
                                            </div>
                                            <div className="jobCardTypeSal">
                                                <div className="jobCardType">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <path d="M12.5 18C15.8137 18 18.5 15.3137 18.5 12C18.5 8.68629 15.8137 6 12.5 6C9.18629 6 6.5 8.68629 6.5 12C6.5 15.3137 9.18629 18 12.5 18Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12.5 10V12L13.5 13" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.6303 7.66037L15.8204 3.61037C15.7289 3.14997 15.4784 2.73641 15.1128 2.44207C14.7472 2.14773 14.2897 1.99137 13.8204 2.00037H11.1404C10.671 1.99137 10.2135 2.14773 9.8479 2.44207C9.48226 2.73641 9.2318 3.14997 9.14035 3.61037L8.36035 7.66037" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M8.37988 16.3586L9.17988 20.3586C9.27133 20.819 9.52179 21.2326 9.88743 21.5269C10.2531 21.8212 10.7106 21.9776 11.1799 21.9686H13.8999C14.3692 21.9776 14.8267 21.8212 15.1923 21.5269C15.558 21.2326 15.8084 20.819 15.8999 20.3586L16.7099 16.3086" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.type} - {stat.workSetting}</div>
                                                </div>
                                                <div className="jobCardSal">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.5 8H10.5C9.96957 8 9.46086 8.21071 9.08579 8.58579C8.71071 8.96086 8.5 9.46957 8.5 10C8.5 10.5304 8.71071 11.0391 9.08579 11.4142C9.46086 11.7893 9.96957 12 10.5 12H14.5C15.0304 12 15.5391 12.2107 15.9142 12.5858C16.2893 12.9609 16.5 13.4696 16.5 14C16.5 14.5304 16.2893 15.0391 15.9142 15.4142C15.5391 15.7893 15.0304 16 14.5 16H8.5" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12.5 18V6" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.salary}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="horizontalLine"></div>
                                        <div className="jobDataCardFooter">
                                            <div className="jobCardApplicants">
                                                <div>{54} applicants</div>
                                            </div>
                                            <div className="jobCardDaysAgo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M3.3833 12.0015C3.3833 13.1062 3.60088 14.2 4.0236 15.2205C4.44633 16.2411 5.06593 17.1684 5.84703 17.9495C6.62812 18.7306 7.55542 19.3502 8.57597 19.7729C9.59652 20.1956 10.6903 20.4132 11.795 20.4132C12.8996 20.4132 13.9934 20.1956 15.014 19.7729C16.0345 19.3502 16.9618 18.7306 17.7429 17.9495C18.524 17.1684 19.1436 16.2411 19.5664 15.2205C19.9891 14.2 20.2067 13.1062 20.2067 12.0015C20.2067 9.77061 19.3204 7.63106 17.7429 6.05357C16.1654 4.47607 14.0259 3.58984 11.795 3.58984C9.56407 3.58984 7.42452 4.47607 5.84703 6.05357C4.26953 7.63106 3.3833 9.77061 3.3833 12.0015Z" stroke="#545251" stroke-width="1.86926" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M11.7954 7.32812V12.0013L14.5993 14.8052" stroke="#545251" stroke-width="1.86926" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <div>{10} days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                            <div className="buyPremiumCardInJobCard">
                                <div className="buyPremHead">
                                    <div className="buyPremHeadText">Find Opportunities That Support Your Journey to Work Anywhere!</div></div>
                                <div className="buyPremCardMid">
                                    <div className="buyPremMidPic">
                                        <div className="buyPremGroup">
                                            <img src="./images/groupPic.png"></img>
                                        </div>
                                    </div>
                                    <div className="buyPremMidText">Join millions users already upgrading their journey</div>
                                </div>
                                <div className="buyPremButtonDiv">
                                    <button className="buyPremButton">Buy Premium</button>
                                </div>
                            </div>
                            {currentPageBlurJobs.map((stat,index) => (
                                <div className= "jobDataCardBlur">
                                    <div className="jobDataCardInner">
                                        <div className="jobDataCardHeader">
                                            <div className="jobListingJobName">
                                                <div className="jobListingImage"></div>
                                                <div className="jobListingDetails">
                                                    <div className="jobListingRole">{stat.title}</div>
                                                    <div className="jobListingCompanyName">{stat.company}</div>
                                                    {stat.skills && (
                                                        <div className="jobListingSkills">
                                                            <strong>Skills:</strong> {stat.skills}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="jobListingBookmark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M21.25 3.75H8.75C8.08696 3.75 7.45107 4.01339 6.98223 4.48223C6.51339 4.95107 6.25 5.58696 6.25 6.25V25.1725C6.25004 25.2819 6.27881 25.3895 6.33345 25.4843C6.38809 25.5791 6.46667 25.658 6.56134 25.7129C6.65601 25.7678 6.76344 25.7969 6.87289 25.7973C6.98234 25.7977 7.08996 25.7693 7.185 25.715L13.76 21.9587C14.1377 21.743 14.5651 21.6296 15 21.6296C15.4349 21.6296 15.8623 21.743 16.24 21.9587L22.815 25.7162C22.9101 25.7706 23.0179 25.799 23.1274 25.7985C23.237 25.7981 23.3445 25.7689 23.4392 25.7138C23.5339 25.6588 23.6125 25.5798 23.667 25.4847C23.7216 25.3897 23.7502 25.2821 23.75 25.1725V6.25C23.75 5.58696 23.4866 4.95107 23.0178 4.48223C22.5489 4.01339 21.913 3.75 21.25 3.75Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="horizontalLine"></div>
                                        <div className="jobCardJobDetails">
                                            <div className="jobCardLocExp">
                                                <div className="jobCardLoc">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.location}</div>
                                                </div>
                                                <div className="jobCardExp">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.exp}+ years exp</div>
                                                </div>
                                            </div>
                                            <div className="jobCardTypeSal">
                                                <div className="jobCardType">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <path d="M12.5 18C15.8137 18 18.5 15.3137 18.5 12C18.5 8.68629 15.8137 6 12.5 6C9.18629 6 6.5 8.68629 6.5 12C6.5 15.3137 9.18629 18 12.5 18Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12.5 10V12L13.5 13" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.6303 7.66037L15.8204 3.61037C15.7289 3.14997 15.4784 2.73641 15.1128 2.44207C14.7472 2.14773 14.2897 1.99137 13.8204 2.00037H11.1404C10.671 1.99137 10.2135 2.14773 9.8479 2.44207C9.48226 2.73641 9.2318 3.14997 9.14035 3.61037L8.36035 7.66037" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M8.37988 16.3586L9.17988 20.3586C9.27133 20.819 9.52179 21.2326 9.88743 21.5269C10.2531 21.8212 10.7106 21.9776 11.1799 21.9686H13.8999C14.3692 21.9776 14.8267 21.8212 15.1923 21.5269C15.558 21.2326 15.8084 20.819 15.8999 20.3586L16.7099 16.3086" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.type} - {stat.workSetting}</div>
                                                </div>
                                                <div className="jobCardSal">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.5 8H10.5C9.96957 8 9.46086 8.21071 9.08579 8.58579C8.71071 8.96086 8.5 9.46957 8.5 10C8.5 10.5304 8.71071 11.0391 9.08579 11.4142C9.46086 11.7893 9.96957 12 10.5 12H14.5C15.0304 12 15.5391 12.2107 15.9142 12.5858C16.2893 12.9609 16.5 13.4696 16.5 14C16.5 14.5304 16.2893 15.0391 15.9142 15.4142C15.5391 15.7893 15.0304 16 14.5 16H8.5" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12.5 18V6" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <div>{stat.salary}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="horizontalLine"></div>
                                        <div className="jobDataCardFooter">
                                            <div className="jobCardApplicants">
                                                <div>{54} applicants</div>
                                            </div>
                                            <div className="jobCardDaysAgo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M3.3833 12.0015C3.3833 13.1062 3.60088 14.2 4.0236 15.2205C4.44633 16.2411 5.06593 17.1684 5.84703 17.9495C6.62812 18.7306 7.55542 19.3502 8.57597 19.7729C9.59652 20.1956 10.6903 20.4132 11.795 20.4132C12.8996 20.4132 13.9934 20.1956 15.014 19.7729C16.0345 19.3502 16.9618 18.7306 17.7429 17.9495C18.524 17.1684 19.1436 16.2411 19.5664 15.2205C19.9891 14.2 20.2067 13.1062 20.2067 12.0015C20.2067 9.77061 19.3204 7.63106 17.7429 6.05357C16.1654 4.47607 14.0259 3.58984 11.795 3.58984C9.56407 3.58984 7.42452 4.47607 5.84703 6.05357C4.26953 7.63106 3.3833 9.77061 3.3833 12.0015Z" stroke="#545251" stroke-width="1.86926" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M11.7954 7.32812V12.0013L14.5993 14.8052" stroke="#545251" stroke-width="1.86926" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <div>{10} days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        
                    {jobDataFilter.length==0 ? null : null}
                    {lastPage<=5 && jobDataFilter.length!=0 ? 
                    <div className="jobCardPagination">
                    
                    <div className="paginationPages">
                    {forPageIndices.map((stat,page) => (
                        <div>
                        { currentPage+page===1 ? <div className="clickedPagination">{currentPage}</div>
                        : 
                        <Popup trigger={<div className="clickablePagination" >{currentPage+page}</div>} position="center center" modal>
                                {closePremium =>(
                                <div className='premiumPopUp'>
                                    <img src='./images/premiumImage.png'></img>
                                <div className="delContentButtons">
                                    <div className='delContent'>
                                        <h2>Your Free Plan Has Reached Its Limit!</h2>
                                        <div>Unlock Visafriendly's full potential with Premium—unlimited access.</div>
                                    </div>
                                    
                                </div>
                                <div className='delButtons'>
                                        <button className='cancelButPremium' onClick={closePremium}>Cancel</button>
                                        <button className='upgradeButPremium' onClick={closePremium}>Upgrade to Premium</button>
                                    </div>
                                </div>
                            )}
                            </Popup>
                        }
                        </div>
                    ))}
                    </div>
                </div>: null }
                    {lastPage>5 ? <div className="jobCardPagination">
                            <div className="paginationPrev">
                                <div  className="symbolNext" onClick={handlePrevPagination}>{prevSymbol}</div>
                                <div className="symbolText">Previous</div>
                            </div>
                            <div className="paginationPages">
                                { currentPage===1 ? <div className="clickedPagination">{currentPage}</div>
                                : 
                                <Popup trigger={<div className="clickablePagination" >{currentPage}</div>} position="center center" modal>
                                        {closePremium =>(
                                        <div className='premiumPopUp'>
                                            <img src='./images/premiumImage.png'></img>
                                        <div className="delContentButtons">
                                            <div className='delContent'>
                                                <h2>Your Free Plan Has Reached Its Limit!</h2>
                                                <div>Unlock Visafriendly's full potential with Premium—unlimited access.</div>
                                            </div>
                                            
                                        </div>
                                        <div className='delButtons'>
                                                <button className='cancelButPremium' onClick={closePremium}>Cancel</button>
                                                <button className='upgradeButPremium' onClick={closePremium}>Upgrade to Premium</button>
                                            </div>
                                        </div>
                                    )}
                                    </Popup>
                                }
                                 
                                    <Popup trigger={ <div className="clickablePagination" >{currentPage+1}</div>} position="center center" modal>
                                        {closePremium =>(
                                        <div className='premiumPopUp'>
                                            <img src='./images/premiumImage.png'></img>
                                        <div className="delContentButtons">
                                            <div className='delContent'>
                                                <h2>Your Free Plan Has Reached Its Limit!</h2>
                                                <div>Unlock Visafriendly's full potential with Premium—unlimited access.</div>
                                            </div>
                                            
                                        </div>
                                        <div className='delButtons'>
                                                <button className='cancelButPremium' onClick={closePremium}>Cancel</button>
                                                <button className='upgradeButPremium' onClick={closePremium}>Upgrade to Premium</button>
                                            </div>
                                        </div>
                                    )}
                                    </Popup>
                                    <Popup trigger={<div className="clickablePagination" >{currentPage+2}</div>} position="center center" modal>
                                        {closePremium =>(
                                        <div className='premiumPopUp'>
                                            <img src='./images/premiumImage.png'></img>
                                        <div className="delContentButtons">
                                            <div className='delContent'>
                                                <h2>Your Free Plan Has Reached Its Limit!</h2>
                                                <div>Unlock Visafriendly's full potential with Premium—unlimited access.</div>
                                            </div>
                                            
                                        </div>
                                        <div className='delButtons'>
                                                <button className='cancelButPremium' onClick={closePremium}>Cancel</button>
                                                <button className='upgradeButPremium' onClick={closePremium}>Upgrade to Premium</button>
                                            </div>
                                        </div>
                                    )}
                                    </Popup>
                                       
                                
                                {currentPage === lastPage-4 ?
                                <Popup trigger={<div className= "clickablePagination">{currentPage+3}</div>} position="center center" modal>
                                                {closePremium =>(
                                                <div className='premiumPopUp'>
                                                    <img src='./images/premiumImage.png'></img>
                                                <div className="delContentButtons">
                                                    <div className='delContent'>
                                                        <h2>Your Free Plan Has Reached Its Limit!</h2>
                                                        <div>Unlock Visafriendly's full potential with Premium—unlimited access.</div>
                                                    </div>
                                                    
                                                </div>
                                                <div className='delButtons'>
                                                        <button className='cancelButPremium' onClick={closePremium}>Cancel</button>
                                                        <button className='upgradeButPremium' onClick={closePremium}>Upgrade to Premium</button>
                                                    </div>
                                                </div>
                                            )}
                                            </Popup>
                                 
                                 :<div className="nonClickablePagination">...</div>}
                                
                                    
                                    <Popup trigger={<div  className="clickablePagination" >{lastPage}</div>} position="center center" modal>
                                        {closePremium =>(
                                        <div className='premiumPopUp'>
                                            <img src='./images/premiumImage.png'></img>
                                        <div className="delContentButtons">
                                            <div className='delContent'>
                                                <h2>Your Free Plan Has Reached Its Limit!</h2>
                                                <div>Unlock Visafriendly's full potential with Premium—unlimited access.</div>
                                            </div>
                                            
                                        </div>
                                        <div className='delButtons'>
                                                <button className='cancelButPremium' onClick={closePremium}>Cancel</button>
                                                <button className='upgradeButPremium' onClick={closePremium}>Upgrade to Premium</button>
                                            </div>
                                        </div>
                                    )}
                                    </Popup>
                           
                            </div>
                            <div className="paginationNext">
                                <div className="symbolText" >Next</div>
                                <div className="symbolNext" onClick={handleNextPagination}>{nextSymbol}</div>
                            </div>
                        </div>: null }
                    </div>
                    {jobDataFilter.length!=0 ? <JobCardExpansionFreePlan clickedJobData={clickedJobData}></JobCardExpansionFreePlan> : null}
                </div>
            </div>
        </div>
    )
}
