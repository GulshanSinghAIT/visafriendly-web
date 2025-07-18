import React, { useEffect } from "react";
import { JobsAfterSignIn, JobsAfterSignInFreePlan } from "./JobsAfterSignInFreePlan";
import { JobDataFreePlan } from "./jobDataFreePlan";

export function HandlingHrefsFreePlan(){
    
    const searchUrl=window.location.pathname;
    const str = searchUrl.split("/");
    const hrefName=str.pop();
    const[jobDataFreePlan,setJobDataFreePlan]=React.useState([]);
    const [filteredJobData,setFilter]=React.useState(jobDataFreePlan);

    useEffect(()=>{
        if(hrefName === "Cap-Exempt-Jobs"){
            const newFiltered=jobDataFreePlan.filter((stat) => (
                stat.h1Type === "Cap-Exempt Jobs"
            ))
            console.log(newFiltered);
            setFilter(newFiltered);
        }
        else if(hrefName === "H-1B-Jobs"){
            const newFiltered=jobDataFreePlan.filter((stat) => (
                stat.h1Type === "H-1B Jobs"
            ))
            console.log(newFiltered);
            setFilter(newFiltered);
        }
        else{
            setFilter(jobDataFreePlan);
        }
    },[hrefName,jobDataFreePlan])
    
    console.log(hrefName);
    console.log(filteredJobData);
    return (
        <div>
            <JobDataFreePlan setJobDataFreePlan={setJobDataFreePlan}></JobDataFreePlan>
                <JobsAfterSignInFreePlan hrefName={hrefName} jobData={filteredJobData}></JobsAfterSignInFreePlan>
        </div>
    )
};
