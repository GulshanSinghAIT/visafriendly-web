import React from 'react'
import styles from "./PopUpRefer.module.css"
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";


export function PopUpRefer(props) {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
    const userPoints=props.userPoints;
    const navigate = useNavigate();
    
    function navigateToJobs(){
        navigate("/allJobsPremiumPlan");
    }

    async function transactionHandler(){
      console.log(email,'lik');

      try {
        if (!email) return;
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/refer/transactions/${props.points}`, { email: email,pointsAfter: props.userPoints-props.points }
        );
        if (response.data.success) {
            props.setPoints(props.userPoints-props.points);
        }
      } catch (error) {
        console.error("Error inserting saved jobs:", error);
      }
    }

  return (
    <div className={styles.redeemPopup}>
      <div className={styles.redeemContent}>
        {userPoints>=props.points ? 
            <div className={styles.redeemContentHead}>Redeem {props.points} reward points </div>
            :
            <div className={styles.redeemContentHead}>Sorry, You can’t Redeem!</div>
        }
        {userPoints>=props.points ? 
            <div className={styles.redeemContentSubHead}>Do you want to redeem your {props.points} reward points for a Week plan? If yes please click the continue button.</div>
            :
            <div className={styles.redeemContentSubHead}>Sorry, you don’t have enough reward points to redeem. Invite more people to earn repoints.</div>
        }
      </div>
      <div className={styles.reddemButtons}>
        <button className={styles.redeemButtonCancel} onClick={props.closeRedeem}>Cancel</button>
        {userPoints>=props.points ? 
            <Popup trigger={<button className={styles.redeemButtonContinue} onClick={transactionHandler}>Continue</button>} position="center center" modal nested>
                                {closeContinue =>(
                                    <div className={styles.congrats}>
                                        <img src="./images/congrats.png"></img>
                                        <div className={styles.congratsMessage}>
                                            <div className={styles.congratsMessageHead}>Congratulations!</div>
                                            <div className={styles.congratsMessageSubHead}>You redeemed your {props.points} reward points for a {props.timePremium} premium plan. Enjoy your benefits & All the best.</div>
                                        </div>
                                        <button className={styles.congratsNav} onClick={navigateToJobs}>Explore H-1B + Cap-Exempt Jobs</button>
                                        <div className={styles.cancelPopUp} onClick={event => {
                                            closeContinue();props.closeRedeem();}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                                <path d="M23.25 7.75L7.75 23.25" stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M7.75 7.75L23.25 23.25" stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                )}
            </Popup>
            :
            <button className={styles.redeemButtonContinue} onClick={props.closeRedeem}>Invite</button>

        }
      </div>
      <div className={styles.cancelPopUp} onClick={props.closeRedeem}>
        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path d="M23.25 7.75L7.75 23.25" stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.75 7.75L23.25 23.25" stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

