import React, { useState, useEffect, useRef } from 'react';
import styles from './job-listings.module.css'
import { NavBar } from '../landingPage/first/NavBar';
import { Footer } from '../landingPage/ninth/Footer';
import { FiltersMainJobBeforeSignIn } from './filtersMainJobBeforeSignIn/FiltersMainJobBeforeSignIn';
import { JCBefore } from './jobCardBeforeSignIn/jCBefore';
import { OpportunityModal } from '../newUserAuthPopup/OpportunityModal';
import { useNavigate } from "react-router-dom";


const JobsBefore = () => {
  const navigate = useNavigate();

  const [isOpen, setOpen] = React.useState(false);
  function handleModal() {
    setOpen(true);
  }
  return (
    <div className={styles.app}>
      <header className={styles.gradientContainer}>
        <NavBar></NavBar>
        <FiltersMainJobBeforeSignIn></FiltersMainJobBeforeSignIn>
      </header>
      <div className={styles.main}>
        <div className={styles.jobCardsBefore}>
          <JCBefore blur={false}></JCBefore>
          <JCBefore blur={false}></JCBefore>
          <JCBefore blur={false}></JCBefore>
          <div className={styles.careerOp}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="101" viewBox="0 0 100 101" fill="none">
              <g clip-path="url(#clip0_4206_37808)">
                <path d="M0.111843 100.388V0.611843H99.8882V100.388H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                <path d="M38.4961 84.4861L59.4961 36.6361C60.5851 34.1564 62.6145 32.2107 65.1379 31.2269C67.6612 30.2432 70.472 30.3019 72.9521 31.3901C74.1804 31.9286 75.2906 32.7038 76.2192 33.6714C77.1479 34.639 77.8768 35.7801 78.3643 37.0295C78.8518 38.2789 79.0884 39.6121 79.0606 40.953C79.0328 42.2938 78.741 43.616 78.2021 44.8441L65.4021 73.9941C63.2248 78.9528 59.1672 82.8438 54.1216 84.8113C49.076 86.7788 43.4555 86.6619 38.4961 84.4861Z" fill="white" />
                <path d="M33.5558 75.6435L33.5838 75.6315C38.3602 73.5344 42.1079 69.626 44.0028 64.7659C45.8976 59.9058 45.7843 54.492 43.6878 49.7155L41.5178 44.7675C39.4177 39.9836 35.5033 36.2299 30.6357 34.3321C25.768 32.4342 20.3458 32.5477 15.5618 34.6475C15.1823 34.8148 14.8848 35.1261 14.7348 35.5128C14.5848 35.8995 14.5945 36.3299 14.7618 36.7095L31.4938 74.8395C31.6609 75.2193 31.9718 75.5174 32.3585 75.6681C32.7451 75.8189 33.1757 75.81 33.5558 75.6435Z" fill="white" />
                <path d="M81.0227 14.7871L85.3747 28.5051L81.2587 29.8091L79.1427 23.1431L75.2847 30.5871L71.4407 28.6051L75.3307 21.1211L68.6107 23.2531L67.3047 19.1371L81.0227 14.7871Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_4206_37808">
                  <rect y="0.5" width="100" height="100" rx="11.4711" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className={styles.careerCont}>
              <div className={styles.careerContHead}>Empowering Your Global Career: Find Opportunities That Support Your Journey to Work Anywhere!</div>
              <div className={styles.careerContMid}>
                <img src="./images/groups.png" className={styles.ellipseImage}></img>
                <div className={styles.careerContMidCont}>See how millions of users are logging in to find opportunities that support their career journey.</div>
              </div>
              <div className={styles.buttons}>
                <button className={styles.loginBut} onClick={() => {
                  navigate("/login");
                }}>Log In</button>
                <button className={styles.signUpBut} onClick={() => {
                  navigate("/signup");
                }}>Sign Up</button>
              </div>
            </div>
          </div>
          <div className={styles.jobcardBlur}>
            <div className={styles.scrollContent}>
              <div className={styles.scrollItems}>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>

              </div>
            </div>
            <JCBefore blur={true}></JCBefore>
          </div>
          <div className={styles.jobcardBlur}>
            <div className={styles.scrollContent}>
              <div className={styles.scrollItems}>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>
                <div className={styles.scrollItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_4247_23355)">
                      <path d="M0.111843 29.8882V0.111843H29.8882V29.8882H0.111843Z" fill="#313DEB" stroke="#313DEB" stroke-width="0.223687" />
                      <path d="M11.5469 25.1949L17.8469 10.8399C18.1736 10.0959 18.7824 9.51224 19.5394 9.21711C20.2964 8.92197 21.1396 8.93958 21.8837 9.26606C22.2522 9.4276 22.5852 9.66016 22.8638 9.95044C23.1424 10.2407 23.3611 10.5831 23.5073 10.9579C23.6536 11.3327 23.7246 11.7327 23.7162 12.1349C23.7079 12.5372 23.6204 12.9338 23.4587 13.3023L19.6187 22.0473C18.9655 23.5349 17.7482 24.7022 16.2345 25.2924C14.7208 25.8827 13.0347 25.8476 11.5469 25.1949Z" fill="white" />
                      <path d="M10.0687 22.5432L10.0771 22.5396C11.51 21.9105 12.6343 20.738 13.2028 19.28C13.7712 17.8219 13.7373 16.1978 13.1083 14.7648L12.4573 13.2804C11.8273 11.8453 10.6529 10.7192 9.19265 10.1498C7.73236 9.58046 6.1057 9.61449 4.6705 10.2444C4.55665 10.2946 4.4674 10.388 4.42239 10.504C4.37739 10.62 4.3803 10.7492 4.4305 10.863L9.4501 22.302C9.50021 22.416 9.59351 22.5054 9.7095 22.5506C9.82548 22.5959 9.95468 22.5932 10.0687 22.5432Z" fill="white" />
                      <path d="M24.3068 4.28711L25.6124 8.40251L24.3776 8.79371L23.7428 6.79391L22.5854 9.02711L21.4322 8.43251L22.5992 6.18731L20.5832 6.82691L20.1914 5.59211L24.3068 4.28711Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4247_23355">
                        <rect width="30" height="30" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className={styles.scrollText}>Members Only</div>
                </div>

              </div>
            </div>
            <JCBefore blur={true}></JCBefore>
          </div>
          <div>

          </div>

        </div>
        <div className={styles.recommendsAlerts}>
          <div className={styles.recommends}>
            <div className={styles.recommendsText}>Explore other opportunities</div>
            <div className={styles.recommendsContent}>
              <div className={styles.contentMatter}>
                <div className={styles.clickableMatter}>Software Development Engineer</div>
                <div className={styles.clickableMatter}>Business Analytics and Business Intelligence</div>
                <div className={styles.clickableMatter}>Data Science and Analytics</div>
                <div className={styles.clickableMatter}>AI/ML Engineer</div>
                <div className={styles.clickableMatter}>Product Management</div>
                <div className={styles.clickableMatter}>Data Engineering and Cloud Computing</div>
                <div className={styles.clickableMatter}>Product (UI/UX) Design</div>
              </div>
            </div>
          </div>
          <div className={styles.alerts}>
            <div className={styles.alertsText}>Create Job Alert</div>
            <div className={styles.alertsContent}>
              <div className={styles.alertsForm}>
                <div className={styles.jobInputs}>
                  <div className={styles.jobHead}>Job Title</div>
                  <input className={styles.jobInput} placeholder='Enter Job Title'></input>
                </div>
                <div className={styles.jobInputs}>
                  <div className={styles.jobHead}>Email frequency</div>
                  <input className={styles.jobInput} placeholder='Once a week'></input>
                </div>
              </div>
              <button onClick={handleModal} className={styles.alertsBut}>Create Job Alert</button>
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
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};





export default JobsBefore;
