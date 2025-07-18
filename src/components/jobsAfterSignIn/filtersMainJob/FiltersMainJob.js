import React, { useCallback, useEffect } from "react";
import ReactSlider from "react-slider";
import { ChevronDown } from "lucide-react";

export function FiltersMainJob( props){

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
    let filtersDrop = [false,false,false,false,false,false];
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
    const [cat,setCat] = React.useState([]);
    const [work,setWork] = React.useState([]);
    const [type,setType] = React.useState([]);
    const [h1bType,setH1bType] = React.useState([]);
    const [salary,setSalary]=React.useState([100,1000000]);
    const [exp,setExp]=React.useState([1,15]);
    const [searchJobRole,setSearchJobRole]=React.useState("");
    const [searchLocation,setSearchLocation]=React.useState("");
    const [searchJobRoles,setSearchJobRoles]=React.useState("");
    const [searchLocations,setSearchLocations]=React.useState("");

    function jobChange(e){
        const value = e.target.value;
        setSearchJobRoles(value);
        setJobSearchDrop(true);
        // Apply search immediately for better UX
        setSearchJobRole(value);
    }

    function locChange(e){
        const value = e.target.value;
        setSearchLocations(value);
        // Apply location filter immediately for better UX
        setSearchLocation(value);
    }

    // Consolidated filter function with improved partial matching
    const applyFilters = useCallback(() => {
        if (!props.jobData || props.jobData.length === 0) {
            props.setJobsFilter([]);
            return;
        }

        console.log("Applying filters:", {
            type,
            work,
            cat,
            h1bType,
            searchJobRole,
            searchLocation,
            exp,
            salary
        });

        const filteredJobs = props.jobData.filter((job) => {
            // Job type filter
            if (type.length > 0 && !type.includes(job.type)) {
                return false;
            }

            // Work setting filter
            if (work.length > 0 && !work.includes(job.workSetting)) {
                return false;
            }

            // H1B Type filter
            if (h1bType.length > 0 && job.h1bType && !h1bType.includes(job.h1bType)) {
                return false;
            }

            // Category filter with partial matching
            if (cat.length > 0) {
                const matchesCategory = cat.some(category => 
                    job.title && job.title.toLowerCase().includes(category.toLowerCase())
                );
                if (!matchesCategory) {
                    return false;
                }
            }

            // Search role/company filter with improved partial matching
            if (searchJobRole && searchJobRole.trim()) {
                const searchTerm = searchJobRole.toLowerCase().trim();
                const titleMatch = job.title && job.title.toLowerCase().includes(searchTerm);
                const companyMatch = job.company && job.company.toLowerCase().includes(searchTerm);
                
                if (!titleMatch && !companyMatch) {
                    return false;
                }
            }

            // Location filter with partial matching
            if (searchLocation && searchLocation.trim()) {
                const locationTerm = searchLocation.toLowerCase().trim();
                const locationMatch = job.location && job.location.toLowerCase().includes(locationTerm);
                
                if (!locationMatch) {
                    return false;
                }
            }

            // Experience filter
            if (job.exp !== undefined && job.exp !== null && job.exp !== '') {
                if (job.exp < exp[0] || job.exp > exp[1]) {
                    return false;
                }
            }

            // Salary filter
            if (job.salary !== undefined && job.salary !== null) {
                if (job.salary < salary[0] || job.salary > salary[1]) {
                    return false;
                }
            }

            return true;
        });

        console.log("Filtered jobs:", filteredJobs.length, "out of", props.jobData.length);
        props.setJobsFilter(filteredJobs);
    }, [props.jobData, type, work, cat, h1bType, searchJobRole, searchLocation, exp, salary, props.setJobsFilter]);

    // Single useEffect that applies filters when any filter state changes
    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // Note: Real-time filtering is now applied as user types
    // Search button provides immediate feedback for manual trigger

    function changeSearchPress(){
        // Ensure search values are applied when button is clicked
        setSearchJobRole(searchJobRoles);
        setSearchLocation(searchLocations);
        setJobSearchDrop(false); // Close dropdown if open
    }

    function changeType(index){
        const newType = props.jobTypeBool.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        props.setJobType(newType);
    }

    function typeApply(){
        const types=[];
        props.jobTypeBool.map((c,i) => {
            if(c){
                types.push(props.jobTypes[i]);
            }
        })
        setType(types);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    function typeCancel(){
        
        const newType = props.jobTypeBool.map((c,i) =>{
            return false;
        });
        props.setJobType(newType);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
        const types=[];
        newType.map((c,i) => {
            if(c){
                types.push(props.jobTypes[i]);
            }
        })
        setType(types);
    }

    function changeCats(index){
        const newType = props.jobCatsBool.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        props.setJobCats(newType);
        
    }

    function catCancel(){
        
        const newType = props.jobCatsBool.map((c,i) =>{
            return false;
        });
        props.setJobCats(newType);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
        const cats=[];
       newType.map((c,i) => {
            if(c){
                cats.push(props.jobCats[i]);
            }
        })
        setCat(cats);
    }

    function catApply(){
        
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
        const cats=[];
        props.jobCatsBool.map((c,i) => {
            if(c){
                cats.push(props.jobCats[i]);
            }
        })
        setCat(cats);
    }

    function changeWorkSet(index){
        const newType = props.workSetBool.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        props.setWorkSet(newType);
    }

    function workSetCancel(){
        
        const newType = props.workSetBool.map((c,i) =>{
            return false;
        });
        props.setWorkSet(newType);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
        const works=[];
        newType.map((c,i) => {
            if(c){
                works.push(props.workSet[i]);
            }
        })
        setWork(works);
    }

    function workSetApply(){
        const workSets=[];
        props.workSetBool.map((c,i) => {
            if(c){
                workSets.push(props.workSet[i]);
            }
        })
        setWork(workSets);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    const [jobSearchDropdown,setJobSearchDrop]=React.useState(false);

    function jobValueChange(stat){
        setSearchJobRoles(stat);
        setSearchJobRole(stat); // Apply the selected job title immediately
        setJobSearchDrop(false); // Close the dropdown
    }

    function jobDropChange(){
        setJobSearchDrop(!jobSearchDropdown);
    }

    // Add mobile dropdown close functionality
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close search dropdown when clicking outside
            if (jobSearchDropdown && !event.target.closest('.search-container')) {
                setJobSearchDrop(false);
            }
            
            // Close filter dropdowns when clicking outside on mobile
            if (window.innerWidth <= 768) {
                const isClickInsideDropdown = event.target.closest('.dropdown-content');
                const isClickOnFilterButton = event.target.closest('.filter-button');
                
                if (!isClickInsideDropdown && !isClickOnFilterButton && filterDrop.some(drop => drop)) {
                    const newDrop = filterDrop.map(() => false);
                    setFilterDrop(newDrop);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [jobSearchDropdown, filterDrop]);

    // Add escape key functionality
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setJobSearchDrop(false);
                const newDrop = filterDrop.map(() => false);
                setFilterDrop(newDrop);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [filterDrop]);

    let filteredJobTitles=allJobTitles.filter((stat) =>
        stat.toLowerCase().includes(searchJobRoles.toLowerCase())
    );

    function changeH1bType(index){
        const newH1bType = props.h1bTypeBool.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        props.setH1bType(newH1bType);
    }

    function h1bTypeCancel(){
        const newH1bType = props.h1bTypeBool.map((c,i) =>{
            return false;
        });
        props.setH1bType(newH1bType);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    function h1bTypeApply(){
        const h1bTypes=[];
        props.h1bTypeBool.map((c,i) => {
            if(c){
                h1bTypes.push(props.h1bTypes[i]);
            }
        })
        setH1bType(h1bTypes);
        const newDrop = filterDrop.map((c,i) =>{
                return false;
        });
        setFilterDrop(newDrop);
    }

    // Backdrop component for mobile
    const Backdrop = ({ isVisible, onClick }) => (
        <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-[999] transition-opacity duration-300 ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } md:hidden`}
            onClick={onClick}
        />
    );

    // Check if any dropdown is open
    const isAnyDropdownOpen = filterDrop.some(drop => drop);

    return(
        <div className="flex flex-col items-center self-stretch mx-4  max-w-[80rem] w-[96%] sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
            <div className="flex flex-col max-w-6xl mx-auto md:py-14 items-center gap-6 md:gap-7 lg:gap-8 self-stretch">
                <div className="flex items-center self-stretch rounded-2xl md:rounded-xl lg:rounded-[16px] sm:border border-gray-300 sm:bg-white  sm:shadow-xl lg:shadow flex-col sm:flex-row sm:bg-transparent  sm:border-none gap-2 md:gap-3">
                    <div className="flex w-full flex-col justify-center items-start gap-2 md:gap-3 l flex-1 border-r border-gray-300 relative px-4 md:px-5 py-4  sm:border-none  bg-white rounded-[10px] sm:px-2 sm:py-1.5 sm:min-h-[36px]">
                        <div className="flex items-center gap-3 md:gap-4 lg:gap-4 self-stretch search-container ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3">
                                <path d="M11 19.5C15.4183 19.5 19 15.9183 19 11.5C19 7.08172 15.4183 3.5 11 3.5C6.58172 3.5 3 7.08172 3 11.5C3 15.9183 6.58172 19.5 11 19.5Z" stroke="#6B7280" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21.0002 21.5012L16.7002 17.2012" stroke="#6B7280" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input 
                                onChange={jobChange} 
                                onClick={jobDropChange} 
                                type="text" 
                                placeholder="Search Role, Company" 
                                value={searchJobRoles}
                                className="w-full border-none outline-none text-gray-700 font-medium md:text-lg  text-sm  sm:py-1.5 xs:text-xs"
                            />
                        </div>
                        {jobSearchDropdown && filteredJobTitles.length!=0 && (
                            <div className="absolute z-[99] flex flex-col items-start gap-2 md:gap-3  flex-1 border border-gray-300 bg-white shadow-lg md:shadow-xl lg:shadow-[0_4px_25px_rgba(156,156,156,0.25)] rounded-b-2xl md:rounded-b-3xl lg:rounded-b-[16px] top-full left-0 right-0 px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-4 max-h-48 md:max-h-52 lg:max-h-[220px] overflow-y-auto sm:max-h-[150px] sm:max-w-none sm:left-0 sm:top-full sm:rounded-b-lg xs:max-h-[120px] transition-all duration-300 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                                {filteredJobTitles.map((stat, index) => (
                                    <div key={index} className="flex items-start self-stretch rounded-lg md:rounded-xl lg:rounded-[8px] text-black font-medium text-lg md:text-lg cursor-pointer py-2 md:py-[5px] px-2 md:px-3 lg:px-[10px] whitespace-pre-wrap hover:bg-gray-50 sm:text-sm sm:py-1.5 sm:px-1.5 xs:text-xs xs:py-1 xs:px-1" onClick={() => jobValueChange(stat)}>
                                    {stat.substring(0,stat.toLowerCase().indexOf(searchJobRoles.toLowerCase()))}
                                    <b>{stat.substring(stat.toLowerCase().indexOf(searchJobRoles.toLowerCase()),stat.toLowerCase().indexOf(searchJobRoles.toLowerCase())+searchJobRoles.length)}</b>
                                        {stat.substring(stat.toLowerCase().indexOf(searchJobRoles.toLowerCase())+searchJobRoles.length,stat.length)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex w-full flex-col justify-center items-start gap-2 md:gap-3  flex-1 px-4 md:px-5  py-4   bg-white rounded-[10px] sm:px-2 sm:py-1.5 sm:min-h-[36px]">
                        <div className="flex items-center gap-3 md:gap-4 lg:gap-4 self-stretch">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3">
                                <path d="M13.0598 21.32C12.8966 21.4372 12.7007 21.5003 12.4998 21.5003C12.2988 21.5003 12.103 21.4372 11.9398 21.32C7.11078 17.878 1.98578 10.798 7.16678 5.682C8.58912 4.28285 10.5046 3.49912 12.4998 3.5C14.4998 3.5 16.4188 4.285 17.8328 5.681C23.0138 10.797 17.8888 17.876 13.0598 21.32Z" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.5 12.5C13.0304 12.5 13.5391 12.2893 13.9142 11.9142C14.2893 11.5391 14.5 11.0304 14.5 10.5C14.5 9.96957 14.2893 9.46086 13.9142 9.08579C13.5391 8.71071 13.0304 8.5 12.5 8.5C11.9696 8.5 11.4609 8.71071 11.0858 9.08579C10.7107 9.46086 10.5 9.96957 10.5 10.5C10.5 11.0304 10.7107 11.5391 11.0858 11.9142C11.4609 12.2893 11.9696 12.5 12.5 12.5Z" stroke="#545251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input 
                                onChange={locChange} 
                                type="text" 
                                placeholder="Search Location" 
                                value={searchLocations}
                                className="w-full border-none outline-none text-gray-700 font-medium md:text-lg  text-sm sm:py-1.5 xs:text-xs"
                            />
                        </div>
                    </div>
                    <div className="flex w-full sm:w-auto items-center gap-2  md:gap-3 lg:gap-[10px] px-4  lg:px-5 py-2  lg:py-4 sm:p-2">
                        <button 
                            onClick={changeSearchPress}
                            className="flex justify-center w-full items-center gap-2 md:gap-3  px-4   py-3  rounded-xl  bg-[#313DEB] sm:p-2.5 sm:w-full sm:max-w-[98%] sm:mx-auto sm:rounded-lg xs:p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3">
                                <path d="M19.9999 20.5004L15.9499 16.4504M15.9499 16.4504C16.5999 15.8003 17.1156 15.0286 17.4674 14.1793C17.8192 13.33 18.0002 12.4197 18.0002 11.5004C18.0002 10.5811 17.8192 9.67076 17.4674 8.82144C17.1156 7.97211 16.5999 7.2004 15.9499 6.55036C15.2998 5.90031 14.5281 5.38467 13.6788 5.03287C12.8295 4.68107 11.9192 4.5 10.9999 4.5C10.0806 4.5 9.17027 4.68107 8.32095 5.03287C7.47163 5.38467 6.69991 5.90031 6.04987 6.55036C4.73705 7.86318 3.99951 9.64375 3.99951 11.5004C3.99951 13.357 4.73705 15.1375 6.04987 16.4504C7.36269 17.7632 9.14326 18.5007 10.9999 18.5007C12.8565 18.5007 14.637 17.7632 15.9499 16.4504Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="md:flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:gap-6 p-2.5 md:p-3 lg:p-[10px] grid grid-cols-2 sm:gap-1.5 sm:items-stretch xs:gap-1">
                    <div className="relative filter-button">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-[8px] px-5 md:px-6 lg:px-5 py-2.5 md:py-[10px] rounded-lg md:rounded-xl border border-gray-300 bg-white shadow-sm cursor-pointer sm:justify-between sm:rounded-lg xs:px-3 xs:py-2 transition-all duration-200 ease-in-out hover:shadow-md" onClick={() => changeFilterDrop(0)}>
                            <div className="flex flex-col items-start gap-1 md:gap-2 lg:gap-[4px] cursor-pointer">
                                <div className="text-black text-center font-medium text-base md:text-lg lg:text-base whitespace-nowrap sm:text-sm xs:text-xs">Job Category</div>
                            </div>
                            <ChevronDown 
                                size={16} 
                                className={`w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 transition-transform duration-200 ${filterDrop[0] ? 'rotate-180' : ''}`} 
                            />
                        </div>
                        {filterDrop[0] && (
                            <div className="absolute z-[1000] flex flex-col items-start bg-white border border-gray-200 rounded-xl md:rounded-2xl lg:rounded-[12px] shadow-lg w-72 md:w-80 lg:w-[342px] pt-2 md:pt-3 lg:pt-[8px] md:top-full md:left-0 md:mt-2 max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:w-[90%] max-md:max-w-sm max-md:max-h-[80vh] max-md:overflow-y-auto max-md:z-[1001] dropdown-content transition-all duration-300 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                                <div className="flex items-start self-stretch px-5 md:px-6 lg:px-5 py-2 md:py-3 lg:py-[8px] text-gray-500 font-medium text-sm md:text-[16px] tracking-wide relative">
                                    Job Category
                                        <button 
                                            onClick={() => {
                                                const newDrop = filterDrop.map(() => false);
                                                setFilterDrop(newDrop);
                                            }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer bg-none border-none md:hidden"
                                        >
                                            ×
                                        </button>
                                </div>
                                {props.jobCats.map((c,i) => (
                                    <div key={i} className="flex items-center gap-3  self-stretch px-5 md:px-6 lg:px-5 py-2.5 md:py-2  hover:bg-gray-50 transition-colors duration-150">
                                        <input 
                                            type="checkbox" 
                                            checked={props.jobCatsBool[i]} 
                                            onChange={() => changeCats(i)}
                                            className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-3 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <div className="text-gray-800 font-medium text-base  leading-tight tracking-wide max-md:text-sm">{c}</div>
                                        </div>
                                ))}
                                <div className="flex w-full justify-end items-center gap-4 md:gap-5 lg:gap-[32px] px-4 md:px-5 lg:px-[20px] py-4 md:py-5 lg:py-[16px] border-t border-gray-300">
                                    <div className="flex items-start gap-2 md:gap-3 lg:gap-[10px]">
                                        <button 
                                            onClick={catCancel}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] border border-gray-200 bg-white shadow-sm text-gray-700 font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={catApply}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] bg-[#313DEB] text-white font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-[#2830D6] transition-colors duration-150"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative filter-button">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-[8px] px-5 md:px-6 lg:px-5 py-2.5 md:py-[10px] rounded-lg md:rounded-xl border border-gray-300 bg-white shadow-sm cursor-pointer sm:justify-between sm:rounded-lg xs:px-3 xs:py-2 transition-all duration-200 ease-in-out hover:shadow-md" onClick={() => changeFilterDrop(5)}>
                            <div className="flex flex-col items-start gap-1 md:gap-2 lg:gap-[4px] cursor-pointer">
                                <div className="text-black text-center font-medium text-base md:text-lg lg:text-base whitespace-nowrap sm:text-sm xs:text-xs">H1B Type</div>
                            </div>
                            <ChevronDown 
                                size={16} 
                                className={`w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 transition-transform duration-200 ${filterDrop[5] ? 'rotate-180' : ''}`} 
                            />
                        </div>
                        {filterDrop[5] && (
                            <div className="absolute z-[1000] flex flex-col items-start bg-white border border-gray-200 rounded-xl md:rounded-2xl lg:rounded-[12px] shadow-lg w-60 md:w-72 lg:w-[285px] pt-2 md:pt-3 lg:pt-[8px] md:top-full md:left-0 md:mt-2 max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:w-[90%] max-md:max-w-sm max-md:max-h-[80vh] max-md:overflow-y-auto max-md:z-[1001] dropdown-content transition-all duration-300 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                                <div className="flex items-start self-stretch px-5 md:px-6 lg:px-5 py-2 md:py-3 lg:py-[8px] text-gray-500 font-medium text-sm md:text-[16px] tracking-wide relative">
                                     H1B TYPE
                                         <button 
                                             onClick={() => {
                                                 const newDrop = filterDrop.map(() => false);
                                                 setFilterDrop(newDrop);
                                             }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer bg-none border-none md:hidden"
                                         >
                                             ×
                                         </button>
                                </div>
                                {props.h1bTypes.map((c,i) => (
                                    <div key={i} className="flex items-center gap-2.5 md:gap-3 lg:gap-[10px] self-stretch px-5 md:px-6 lg:px-5 py-2.5 md:py-2 hover:bg-gray-50 transition-colors duration-150">
                                        <input 
                                            type="checkbox" 
                                            checked={props.h1bTypeBool[i]} 
                                            onChange={() => changeH1bType(i)}
                                            className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-3 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <div className="text-gray-800 font-medium text-base  leading-tight tracking-wide max-md:text-sm">{c}</div>
                                 </div>
                                ))}
                                <div className="flex w-full justify-end items-center gap-4 md:gap-5 lg:gap-[32px] px-4 md:px-5 lg:px-[20px] py-4 md:py-5 lg:py-[16px] border-t border-gray-300">
                                    <div className="flex items-start gap-2 md:gap-3 lg:gap-[10px]">
                                        <button 
                                            onClick={h1bTypeCancel}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] border border-gray-200 bg-white shadow-sm text-gray-700 font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={h1bTypeApply}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] bg-[#313DEB] text-white font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-[#2830D6] transition-colors duration-150"
                                        >
                                            Apply
                                        </button>
                                         </div>
                                         </div>
                                     </div>
                        )}
                    </div>
                    <div className="relative filter-button">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-[8px] px-5 md:px-6 lg:px-5 py-2.5 md:py-[10px] rounded-lg md:rounded-xl border border-gray-300 bg-white shadow-sm cursor-pointer sm:justify-between sm:rounded-lg xs:px-3 xs:py-2 transition-all duration-200 ease-in-out hover:shadow-md" onClick={() => changeFilterDrop(1)}>
                            <div className="flex flex-col items-start gap-1 md:gap-2 lg:gap-[4px] cursor-pointer">
                                <div className="text-black text-center font-medium text-base md:text-lg lg:text-base whitespace-nowrap sm:text-sm xs:text-xs">Job Type</div>
                            </div>
                            <ChevronDown 
                                size={16} 
                                className={`w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 transition-transform duration-200 ${filterDrop[1] ? 'rotate-180' : ''}`} 
                            />
                        </div>
                        {filterDrop[1] && (
                            <div className="absolute z-[1000] flex flex-col items-start bg-white border border-gray-200 rounded-xl md:rounded-2xl lg:rounded-[12px] shadow-lg w-52 md:w-60 lg:w-[242px] pt-2 md:pt-3 lg:pt-[8px] md:top-full md:left-0 md:mt-2 max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:w-[90%] max-md:max-w-sm max-md:max-h-[80vh] max-md:overflow-y-auto max-md:z-[1001] dropdown-content transition-all duration-300 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                                <div className="flex items-start self-stretch px-5 md:px-6 lg:px-5 py-2 md:py-3 lg:py-[8px] text-gray-500 font-medium text-sm md:text-[16px] tracking-wide relative">
                                    Job Type
                                        <button 
                                            onClick={() => {
                                                const newDrop = filterDrop.map(() => false);
                                                setFilterDrop(newDrop);
                                            }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer bg-none border-none md:hidden"
                                        >
                                            ×
                                        </button>
                                </div>
                                {props.jobTypes.map((c,i) => (
                                    <div key={i} className="flex items-center gap-2.5 md:gap-3 lg:gap-[10px] self-stretch px-5 md:px-6 lg:px-5 py-2.5 md:py-2 hover:bg-gray-50 transition-colors duration-150">
                                        <input 
                                            type="checkbox" 
                                            checked={props.jobTypeBool[i]} 
                                            onChange={() => changeType(i)}
                                            className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-3 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <div className="text-gray-800 font-medium text-base leading-tight tracking-wide max-md:text-sm">{c}</div>
                                        </div>
                                ))}
                                <div className="flex w-full justify-end items-center gap-4 md:gap-5 lg:gap-[32px] px-4 md:px-5 lg:px-[20px] py-4 md:py-5 lg:py-[16px] border-t border-gray-300">
                                    <div className="flex items-start gap-2 md:gap-3 lg:gap-[10px]">
                                        <button 
                                            onClick={typeCancel}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] border border-gray-200 bg-white shadow-sm text-gray-700 font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={typeApply}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] bg-[#313DEB] text-white font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-[#2830D6] transition-colors duration-150"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative filter-button">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-[8px] px-5 md:px-6 lg:px-5 py-2.5 md:py-[10px]rounded-lg md:rounded-xl border border-gray-300 bg-white shadow-sm cursor-pointer sm:justify-between sm:rounded-lg xs:px-3 xs:py-2 transition-all duration-200 ease-in-out hover:shadow-md" onClick={() => changeFilterDrop(2)}>
                            <div className="flex flex-col items-start gap-1 md:gap-2 lg:gap-[4px] cursor-pointer">
                                <div className="text-black text-center font-medium text-base md:text-lg lg:text-base whitespace-nowrap sm:text-sm xs:text-xs">Work Setting</div>
                            </div>
                            <ChevronDown 
                                size={16} 
                                className={`w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 transition-transform duration-200 ${filterDrop[2] ? 'rotate-180' : ''}`} 
                            />
                        </div>
                        {filterDrop[2] && (
                            <div className="absolute z-[1000] flex flex-col items-start bg-white border border-gray-200 rounded-xl md:rounded-2xl lg:rounded-[12px] shadow-lg w-60 md:w-72 lg:w-[285px] pt-2 md:pt-3 lg:pt-[8px] md:top-full md:left-0 md:mt-2 max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:w-[90%] max-md:max-w-sm max-md:max-h-[80vh] max-md:overflow-y-auto max-md:z-[1001] dropdown-content transition-all duration-300 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                                <div className="flex items-start self-stretch px-5 md:px-6 lg:px-5 py-2 md:py-3 lg:py-[8px] text-gray-500 font-medium text-sm md:text-[16px] tracking-wide relative">
                                    WORK SETTING
                                        <button 
                                            onClick={() => {
                                                const newDrop = filterDrop.map(() => false);
                                                setFilterDrop(newDrop);
                                            }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer bg-none border-none md:hidden"
                                        >
                                            ×
                                        </button>
                                </div>
                                {props.workSet.map((c,i) => (
                                    <div key={i} className="flex items-center gap-2.5 md:gap-3 lg:gap-[10px] self-stretch px-5 md:px-6 lg:px-5 py-2.5 md:py-2 hover:bg-gray-50 transition-colors duration-150">
                                        <input 
                                            type="checkbox" 
                                            checked={props.workSetBool[i]} 
                                            onChange={() => changeWorkSet(i)}
                                            className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-3 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <div className="text-gray-800 font-medium text-base  leading-tight tracking-wide max-md:text-sm">{c}</div>
                                        </div>
                                ))}
                                <div className="flex w-full justify-end items-center gap-4 md:gap-5 lg:gap-[32px] px-4 md:px-5 lg:px-[20px] py-4 md:py-5 lg:py-[16px] border-t border-gray-300">
                                    <div className="flex items-start gap-2 md:gap-3 lg:gap-[10px]">
                                        <button 
                                            onClick={workSetCancel}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] border border-gray-200 bg-white shadow-sm text-gray-700 font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={workSetApply}
                                            className="flex justify-center items-center gap-2 md:gap-3 lg:gap-[8px] px-2.5 md:px-3 lg:px-[10px] py-2 md:py-2.5 lg:py-[10px] rounded-lg md:rounded-xl lg:rounded-[8px] bg-[#313DEB] text-white font-semibold text-sm md:text-base lg:text-[15px] tracking-wide hover:bg-[#2830D6] transition-colors duration-150"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative filter-button">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-[8px] px-5 md:px-6 lg:px-5 py-2.5 md:py-[10px] rounded-lg md:rounded-xl border border-gray-300 bg-white shadow-sm cursor-pointer sm:justify-between sm:rounded-lg xs:px-3 xs:py-2 transition-all duration-200 ease-in-out hover:shadow-md" onClick={() => changeFilterDrop(3)}>
                            <div className="flex flex-col items-start gap-1 md:gap-2 lg:gap-[4px] cursor-pointer">
                                <div className="text-black text-center font-medium text-base md:text-lg lg:text-base whitespace-nowrap sm:text-sm xs:text-xs">Salary Range</div>
                            </div>
                            <ChevronDown 
                                size={16} 
                                className={`w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 transition-transform duration-200 ${filterDrop[3] ? 'rotate-180' : ''}`} 
                            />
                        </div>
                        {filterDrop[3] && (
                            <div className="absolute z-[1000] flex flex-col items-start bg-white border border-gray-200 rounded-xl md:rounded-2xl lg:rounded-[12px] shadow-lg w-72 md:w-80 lg:w-[349px] pt-2 md:pt-3 lg:pt-[8px] pb-2 md:pb-3 lg:pb-[8px] md:top-full md:left-0 md:mt-2 max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:w-[90%] max-md:max-w-sm max-md:max-h-[80vh] max-md:overflow-y-auto max-md:z-[1001] dropdown-content transition-all duration-300 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                                <div className="flex items-start self-stretch px-5 md:px-6 lg:px-5 py-2 md:py-3 lg:py-[8px] text-gray-500 font-medium text-sm md:text-[16px] tracking-wide relative">
                                    SALARY RANGE
                                        <button 
                                            onClick={() => {
                                                const newDrop = filterDrop.map(() => false);
                                                setFilterDrop(newDrop);
                                            }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer bg-none border-none md:hidden"
                                        >
                                            ×
                                        </button>
                                </div>
                                <div className="flex w-full flex-col items-center gap-4 md:gap-5 lg:gap-[16px] px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-[16px] rounded-lg md:rounded-xl lg:rounded-[12px]">
                                    <div className="w-full max-w-xs md:max-w-sm lg:max-w-[320px] px-2">
                                        <ReactSlider 
                                            className="w-full h-2 md:h-2.5 lg:h-[8px] rounded-full bg-gray-200 slider relative"
                                            thumbClassName="w-5 relative -bottom-2 h-5 md:w-6 md:h-6 lg:w-[20px] lg:h-[20px] rounded-full bg-white border-2 border-[#313DEB] cursor-grab focus:outline-none focus:ring-4 focus:ring-[#313DEB]/20 thumb transition-all duration-200 ease-out shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
                                            trackClassName="h-2 md:h-2.5 lg:h-[8px] rounded-full track"
                                            min={100} 
                                            max={2000000} 
                                            value={salary} 
                                            onChange={setSalary}
                                            renderTrack={(props, state) => (
                                                <div {...props} className={`${props.className} ${
                                                    state.index === 1 
                                                        ? 'bg-gradient-to-r from-[#313DEB] to-[#4F46E5] shadow-md' 
                                                        : 'bg-gray-200'
                                                } transition-all duration-200 ease-out rounded-full`} />
                                            )}
                                            renderThumb={(props, state) => (
                                                <div {...props} className={`${props.className} group relative`}>
                                                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-[#313DEB] text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                                        ${state.valueNow.toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-2 w-full">
                                        <div className="text-gray-600 font-medium text-sm md:text-base lg:text-[14px] tracking-wide">
                                            Salary Range
                                        </div>
                                        <div className="flex items-center gap-3 rounded-lg ">
                                            <div className="text-[#313DEB] font-semibold text-lg md:text-[16px] tracking-wide">
                                                ${salary[0].toLocaleString()}
                                            </div>
                                            <div className="text-gray-400 font-medium">-</div>
                                            <div className="text-[#313DEB] font-semibold text-lg md:text-[16px] tracking-wide">
                                                ${salary[1].toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               </div>
                        )}
                    </div>
                    <div className="relative filter-button">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-[8px] px-5 md:px-6 lg:px-5 py-2.5 md:py-[10px] rounded-lg md:rounded-xl border border-gray-300 bg-white shadow-sm cursor-pointer sm:justify-between sm:rounded-lg xs:px-3 xs:py-2 transition-all duration-200 ease-in-out hover:shadow-md" onClick={() => changeFilterDrop(4)}>
                            <div className="flex flex-col items-start gap-1 md:gap-2 lg:gap-[4px] cursor-pointer">
                                <div className="text-black text-center font-medium text-base md:text-lg lg:text-base whitespace-nowrap sm:text-sm xs:text-xs">Experience</div>
                            </div>
                            <ChevronDown 
                                size={16} 
                                className={`w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 transition-transform duration-200 ${filterDrop[4] ? 'rotate-180' : ''}`} 
                            />
                        </div>
                        {filterDrop[4] && (
                            <div className="absolute z-[1000] flex flex-col items-start bg-white border border-gray-200 rounded-lg md:rounded-xl  shadow-lg w-72  pt-2 md:pt-3 lg:pt-[8px] pb-2 md:pb-3 lg:pb-[8px] md:top-full md:left-0 md:mt-2 max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:w-[90%] max-md:max-w-sm max-md:max-h-[80vh] max-md:overflow-y-auto max-md:z-[1001] dropdown-content transition-all duration-300 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                                <div className="flex items-start self-stretch px-5 md:px-6 lg:px-5 py-2 md:py-3 lg:py-[8px] text-gray-500 font-medium text-sm md:text-[16px] tracking-wide relative">
                                    EXPERIENCE LEVEL
                                        <button 
                                            onClick={() => {
                                                const newDrop = filterDrop.map(() => false);
                                                setFilterDrop(newDrop);
                                            }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer bg-none border-none md:hidden"
                                        >
                                            ×
                                        </button>
                                </div>
                                <div className="flex w-full flex-col items-center gap-4 md:gap-5 lg:gap-[16px] px-2 md:px-5 py-4 md:py-5 lg:py-[16px] rounded-lg md:rounded-xl lg:rounded-[12px]">
                                    <div className="w-full max-w-xs md:max-w-sm lg:max-w-[320px] px-2">
                                        <ReactSlider 
                                            className="w-full h-2 md:h-2.5 lg:h-[8px] rounded-full bg-gray-200 slider relative"
                                            thumbClassName="w-5 h-5 md:w-6 -bottom-2 md:h-6 lg:w-[20px] lg:h-[20px] rounded-full bg-white border-2 border-[#313DEB] cursor-grab focus:outline-none focus:ring-4 focus:ring-[#313DEB]/20 thumb transition-all duration-200 ease-out shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
                                            trackClassName="h-2 md:h-2.5 lg:h-[8px] rounded-full track"
                                            min={1} 
                                            max={30} 
                                            value={exp} 
                                            onChange={setExp}
                                            renderTrack={(props, state) => (
                                                <div {...props} className={`${props.className} ${
                                                    state.index === 1 
                                                        ? 'bg-gradient-to-r from-[#313DEB] to-[#4F46E5] shadow-md' 
                                                        : 'bg-gray-200'
                                                } transition-all duration-200 ease-out rounded-full`} />
                                            )}
                                            renderThumb={(props, state) => (
                                                <div {...props} className={`${props.className} group relative`}>
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#313DEB] text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                                        {state.valueNow} {state.valueNow === 1 ? 'year' : 'years'}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-2 w-full">
                                        <div className="text-gray-600 font-medium text-sm md:text-base lg:text-[14px] tracking-wide">
                                            Experience Level
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-[#313DEB] font-semibold text-lg md:text-[16px] tracking-wide">
                                                {exp[0]} {exp[0] === 1 ? 'year' : 'years'}
                                            </div>
                                            <div className="text-gray-400 font-medium">-</div>
                                            <div className="text-[#313DEB] font-semibold text-lg md:text-[16px] tracking-wide">
                                                {exp[1]} {exp[1] === 1 ? 'year' : 'years'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Backdrop for mobile dropdowns */}
            <Backdrop 
                isVisible={isAnyDropdownOpen}
                onClick={() => {
                    const newDrop = filterDrop.map(() => false);
                    setFilterDrop(newDrop);
                }}
            />
        </div>
    )
}
