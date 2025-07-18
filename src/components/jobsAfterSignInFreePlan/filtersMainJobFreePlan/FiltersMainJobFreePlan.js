import React, { useCallback, useEffect } from "react";
import "./FiltersMainJobFreePlan.css"
import ReactSlider from "react-slider";
import Popup from "reactjs-popup";

export function FiltersMainJobFreePlan( props){
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



    return(
        <div className="allFilters">
            <div className="filterHead">VisaFriendly Opportunities – Unlock Exclusive Access</div>
            <div className="allTypeFilters">
                <div className="searchFilters">
                    <div className="companyRoleSearch">
                        <div className="companyRoleSearchInner">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M11 19.5C15.4183 19.5 19 15.9183 19 11.5C19 7.08172 15.4183 3.5 11 3.5C6.58172 3.5 3 7.08172 3 11.5C3 15.9183 6.58172 19.5 11 19.5Z" stroke="#6B7280" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21.0002 21.5012L16.7002 17.2012" stroke="#6B7280" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input  type="text" placeholder="Search Role, Company"></input>
                        </div>
                    </div>
                    <div className="companyRoleSearch">
                        <div className="companyRoleSearchInner">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M13.0598 21.32C12.8966 21.4372 12.7007 21.5003 12.4998 21.5003C12.2988 21.5003 12.103 21.4372 11.9398 21.32C7.11078 17.878 1.98578 10.798 7.16678 5.682C8.58912 4.28285 10.5046 3.49912 12.4998 3.5C14.4998 3.5 16.4188 4.285 17.8328 5.681C23.0138 10.797 17.8888 17.876 13.0598 21.32Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.5 12.5C13.0304 12.5 13.5391 12.2893 13.9142 11.9142C14.2893 11.5391 14.5 11.0304 14.5 10.5C14.5 9.96957 14.2893 9.46086 13.9142 9.08579C13.5391 8.71071 13.0304 8.5 12.5 8.5C11.9696 8.5 11.4609 8.71071 11.0858 9.08579C10.7107 9.46086 10.5 9.96957 10.5 10.5C10.5 11.0304 10.7107 11.5391 11.0858 11.9142C11.4609 12.2893 11.9696 12.5 12.5 12.5Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input  type="text" placeholder="United States"></input>
                        </div>
                    </div>
                    <div className="searchButtonJobs">
                    <Popup trigger={<button >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M19.9999 20.5004L15.9499 16.4504M15.9499 16.4504C16.5999 15.8003 17.1156 15.0286 17.4674 14.1793C17.8192 13.33 18.0002 12.4197 18.0002 11.5004C18.0002 10.5811 17.8192 9.67076 17.4674 8.82144C17.1156 7.97211 16.5999 7.2004 15.9499 6.55036C15.2998 5.90031 14.5281 5.38467 13.6788 5.03287C12.8295 4.68107 11.9192 4.5 10.9999 4.5C10.0806 4.5 9.17027 4.68107 8.32095 5.03287C7.47163 5.38467 6.69991 5.90031 6.04987 6.55036C4.73705 7.86318 3.99951 9.64375 3.99951 11.5004C3.99951 13.357 4.73705 15.1375 6.04987 16.4504C7.36269 17.7632 9.14326 18.5007 10.9999 18.5007C12.8565 18.5007 14.637 17.7632 15.9499 16.4504Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>} position="center center" modal>
                                        {closePremium =>(
                                        <div className='premiumPopUp'>
                                            <img src='./images/premiumImage.png'></img>
                                        <div className="delContentButtons">
                                            <div className='delContent'>
                                                <h2>Your Free Plan Has Reached Its Limit!</h2>
                                                <div>Unlock Visafriendly’s full potential with Premium—unlimited access.</div>
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
                </div>
                <div className="dropDownFilters">
                    <div className="jobFilterDrop">
                    <div className="dropDownMain" onClick={changeFilterDrop.bind(this,0)}>
                        <div className="dropDownFilterText">
                            <div>Job Category</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[0] && 
                            (<div className="multiSelectDrop">
                                <div className="dropDownCatName">Job Category</div>
                                {
                                    props.jobCats.map((c,i) => (
                                        <div className="dropDownCatNames">
                                            <input type="checkbox"  className="check" checked={props.jobCatsBool[i]} onChange={changeCats.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                }
                            </div>)
                        }
                    </div>
                    <div className="jobFilterDrop">
                    <div className="dropDownMain" onClick={changeFilterDrop.bind(this,1)}>
                        <div className="dropDownFilterText">
                            <div>Job Type</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[1] && 
                            (<div className="multiSelectTypeDrop">
                                <div className="dropDownCatName">Job Type</div>
                                {
                                    props.jobTypes.map((c,i) => (
                                        <div className="dropDownCatNames">
                                            <input type="checkbox"  className="check" checked={props.jobTypeBool[i]} onChange={changeType.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                }
                            </div>)
                        }
                    </div>
                    <div className="jobFilterDrop">
                    <div className="dropDownMain" onClick={changeFilterDrop.bind(this,2)}>
                        <div className="dropDownFilterText">
                            <div>Work Setting</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[2] && 
                            (<div className="multiSelectSetDrop">
                                <div className="dropDownCatName">WORK SETTING</div>
                                {
                                    props.workSet.map((c,i) => (
                                        <div className="dropDownCatNames">
                                            <input type="checkbox"  className="check" checked={props.workSetBool[i]} onChange={changeWorkSet.bind(this,i)}></input>
                                            <div>{c}</div>
                                        </div>
                                    ))
                                }
                            </div>)
                        }
                    </div>
                    <div className="jobFilterDrop">
                    <div className="dropDownMain" onClick={changeFilterDrop.bind(this,3)}>
                        <div className="dropDownFilterText">
                            <div>Salary Range</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[3] && 
                            (<div className="multiSelectSalaryDrop">
                                <div className="dropDownCatName">SALARY RANGE</div>
                                <div className="sliders">
                               <ReactSlider trackClassName="exampleTrack" min={100} max={2000000} value={salary} onChange={setSalary}></ReactSlider>
                               <div className="slidersTextRange">${salary[0]} - ${salary[1]}</div>
                               </div>
                            </div>)
                        }
                    </div>
                    <div className="jobFilterDrop">
                    <div className="dropDownMain" onClick={changeFilterDrop.bind(this,4)}>
                        <div className="dropDownFilterText">
                            <div>Experience</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M6.33984 9.59062L11.9998 15.2506L17.6598 9.59062L16.9498 8.89062L11.9998 13.8406L7.04984 8.89062L6.33984 9.59062Z" fill="black"/>
                        </svg>
                    </div>
                    {filterDrop[4] && 
                            (<div className="multiSelectSalaryDrop">
                                <div className="dropDownCatName">EXPERIENCE LEVEL</div>
                                <div className="sliders">
                               <ReactSlider trackClassName="exampleTrack" min={1} max={30} value={exp} onChange={setExp}></ReactSlider>
                               <div className="slidersTextRange">{exp[0]} - {exp[1]}</div>
                               </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
