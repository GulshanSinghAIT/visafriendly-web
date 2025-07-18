import React, { useEffect } from "react";
import { JobsAfterSignIn } from "./JobsAfterSignIn";
import { JobData } from "./jobData";

export function HandlingHrefs() {
  const searchUrl = window.location.pathname;
  const str = searchUrl.split("/");
  const hrefName = str.pop();
  const [jobData, setJobData] = React.useState([]);
  const [filteredJobData, setFilter] = React.useState(jobData);

  useEffect(() => {
    if (hrefName === "Cap-Exempt-Jobs") {
      const newFiltered = jobData.filter(
        (stat) => stat.h1Type === "Cap-Exempt Jobs"
      );

      setFilter(newFiltered);
    } else if (hrefName === "H-1B-Jobs") {
      const newFiltered = jobData.filter((stat) => stat.h1Type === "H-1B Jobs");

      setFilter(newFiltered);
    } else {
      setFilter(jobData);
    }
  }, [hrefName, jobData]);

  return (
    <div>
      <JobData setJobData={setJobData}></JobData>
      <JobsAfterSignIn
        hrefName={hrefName}
        jobData={filteredJobData}
      ></JobsAfterSignIn>
    </div>
  );
}
