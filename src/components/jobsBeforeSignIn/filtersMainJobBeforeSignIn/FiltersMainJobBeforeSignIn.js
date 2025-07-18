import React, { useCallback, useEffect } from "react";
import styles from "./FiltersMainJobBeforeSignIn.module.css"
import ReactSlider from "react-slider";

export function FiltersMainJobBeforeSignIn(){
    const [jobCatsBool,setJobCats]=React.useState([false,false,false,false,false,false,false,false]);
    const [jobTypeBool,setJobType]=React.useState([false,false,false,false]);
    const [workSetBool,setWorkSet]=React.useState([false,false,false]);
    const jobCats=["Engineering(Software)", "Data Science & Analytics","Data Engineering" ,"AI & ML","Business Analytics & BI","UI/UX & Design","Product Management","Other IT"];
    const jobTypes=["Full-Time","Part-Time","Contract","Internship"];
    const workSet=["Onsite","Hybrid","Remote"];

    let swJobTitles=[ "Software Engineer", "Software Developer", "Developer", "Software Development Engineer", "Full Stack Developer", "Frontend Engineer",
        "Backend Engineer", "Web Developer", "Mobile Developer (iOS/Android)", "Embedded Software Engineer",
        "Firmware Engineer", "API Developer", "Game Developer", "Graphics Engineer",
        "Virtual Reality (VR) Engineer", "Augmented Reality (AR) Engineer", "Blockchain Developer",
        "Smart Contract Developer", "Systems Engineer", "Software Architect",
        "Software Development Engineer in Test (SDET)", "Test Automation Engineer", "Quality Engineer", "QA Engineer", "Test Engineer" ];
    let dsJobTitles = ["Data Scientist", "Data Analyst", "Analyst", "Statistician",
    "Applied Scientist", "Decision Scientist", "Quantitative Analyst (Quant)", "Statistical Analyst",
    "Predictive Analytics Specialist", "Marketing Data Analyst", "Customer Insights Analyst",
    "Risk Analyst", "Fraud Analyst"]
    let dataEngineerJobTitles=[ "Data Engineer", "Big Data Engineer", "ETL Developer", "Database Engineer",
    "Cloud Data Engineer", "Data Pipeline Engineer", "Data Warehouse Engineer",
    "Data Infrastructure Engineer", "Analytics Engineer", "Hadoop Engineer"];
    let mlAIJobTitles=["Machine Learning Engineer", "AI Engineer", "Research Scientist", "AI Researcher", "Deep Learning Engineer",
    "NLP Engineer", "Speech Recognition Engineer", "Computer Vision Engineer",
    "Reinforcement Learning Engineer", "AI Ethics Researcher", "AI Product Manager"];
    let bAJobTitles=["Business Analyst", "Financial Analyst",
    "Product Analyst", "Operations Analyst", "Marketing Analyst", "Sales Analyst",
    "Supply Chain Analyst", "Growth Analyst"];
    let bIJobTitles=["Business Intelligence Analyst", "Business Intelligence Engineer", "Business Intelligence Developer", "BI Engineer", "BI Consultant", "Data Visualization Engineer",
    "Reporting Analyst", "Tableau Developer", "Power BI Developer", "Looker Developer"];
    let designJobTitles=["UX Designer", "UI Designer", "UI/UX Designer", "Product Designer", "Visual Designer", "UX Researcher",
    "Interaction Designer", "Motion Designer", "UX Writer", "Design Systems Engineer"];
    let pMJobTitles=[    "Product Manager (PM)", "Technical Product Manager (TPM)", "AI Product Manager",
        "Data Product Manager", "Growth Product Manager", "Platform Product Manager",
        "Product Operations Manager", "Product Owner"];
    let cloudJobTitles=["Cloud Engineer", "Cloud Solutions Architect", "Cloud Security Engineer",
    "DevOps Engineer", "Site Reliability Engineer (SRE)", "Kubernetes Engineer",
    "Platform Engineer", "Infrastructure Engineer"];
    let securityJobTitles=["Security Engineer", "Cybersecurity Analyst", "Security Operations Center (SOC) Analyst",
    "Penetration Tester (Ethical Hacker)", "Application Security Engineer", "Cloud Security Architect",
    "Cryptography Engineer", "Identity & Access Management (IAM) Engineer"];
    let otherITJobTitles=["IT Support Engineer", "IT Systems Administrator", "IT Business Analyst",
    "IT Project Manager", "ERP Consultant (SAP, Oracle, Workday)", "Salesforce Developer",
    "Salesforce Administrator", "Salesforce Consultant", "ServiceNow Developer",
    "ServiceNow Administrator"];
    let allJobTitles=swJobTitles.concat(otherITJobTitles).concat(securityJobTitles).concat(cloudJobTitles).concat(pMJobTitles)
    .concat(designJobTitles).concat(bIJobTitles).concat(bAJobTitles).concat(mlAIJobTitles).concat(dataEngineerJobTitles).concat(dsJobTitles);
    let filtersDrop = [false,false,false,false,false];
    const [filterDrop,setFilterDrop] =React.useState(filtersDrop);

    function changeFilterDrop(index){
        const newDrop = filterDrop.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return false;
            }
        });
        setFilterDrop(newDrop);

    }
    const [salary,setSalary]=React.useState([100,1000000]);
    const [exp,setExp]=React.useState([1,15]);
    const [searchJobRole,setSearchJobRole]=React.useState("");
    const [searchLocation,setSearchLocation]=React.useState("");
    const [searchJobRoles,setSearchJobRoles]=React.useState("");
    const [searchLocations,setSearchLocations]=React.useState("");
    const [searchButtonPress,setButtonPress] =React.useState(false);

    function jobChange(e){
        console.log(searchButtonPress);
        setSearchJobRoles(e.target.value);
        setJobSearchDrop(true);
    }

    function locChange(e){
        setSearchLocations(e.target.value);
    }


    function changeSearchPress(){
        setButtonPress(true);
        setSearchJobRole(searchJobRoles);
        setSearchLocation(searchLocations);
    }



    function changeType(index){
        const newType = jobTypeBool.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        setJobType(newType);
    }

    function typeApply(){
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    function typeCancel(){
        
        const newType = jobTypeBool.map((c,i) =>{
            return false;
        });
        setJobType(newType);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    function changeCats(index){
        const newType = jobCatsBool.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        setJobCats(newType);
    }

    function catCancel(){
        
        const newType = jobCatsBool.map((c,i) =>{
            return false;
        });
        setJobCats(newType);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    function catApply(){
        
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    function changeWorkSet(index){
        const newType = workSetBool.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        setWorkSet(newType);
    }

    function workSetCancel(){
        
        const newType = workSetBool.map((c,i) =>{
            return false;
        });
        setWorkSet(newType);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    function workSetApply(){
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    const [jobSearchDropdown,setJobSearchDrop]=React.useState(false);

    function jobValueChange(stat){
        setSearchJobRoles(stat)
        setJobSearchDrop(!jobSearchDropdown);
    }

    function jobDropChange(){
        setJobSearchDrop(!jobSearchDropdown);
    }

    let filteredJobTitles=allJobTitles.filter((stat) =>
        stat.toLowerCase().includes(searchJobRoles.toLowerCase())
    );

     

    return(
        <div className={styles.allFilters}>
            <div className={styles.allTypeFilters}>
                <div className={styles.searchFilters}>
                    <div className={styles.companyRoleSearch}>
                        <div className={styles.companyRoleSearchInner}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M11 19.5C15.4183 19.5 19 15.9183 19 11.5C19 7.08172 15.4183 3.5 11 3.5C6.58172 3.5 3 7.08172 3 11.5C3 15.9183 6.58172 19.5 11 19.5Z" stroke="#6B7280" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21.0002 21.5012L16.7002 17.2012" stroke="#6B7280" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input onChange={jobChange} onClick={jobDropChange} type="text" placeholder="Search Role, Company" value={searchJobRoles}></input>
                        </div>
                       {jobSearchDropdown && filteredJobTitles.length!=0 &&  <div className={styles.searchDropDown}>
                            {filteredJobTitles.map((stat) => (
                               <div className={styles.searchDropDownRow} onClick={jobValueChange.bind(this,stat)}>
                                    {stat.substring(0,stat.toLowerCase().indexOf(searchJobRoles.toLowerCase()))}
                                    <b>{stat.substring(stat.toLowerCase().indexOf(searchJobRoles.toLowerCase()),stat.toLowerCase().indexOf(searchJobRoles.toLowerCase())+searchJobRoles.length)}</b>
                                    {stat.substring(stat.toLowerCase().indexOf(searchJobRoles.toLowerCase())+searchJobRoles.length,stat.length)}</div>
                            )) 
                            }
                            </div>
                        }
                    </div>
                    <div className={styles.companyRoleSearch}>
                        <div className={styles.companyRoleSearchInner}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M13.0598 21.32C12.8966 21.4372 12.7007 21.5003 12.4998 21.5003C12.2988 21.5003 12.103 21.4372 11.9398 21.32C7.11078 17.878 1.98578 10.798 7.16678 5.682C8.58912 4.28285 10.5046 3.49912 12.4998 3.5C14.4998 3.5 16.4188 4.285 17.8328 5.681C23.0138 10.797 17.8888 17.876 13.0598 21.32Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.5 12.5C13.0304 12.5 13.5391 12.2893 13.9142 11.9142C14.2893 11.5391 14.5 11.0304 14.5 10.5C14.5 9.96957 14.2893 9.46086 13.9142 9.08579C13.5391 8.71071 13.0304 8.5 12.5 8.5C11.9696 8.5 11.4609 8.71071 11.0858 9.08579C10.7107 9.46086 10.5 9.96957 10.5 10.5C10.5 11.0304 10.7107 11.5391 11.0858 11.9142C11.4609 12.2893 11.9696 12.5 12.5 12.5Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input onChange={locChange} type="text" placeholder="United States"></input>
                        </div>
                    </div>
                    <div className={styles.searchButtonJobs}>
                        <button onClick={changeSearchPress}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M19.9999 20.5004L15.9499 16.4504M15.9499 16.4504C16.5999 15.8003 17.1156 15.0286 17.4674 14.1793C17.8192 13.33 18.0002 12.4197 18.0002 11.5004C18.0002 10.5811 17.8192 9.67076 17.4674 8.82144C17.1156 7.97211 16.5999 7.2004 15.9499 6.55036C15.2998 5.90031 14.5281 5.38467 13.6788 5.03287C12.8295 4.68107 11.9192 4.5 10.9999 4.5C10.0806 4.5 9.17027 4.68107 8.32095 5.03287C7.47163 5.38467 6.69991 5.90031 6.04987 6.55036C4.73705 7.86318 3.99951 9.64375 3.99951 11.5004C3.99951 13.357 4.73705 15.1375 6.04987 16.4504C7.36269 17.7632 9.14326 18.5007 10.9999 18.5007C12.8565 18.5007 14.637 17.7632 15.9499 16.4504Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={styles.dropDownFilters}>
                    <div className={styles.jobFilterDrop}>
                    <div className={styles.dropDownMain} onClick={changeFilterDrop.bind(this,0)}>
                        <div className={styles.dropDownFilterText}>
                            <div>Job Category</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[0] && 
                            (<div className={styles.multiSelectDrop}>
                                <div className={styles.dropDownCatName}>Job Category</div>
                                {
                                    jobCats.map((c,i) => (
                                        <div className={styles.dropDownCatNames}>
                                            <input type="checkbox"  className={styles.check} checked={jobCatsBool[i]} onChange={changeCats.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                    
                                }
                                <div className={styles.applyButton}>
                                        <div className={styles.buttonGroup}>
                                            <button className={styles.buttonGroupCancel} onClick={catCancel}>Cancel</button>
                                            <button className={styles.buttonGroupApply} onClick={catApply}>Apply</button>
                                        </div>
                                    </div>
                            </div>)
                        }
                    </div>
                    <div className={styles.jobFilterDrop}>
                    <div className={styles.dropDownMain} onClick={changeFilterDrop.bind(this,1)}>
                        <div className={styles.dropDownFilterText}>
                            <div>Job Type</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[1] && 
                            (<div className={styles.multiSelectTypeDrop}>
                                <div className={styles.dropDownCatName}>Job Type</div>
                                {
                                    jobTypes.map((c,i) => (
                                        <div className={styles.dropDownCatNames}>
                                            <input type="checkbox"  className={styles.check} checked={jobTypeBool[i]} onChange={changeType.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                }
                                <div className={styles.applyButton}>
                                        <div className={styles.buttonGroup}>
                                            <button className={styles.buttonGroupCancel} onClick={typeCancel}>Cancel</button>
                                            <button className={styles.buttonGroupApply} onClick={typeApply}>Apply</button>
                                        </div>
                                    </div>
                            </div>)
                        }
                    </div>
                    <div className={styles.jobFilterDrop}>
                    <div className={styles.dropDownMain} onClick={changeFilterDrop.bind(this,2)}>
                        <div className={styles.dropDownFilterText}>
                            <div>Work Setting</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[2] && 
                            (<div className={styles.multiSelectSetDrop}>
                                <div className={styles.dropDownCatName}>WORK SETTING</div>
                                {
                                    workSet.map((c,i) => (
                                        <div className={styles.dropDownCatNames}>
                                            <input type="checkbox"  className={styles.check}  checked={workSetBool[i]} onChange={changeWorkSet.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                }
                                <div className={styles.applyButton}>
                                        <div className={styles.buttonGroup}>
                                            <button className={styles.buttonGroupCancel} onClick={workSetCancel}>Cancel</button>
                                            <button className={styles.buttonGroupApply} onClick={workSetApply}>Apply</button>
                                        </div>
                                    </div>
                            </div>)
                        }
                    </div>
                    <div className={styles.jobFilterDrop}>
                    <div className={styles.dropDownMain} onClick={changeFilterDrop.bind(this,3)}>
                        <div className={styles.dropDownFilterText}>
                            <div>Salary Range</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[3] && 
                            (<div className={styles.multiSelectSalaryDrop}>
                                <div className={styles.dropDownCatName}>SALARY RANGE</div>
                                <div className="sliders">
                               <ReactSlider trackclassName="exampleTrack" min={100} max={2000000} value={salary} onChange={setSalary}></ReactSlider>
                               <div className={styles.slidersTextRange}>${salary[0]} - ${salary[1]}</div>
                               </div>
                            </div>)
                        }
                    </div>
                    <div className={styles.jobFilterDrop}>
                    <div className={styles.dropDownMain} onClick={changeFilterDrop.bind(this,4)}>
                        <div className={styles.dropDownFilterText}>
                            <div>Experience</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[4] && 
                            (<div className={styles.multiSelectSalaryDrop}>
                                <div className={styles.dropDownCatName}>EXPERIENCE LEVEL</div>
                                <div className="sliders">
                               <ReactSlider trackclassName="exampleTrack" min={1} max={30} value={exp} onChange={setExp}></ReactSlider>
                               <div className={styles.slidersTextRange}>{exp[0]} - {exp[1]}</div>
                               </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
