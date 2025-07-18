import React from "react";
import Popup from "reactjs-popup";
import { PopUpRefer } from "../popUpRefer/PopUpRefer";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export function Link(props){
    const [transactionDetails,setTransac] = React.useState([]);
    const { user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    useEffect(() => {
        const fetchSaved = async () => {
          try {
            if (!email) return;
            console.log(email);
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/refer/transactions`,{
                params : { email },
              }
            );
            if (response.data.success) {
                console.log(response.data.transactionDetails)
                setTransac(response.data.transactionDetails);
            }
          } catch (error) {
            console.error("Error fetching points and refs:", error);
          }
        };
    
        fetchSaved();
      }, [email]);

    const text="Join Visafriendly";
    const url="https://www.visafriendly.com?ref_code=m0ca9c"
    const message = encodeURIComponent(`${text}\n Link: ${url}`);
    
  // Social media share handlers
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };


const handleTelegramShare = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
  };
  
  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  };
  
  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };
  
  const handleLineShare = () => {
    window.open(`https://line.me/R/msg/text/?${message}`, "_blank");
  };
  
  const handleEmailShare = () => {
    window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${message}`, "_blank");
  };
    const sortByAppDate = (a,b) => {
        return new Date(a.appliedDate)-new Date(b.appliedDate);
    }
    const sortByTransValue = (a,b) => {
        return new Date(a.transaction)-new Date(b.transaction);
    }
    const sortByRewPoints= (a,b) => {
        return new Date(a.total)-new Date(b.total);
    }
    console.log(transactionDetails);
    return(
        <div className="flex flex-col w-full lg:w-2/3 gap-6 lg:gap-8">
            <div className="flex flex-col p-4 lg:p-7 rounded-lg bg-white gap-4 lg:gap-7 shadow-sm">
                <div className="flex flex-col gap-4 lg:gap-5">
                    <div className="text-lg lg:text-xl font-semibold text-black">Referral Link</div>
                    <div className="flex flex-col gap-3 lg:gap-4">
                        <div className="text-base lg:text-lg font-medium text-gray-800">Share your unique referral link</div>
                        <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-sm">
                            <input 
                                value="https://Visafriendly?ref_code=m0ca9c" 
                                readOnly
                                className="flex-1 px-4 py-3 lg:py-4 text-sm lg:text-base font-medium text-gray-500 outline-none border-none cursor-text"
                            />
                            <div className="w-px h-8 bg-gray-200"></div>
                            <div 
                                className="flex items-center justify-center px-4 py-3 lg:py-4 gap-2 cursor-pointer hover:bg-gray-50"
                                onClick={() => {navigator.clipboard.writeText("https://Visafriendly?ref_code=m0ca9c")}}
                            >
                                <img src="./images/copy.png" className="w-4 h-4 lg:w-5 lg:h-5" alt="copy" />
                                <div className="text-sm lg:text-base font-medium text-blue-600">Copy</div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                            <div className="text-sm lg:text-base font-semibold text-gray-800">Get 100 reward points for each referral</div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center p-2 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50">
                                    <img src="./images/facebook.png" onClick={handleFacebookShare} className="w-6 h-6 lg:w-7 lg:h-7" alt="Facebook" />
                                </div>
                                <div className="flex items-center p-2 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50">
                                    <img src="./images/instagram.png" className="w-6 h-6 lg:w-7 lg:h-7" alt="Instagram" />
                                </div>
                                <div className="flex items-center p-2 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50">
                                    <img src="./images/gmail_symbol.png" onClick={handleEmailShare} className="w-6 h-6 lg:w-7 lg:h-7" alt="Email" />
                                </div>
                                <div className="flex items-center p-2 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50">
                                    <img src="./images/whatsapp_symbol.jpg" onClick={handleWhatsAppShare} className="w-6 h-6 lg:w-7 lg:h-7" alt="WhatsApp" />
                                </div>
                                <div className="flex items-center p-2 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50">
                                    <img src="./images/telegram_symbol.png" onClick={handleTelegramShare} className="w-6 h-6 lg:w-7 lg:h-7" alt="Telegram" />
                                </div>
                                <div className="flex items-center p-2 rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-gray-50">
                                    <img src="./images/lineGlobal_symbol.png" onClick={handleLineShare} className="w-6 h-6 lg:w-7 lg:h-7" alt="Line" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full h-px bg-gray-200"></div>
                
                <div className="flex flex-col gap-4 lg:gap-5">
                    <div className="text-lg lg:text-xl font-semibold text-black">How It Works</div>
                    <div className="flex flex-col gap-3 lg:gap-4">
                        <div className="flex items-center justify-center gap-4 lg:gap-8 px-4 lg:px-16">
                           <img src="./images/send.png" className="w-8 h-8 lg:w-10 lg:h-10" alt="Send" />
                           <img src="./images/Line 29.png" className="w-8 lg:w-12 h-1" alt="Line" />
                           <img src="./images/user-plus-2.png" className="w-8 h-8 lg:w-10 lg:h-10" alt="User Plus" />
                           <img src="./images/Line 30.png" className="w-8 lg:w-12 h-1" alt="Line" />
                           <img src="./images/gift.png" className="w-8 h-8 lg:w-10 lg:h-10" alt="Gift" />
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-3 lg:gap-4">
                            <div className="flex flex-col items-center gap-3 flex-1 text-center">
                                <div className="text-sm lg:text-base font-semibold text-black">Share Referral Link</div>
                                <div className="text-xs lg:text-sm font-medium text-gray-600">Share your unique referral link with friends.</div>
                            </div>
                            <div className="flex flex-col items-center gap-3 flex-1 text-center">
                                <div className="text-sm lg:text-base font-semibold text-black">Earn Rewards</div>
                                <div className="text-xs lg:text-sm font-medium text-gray-600">Earn 100 reward points for every successful referral sign-up.</div>
                            </div>
                            <div className="flex flex-col items-center gap-3 flex-1 text-center">
                                <div className="text-sm lg:text-base font-semibold text-black">Redeem Your Rewards</div>
                                <div className="text-xs lg:text-sm font-medium text-gray-600">Accumulate points to unlock subscriptions</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full h-px bg-gray-200"></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
                <div className="flex flex-col p-4 lg:p-6 rounded-lg bg-white border border-gray-200 gap-3 lg:gap-4 flex-1">
                    <div className="text-base lg:text-lg font-semibold text-black">Bi-Weekly Plan</div>
                    <div className="text-sm lg:text-base font-medium text-blue-600">Redeem for 300 reward points</div>
                    <div className="text-xs lg:text-sm font-medium text-gray-600">Access exclusive features and benefits for two weeks.</div>
                    <Popup trigger={<button className="px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Redeem Now</button>} position="center center" modal nested>
                    {closeRedeem =>(
                        <PopUpRefer closeRedeem={closeRedeem} points={300} userPoints = {props.points} setPoints={props.setPoints} timePremium={"Bi-weekly"}></PopUpRefer>
                    )}
                    </Popup>
                </div>
                <div className="flex flex-col p-4 lg:p-6 rounded-lg bg-white border border-gray-200 gap-3 lg:gap-4 flex-1">
                    <div className="text-base lg:text-lg font-semibold text-black">Monthly Plan</div>
                    <div className="text-sm lg:text-base font-medium text-blue-600">Redeem for 500 reward points</div>
                    <div className="text-xs lg:text-sm font-medium text-gray-600">Get a full month of premium access to all features.</div>
                    <Popup trigger={<button className="px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Redeem Now</button>} position="center center" modal nested>
                    {closeRedeem =>(
                        <PopUpRefer closeRedeem={closeRedeem} points={500} userPoints ={props.points} setPoints={props.setPoints} timePremium={"Monthly"}></PopUpRefer>
                    )}
                    </Popup>
                </div>
            </div>
            
            <div className="flex flex-col p-4 lg:p-6 rounded-lg bg-white border border-gray-200 gap-4 lg:gap-6">
                <div className="text-lg lg:text-xl font-semibold text-black">Rewards Points History</div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <td className="px-2 lg:px-4 py-2 lg:py-3 text-left">
                                    <div className="flex items-center gap-2">       
                                        <p className="text-sm lg:text-base font-medium text-gray-700">Apply Date</p>
                                        <img src="./images/upDown.png" onClick={() => setTransac([...transactionDetails].sort(sortByAppDate))} className="w-3 h-3 lg:w-4 lg:h-4 cursor-pointer" alt="Sort" />
                                    </div>
                                </td>
                                <td className="px-2 lg:px-4 py-2 lg:py-3 text-left">
                                    <div className="text-sm lg:text-base font-medium text-gray-700">Activity</div>
                                </td>
                                <td className="px-2 lg:px-4 py-2 lg:py-3 text-left">
                                    <div className="flex items-center gap-2">       
                                        <p className="text-sm lg:text-base font-medium text-gray-700">Transaction</p>
                                        <img src="./images/upDown.png" onClick={() => setTransac([...transactionDetails].sort(sortByTransValue))} className="w-3 h-3 lg:w-4 lg:h-4 cursor-pointer" alt="Sort" />
                                    </div>
                                </td>
                                <td className="px-2 lg:px-4 py-2 lg:py-3 text-left">
                                    <div className="flex items-center gap-2">       
                                        <p className="text-sm lg:text-base font-medium text-gray-700">Total Reward Points</p>
                                        <img src="./images/upDown.png" onClick={() => setTransac([...transactionDetails].sort(sortByRewPoints))} className="w-3 h-3 lg:w-4 lg:h-4 cursor-pointer" alt="Sort" />
                                    </div>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionDetails.map((stat, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-2 lg:px-4 py-2 lg:py-3">
                                        <div className="text-sm lg:text-base text-gray-700">{new Date(stat.transDate).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-2 lg:px-4 py-2 lg:py-3">
                                        {stat.pointsSpend===200 ? <div className="text-sm lg:text-base text-gray-700">New User Login</div> : null}
                                        {stat.pointsSpend===-300 ? <div className="text-sm lg:text-base text-gray-700">biWeekly Subscription</div> : null}
                                        {stat.pointsSpend===-500 ? <div className="text-sm lg:text-base text-gray-700">Monthly Subscription</div> : null}
                                    </td>
                                    <td className="px-2 lg:px-4 py-2 lg:py-3">
                                        <div className={`text-sm lg:text-base font-medium ${stat.pointsSpend>=0 ? "text-green-600":"text-red-600"}`}>{stat.pointsSpend}</div>
                                    </td>
                                    <td className="px-2 lg:px-4 py-2 lg:py-3">
                                        <div className="text-sm lg:text-base text-gray-700">{stat.totalPointsAfter}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="flex flex-col p-4 lg:p-6 rounded-lg bg-white border border-gray-200 gap-4 lg:gap-6">
                <div className="text-lg lg:text-xl font-semibold text-black">Referral Rules</div>
                <div className="flex flex-col gap-3 lg:gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-gray-600 rounded-full mt-1 flex-shrink-0"></div>
                        <div className="text-sm lg:text-base text-gray-700">Share your referral link</div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-gray-600 rounded-full mt-1 flex-shrink-0"></div>
                        <div className="text-sm lg:text-base text-gray-700">Earn more points by referring more friends.</div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-gray-600 rounded-full mt-1 flex-shrink-0"></div>
                        <div className="text-sm lg:text-base text-gray-700">Use your reward points to unlock exclusive subscriptions or benefits.</div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-gray-600 rounded-full mt-1 flex-shrink-0"></div>
                        <div className="text-sm lg:text-base text-gray-700">Points earned may be capped or have expiration dates; check terms.</div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-gray-600 rounded-full mt-1 flex-shrink-0"></div>
                        <div className="text-sm lg:text-base text-gray-700">Any misuse of the referral program will lead to disqualification.</div>
                    </div>
                </div>
            </div>
        </div>
    )
};
