import React from "react";
import styles from "./jCBefore.module.css"
import { OpportunityModal } from "../../newUserAuthPopup/OpportunityModal";

export function JCBefore(props) {
    const role="Data Analyst";
    const companyName="Infosys"
    const [isOpen,setOpen] = React.useState(false);
    function openModal(){
        setOpen(true);
    }
    return (
        <div className={props.blur===false ? styles.jobOuterCard : styles.jobOuterCardBlur}>
            <div className={styles.jobCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.jobCardCompany}>
                        <div className={styles.jobCardCompanyLogo}></div>
                        <div className={styles.jobCardNameRole}>
                            <div className={styles.jobCardRole}>{role}</div>
                            <div className={styles.jobCardName}>{companyName}</div>
                        </div>
                    </div>
                    <div className={styles.jobApplyBookmark}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M28.332 5H11.6654C10.7813 5 9.93346 5.35119 9.30834 5.97631C8.68322 6.60143 8.33203 7.44928 8.33203 8.33333V33.5633C8.33208 33.7093 8.37045 33.8526 8.4433 33.9791C8.51615 34.1055 8.62093 34.2106 8.74715 34.2839C8.87337 34.3571 9.01662 34.3959 9.16255 34.3964C9.30848 34.3969 9.45198 34.3591 9.5787 34.2867L18.3454 29.2783C18.8489 28.9907 19.4188 28.8394 19.9987 28.8394C20.5786 28.8394 21.1485 28.9907 21.652 29.2783L30.4187 34.2883C30.5455 34.3608 30.6892 34.3986 30.8353 34.3981C30.9813 34.3975 31.1247 34.3585 31.251 34.2851C31.3772 34.2117 31.482 34.1063 31.5547 33.9797C31.6275 33.853 31.6656 33.7094 31.6654 33.5633V8.33333C31.6654 7.44928 31.3142 6.60143 30.6891 5.97631C30.0639 5.35119 29.2161 5 28.332 5Z" stroke="#313DEB" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                            <button className={styles.jobApply} onClick={openModal}>Apply</button>
                            {isOpen && (
                                    <div className={styles.modalOverlay}>
                                      <div className={styles.modalContent}>
                                        <OpportunityModal
                                          onClose={() => {
                                            setOpen(false);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                        </div>
                </div>
                <div className={styles.horizontalLine}></div>
                <div className={styles.jobDetails}>
                    <div className={styles.jobSubDetail}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.5598 20.82C12.3966 20.9372 12.2007 21.0003 11.9998 21.0003C11.7988 21.0003 11.603 20.9372 11.4398 20.82C6.61078 17.378 1.48578 10.298 6.66678 5.182C8.08912 3.78285 10.0046 2.99912 11.9998 3C13.9998 3 15.9188 3.785 17.3328 5.181C22.5138 10.297 17.3888 17.376 12.5598 20.82Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 12C12.5304 12 13.0391 11.7893 13.4142 11.4142C13.7893 11.0391 14 10.5304 14 10C14 9.46957 13.7893 8.96086 13.4142 8.58579C13.0391 8.21071 12.5304 8 12 8C11.4696 8 10.9609 8.21071 10.5858 8.58579C10.2107 8.96086 10 9.46957 10 10C10 10.5304 10.2107 11.0391 10.5858 11.4142C10.9609 11.7893 11.4696 12 12 12Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div className={styles.jobDetailDesc}>Seattle, WA</div>
                    </div>
                    <div className={styles.jobSubDetail}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M12.5 18C15.8137 18 18.5 15.3137 18.5 12C18.5 8.68629 15.8137 6 12.5 6C9.18629 6 6.5 8.68629 6.5 12C6.5 15.3137 9.18629 18 12.5 18Z" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 10V12L13.5 13" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.6294 7.66037L15.8194 3.61037C15.7279 3.14997 15.4775 2.73641 15.1118 2.44207C14.7462 2.14773 14.2887 1.99137 13.8194 2.00037H11.1394C10.6701 1.99137 10.2126 2.14773 9.84692 2.44207C9.48128 2.73641 9.23082 3.14997 9.13938 3.61037L8.35938 7.66037" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.37891 16.3596L9.17891 20.3596C9.27035 20.82 9.52081 21.2335 9.88645 21.5279C10.2521 21.8222 10.7096 21.9786 11.1789 21.9696H13.8989C14.3682 21.9786 14.8257 21.8222 15.1914 21.5279C15.557 21.2335 15.8075 20.82 15.8989 20.3596L16.7089 16.3096" stroke="#545251" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                        <div className={styles.jobDetailDescFirst}>Full time-Onsite</div>
                    </div>
                    
                    
                </div>
                <div className={styles.jobDetails}>      
                
                    <div className={styles.jobSubDetail}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 22 22" fill="none">
                            <path d="M2.75 11C2.75 14.4567 2.75 18.0189 3.95817 19.0923C5.16633 20.1667 7.1115 20.1667 11 20.1667C14.8885 20.1667 16.8337 20.1667 18.0418 19.0923C19.25 18.018 19.25 14.4567 19.25 11" stroke="#545251" stroke-width="1.375"/>
                            <path d="M13.437 13.0182L18.9444 11.3663C19.4898 11.2023 19.7629 11.1207 19.9362 10.9245C19.9701 10.8862 20.0008 10.8451 20.0279 10.8017C20.1654 10.5789 20.1654 10.2948 20.1654 9.72459C20.1654 7.47876 20.1654 6.35584 19.5484 5.59776C19.4298 5.45189 19.2965 5.31859 19.1506 5.19992C18.3925 4.58301 17.2696 4.58301 15.0238 4.58301H6.97453C4.7287 4.58301 3.60578 4.58301 2.8477 5.19992C2.70103 5.31909 2.56842 5.4517 2.44986 5.59776C1.83203 6.35584 1.83203 7.47876 1.83203 9.72459C1.83203 10.2948 1.83203 10.5789 1.96953 10.8017C1.99703 10.8445 2.02759 10.8854 2.0612 10.9245C2.23536 11.1207 2.50761 11.2023 3.05303 11.3663L8.56036 13.0182M5.95703 4.58301C6.71145 4.56467 7.4787 4.08342 7.73536 3.37301L7.76745 3.27859L7.79036 3.20801C7.82886 3.09159 7.84903 3.03384 7.8692 2.98251C7.99869 2.66059 8.21688 2.38202 8.49841 2.17919C8.77994 1.97636 9.11326 1.85758 9.45961 1.83667C9.5137 1.83301 9.57603 1.83301 9.69703 1.83301H12.2985C12.4204 1.83301 12.4819 1.83301 12.5369 1.83667C12.8832 1.85758 13.2165 1.97636 13.4981 2.17919C13.7796 2.38202 13.9978 2.66059 14.1273 2.98251C14.1484 3.03384 14.1676 3.09251 14.2061 3.20801L14.2299 3.27859C14.2464 3.32717 14.2538 3.35192 14.262 3.37301C14.5187 4.08342 15.285 4.56467 16.0394 4.58301" stroke="#545251" stroke-width="1.375"/>
                            <path d="M12.832 11.458H9.16536C9.04381 11.458 8.92723 11.5063 8.84127 11.5923C8.75532 11.6782 8.70703 11.7948 8.70703 11.9163V13.8982C8.70705 13.9897 8.73448 14.0791 8.78578 14.1549C8.83708 14.2307 8.9099 14.2895 8.99486 14.3235L9.63653 14.5802C10.5109 14.9301 11.4865 14.9301 12.3609 14.5802L13.0025 14.3235C13.0875 14.2895 13.1603 14.2307 13.2116 14.1549C13.2629 14.0791 13.2903 13.9897 13.2904 13.8982V11.9163C13.2904 11.7948 13.2421 11.6782 13.1561 11.5923C13.0702 11.5063 12.9536 11.458 12.832 11.458Z" stroke="#545251" stroke-width="1.375" stroke-linecap="round"/>
                        </svg>
                        <div className={styles.jobDetailDesc}>2+ years exp</div>
                    </div>
                    <div className={styles.jobSubDetail}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25 13.75H11.6875C12.4438 13.75 13.0625 13.1313 13.0625 12.375C13.0625 11.6187 12.4438 11 11.6875 11H10.3125C9.55625 11 8.9375 10.3813 8.9375 9.625C8.9375 8.86875 9.55625 8.25 10.3125 8.25H13.75M11 6.1875V7.79212M11 13.0625V15.8125M19.9375 11C19.9375 13.3704 18.9959 15.6437 17.3198 17.3198C15.6437 18.9959 13.3704 19.9375 11 19.9375C8.62963 19.9375 6.35634 18.9959 4.68023 17.3198C3.00413 15.6437 2.0625 13.3704 2.0625 11C2.0625 8.62963 3.00413 6.35634 4.68023 4.68023C6.35634 3.00413 8.62963 2.0625 11 2.0625C13.3704 2.0625 15.6437 3.00413 17.3198 4.68023C18.9959 6.35634 19.9375 8.62963 19.9375 11Z" stroke="#545251" stroke-width="1.375" stroke-miterlimit="10" stroke-linejoin="round"/>
                        </svg>
                        <div className={styles.jobDetailDesc}>$95,000/year</div>
                    </div>
                </div>
                <div className={styles.horizontalLine}></div>
                <div className={styles.jobCardFooter}>
                    <div className={styles.jobCardFooterStart}>
                        <div className={styles.jobType}>
                            <div className={styles.jobTypeText}>Internship</div>
                        </div>
                        <div className={styles.jobType}>
                            <div className={styles.jobTypeText}>24 Applicants</div>
                        </div>
                    </div>
                    <div className={styles.jobCardFooterEnd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path d="M3.38281 12.0005C3.38281 13.1052 3.60039 14.199 4.02311 15.2196C4.44584 16.2401 5.06544 17.1674 5.84654 17.9485C6.62763 18.7296 7.55493 19.3492 8.57548 19.7719C9.59604 20.1947 10.6899 20.4122 11.7945 20.4122C12.8991 20.4122 13.993 20.1947 15.0135 19.7719C16.0341 19.3492 16.9614 18.7296 17.7425 17.9485C18.5235 17.1674 19.1431 16.2401 19.5659 15.2196C19.9886 14.199 20.2062 13.1052 20.2062 12.0005C20.2062 9.76963 19.3199 7.63009 17.7425 6.05259C16.165 4.4751 14.0254 3.58887 11.7945 3.58887C9.56358 3.58887 7.42403 4.4751 5.84654 6.05259C4.26904 7.63009 3.38281 9.76963 3.38281 12.0005Z" stroke="#545251" stroke-width="1.86926" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.793 7.32812V12.0013L14.5969 14.8052" stroke="#545251" stroke-width="1.86926" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div>10 days ago</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
