import React, { useEffect } from 'react';
import Papa from 'papaparse';




export function JobData(props){
    let jobListings=[];
    let jobListingsData=[];

    useEffect(()=>{
        Papa.parse("/jobDataCsv/visafriendlyjobs.csv", {
            download: true,
            header: true, 
            // worker:true, 
            skipEmptyLines :true,
            complete: function(results) {
                console.log("CSV parsing results:", results);
               
                jobListings = results.data.map((job,index) => ({
                    jId : index,
                    company: job['company_name'],
                    title: job['job_title'],
                    exp : job['years_of_experience'],
                    location: job['location'],
                    type: job['Job Type'],
                    workSetting: job['work_setting'],
                    salary: job['max_salary'],
                    startupJob: job['startup_job'],
                    date: job['job_posting_date'],
                    visaSponsoring: job['visa_sponsoring'],
                    h1Type: job['sponsor_type'],
                    applyLink: job['apply_url'],
                    responsibility: job['Responsibilities and Requirements'],
                    logo:job['Company Logo'],
                    expText : job['min_experience'],
                    smallDesc: job['Job Description'],
                    fullDesc : job['job_description'],
                    skills: job['keywords_formatted']
                }));
                jobListingsData = jobListings;
               
                props.setJobData(jobListingsData);
            },
            error: function(error) {
                console.error("CSV parsing error:", error);
            }
        });
    },[])
    
    

    return (
        <div></div>
    ); 
}
