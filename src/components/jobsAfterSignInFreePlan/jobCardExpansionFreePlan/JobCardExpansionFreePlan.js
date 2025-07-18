import React, { useEffect } from "react";
import "./JobCardExpansionFreePlan.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'


export function JobCardExpansionFreePlan(props){
    return(
        <div className="completeJobDetails">
                        <div className="completeJobDetailsInner">
                            <div className="completeJobHeader">
                                <div className="headerJobDetails">
                                    <div className="jobListingImageBig"></div>
                                    <div className="jobListingJobSub">
                                        <div className="mainDisplayTitle">{props.clickedJobData.title}</div>
                                        <div className="mainDisplayCompany">{props.clickedJobData.company}</div>
                                    </div>
                                </div>
                                <div className="headerJobLogos">
                                    <div className="jobLogosInner">
                                        <div className="jobLogosInnerInner">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <path d="M22.5 10C24.5711 10 26.25 8.32107 26.25 6.25C26.25 4.17893 24.5711 2.5 22.5 2.5C20.4289 2.5 18.75 4.17893 18.75 6.25C18.75 8.32107 20.4289 10 22.5 10Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M7.5 18.75C9.57107 18.75 11.25 17.0711 11.25 15C11.25 12.9289 9.57107 11.25 7.5 11.25C5.42893 11.25 3.75 12.9289 3.75 15C3.75 17.0711 5.42893 18.75 7.5 18.75Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M22.5 27.5C24.5711 27.5 26.25 25.8211 26.25 23.75C26.25 21.6789 24.5711 20 22.5 20C20.4289 20 18.75 21.6789 18.75 23.75C18.75 25.8211 20.4289 27.5 22.5 27.5Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.7373 16.8867L19.2748 21.8617" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M19.2623 8.13672L10.7373 13.1117" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="jobLogosInner">
                                        <div className="jobLogosInnerInner">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <path d="M21.25 3.75H8.75C8.08696 3.75 7.45107 4.01339 6.98223 4.48223C6.51339 4.95107 6.25 5.58696 6.25 6.25V25.1725C6.25004 25.2819 6.27881 25.3895 6.33345 25.4843C6.38809 25.5791 6.46667 25.658 6.56134 25.7129C6.65601 25.7678 6.76344 25.7969 6.87289 25.7973C6.98234 25.7977 7.08996 25.7693 7.185 25.715L13.76 21.9587C14.1377 21.743 14.5651 21.6296 15 21.6296C15.4349 21.6296 15.8623 21.743 16.24 21.9587L22.815 25.7162C22.9101 25.7706 23.0179 25.799 23.1274 25.7985C23.237 25.7981 23.3445 25.7689 23.4392 25.7138C23.5339 25.6588 23.6125 25.5798 23.667 25.4847C23.7216 25.3897 23.7502 25.2821 23.75 25.1725V6.25C23.75 5.58696 23.4866 4.95107 23.0178 4.48223C22.5489 4.01339 21.913 3.75 21.25 3.75Z" stroke="#313DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <Popup trigger={<button>Apply</button>} position="center center" modal>
                                        {closeJobsApply =>(
                                        <div className='delPopUp'>
                                            <img src='./images/checkMark.png'></img>
                                        <div className="delContentButtons">
                                        <div className='delContent'>
                                            <h2>Have You applied this job? </h2>
                                        </div>
                                        <div className='delButtons'>
                                            <button className='cancelBut' onClick={closeJobsApply}>No</button>
                                            <button className='submitBut' onClick={closeJobsApply}>Yes</button>
                                        </div>
                                        </div>
                                        </div>
                                    )}
                                    </Popup>
                                </div>
                            </div>
                            <div className="horizontalLineMain"></div>
                            <div className="mainDescription">
                                <div className="mainD">
                                <div className="mainDescriptionHeader">
                                    <div className="mainDescriptionHeaderConH">Location</div>
                                    <div className="mainDescriptionHeaderConSH">{props.clickedJobData.location}</div>
                                </div>
                                <div className="mainDescriptionHeader">
                                    <div className="mainDescriptionHeaderConH">Job Type</div>
                                    <div className="mainDescriptionHeaderConSH">{props.clickedJobData.type} - {props.clickedJobData.workSetting}</div>
                                </div>
                                <div className="mainDescriptionHeader">
                                    <div className="mainDescriptionHeaderConH">Experience</div>
                                    <div className="mainDescriptionHeaderConSH">{props.clickedJobData.exp}+ years</div>
                                </div>
                                <div className="mainDescriptionHeader">
                                    <div className="mainDescriptionHeaderConH">Salary</div>
                                    <div className="mainDescriptionHeaderConSH">{props.clickedJobData.salary}</div>
                                </div>
                                </div>
                                <div className="horizontalLineMain"></div>
                               
                            </div>
                            
                        </div>
                    </div>
    )
}
