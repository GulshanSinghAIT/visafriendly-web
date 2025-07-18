import React,{useState,useEffect} from "react";
import axios from "axios";

export function Points(props){
    const [leaderBoard, setLeaderBoard] = useState([]);

    async function func() {
        try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/refer/top5ReferPoints`
            );
            return await response.data;
          } catch (error) {
            return [];
          }
}


useEffect(() => {
    async function fetchData() {
        const data = await func();
        setLeaderBoard(data);
    }
    fetchData();
}, []);

    return(
        <div className="flex flex-col w-full lg:w-1/3 gap-4 lg:gap-7">
            <div className="flex flex-col gap-4 lg:gap-5">
                <div className="overflow-hidden flex p-4 lg:p-7 items-center gap-4 lg:gap-5 rounded-lg border border-gray-300 bg-white">
                    <div className="flex p-2 lg:p-3 items-start gap-2 lg:gap-3 rounded-lg border border-gray-200 bg-white shadow-lg shadow-blue-600/20">
                        <img src="./images/user-check-2.png" className="w-5 h-5 lg:w-6 lg:h-6" alt="User Check" />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 lg:gap-3">
                        <div className="text-xl lg:text-2xl font-semibold text-blue-600 line-clamp-1">{props.refs}</div>
                        <div className="text-sm lg:text-base font-medium text-black">Total Referrals</div>
                    </div>
                </div>
                <div className="overflow-hidden flex p-4 lg:p-7 items-center gap-4 lg:gap-5 rounded-lg border border-gray-300 bg-white">
                    <div className="flex p-2 lg:p-3 items-start gap-2 lg:gap-3 rounded-lg border border-gray-200 bg-white shadow-lg shadow-blue-600/20">
                        <img src="./images/giftSmall.png" className="w-5 h-5 lg:w-6 lg:h-6" alt="Gift" />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 lg:gap-3">
                        <div className="text-xl lg:text-2xl font-semibold text-blue-600 line-clamp-1">{props.points}</div>
                        <div className="text-sm lg:text-base font-medium text-black">Total Reward Points</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-4 lg:p-8 gap-4 lg:gap-8 rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 lg:gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="58" viewBox="0 0 45 58" fill="none" className="w-8 h-10 lg:w-10 lg:h-12">
                        <path fillRule="evenodd" clipRule="evenodd" d="M44.4143 49.8207L28.7987 24.6777L17.0981 31.9462L32.7136 57.0918L35.9879 49.3051L44.4143 49.8207Z" fill="#0E93B4"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 49.8207L15.6154 24.6777L27.3161 31.9462L11.7005 57.0918L8.42521 49.3051L0 49.8207Z" fill="#5CD1E3"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.2065 0C32.868 0 41.509 8.64361 41.509 19.3078C41.509 29.972 32.868 38.6157 22.2065 38.6157C11.5456 38.6157 2.90479 29.972 2.90479 19.3078C2.90479 8.64361 11.5456 0 22.2065 0Z" fill="#F7BC16"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.2064 2.70703C31.3724 2.70703 38.8027 10.1392 38.8027 19.3079C38.8027 28.4765 31.3724 35.9087 22.2064 35.9087C13.0412 35.9087 5.61084 28.4765 5.61084 19.3079C5.61084 10.1392 13.0412 2.70703 22.2064 2.70703ZM22.2064 3.95464C30.6845 3.95464 37.5552 10.8279 37.5552 19.3079C37.5552 27.7876 30.6845 34.6612 22.2064 34.6612C13.7291 34.6612 6.85741 27.7876 6.85741 19.3079C6.85741 10.8279 13.7291 3.95464 22.2064 3.95464Z" fill="#ECAB09"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.7862 16.2078L30.4649 16.6301C30.75 16.6504 30.9796 16.8317 31.0676 17.1007C31.1556 17.3727 31.0756 17.6515 30.8582 17.8353L26.5096 21.5152L27.8654 27.0482C27.932 27.3252 27.831 27.5996 27.6011 27.7678C27.3735 27.9331 27.0812 27.9437 26.8378 27.7958L21.9972 24.7941L17.1543 27.7958C16.9114 27.9437 16.6222 27.9331 16.3915 27.7678C16.1611 27.5996 16.0601 27.3252 16.1278 27.0482L17.4833 21.5152L13.1347 17.8353C12.9166 17.6515 12.8392 17.3727 12.9246 17.1007C13.0125 16.8317 13.2429 16.6504 13.5271 16.6301L19.2086 16.2078L21.3614 10.9338C21.4696 10.6724 21.713 10.5098 21.9972 10.5098C22.2796 10.5098 22.5225 10.6724 22.6315 10.9338L24.7862 16.2078Z" fill="#FCCD32"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.7988 16.2042L30.4792 16.6262C30.7643 16.6465 30.9949 16.8278 31.0829 17.0971C31.1709 17.3688 31.0897 17.6485 30.8725 17.8324L26.5238 21.5124L27.8796 27.0451C27.9473 27.3213 27.8463 27.5959 27.6157 27.7639C27.3853 27.9303 27.0958 27.9398 26.8528 27.793L22.0099 24.7902L17.1696 27.793C16.926 27.9398 16.6339 27.9303 16.406 27.7639C16.1754 27.5959 16.0752 27.3213 16.142 27.0451L17.4979 21.5124L13.1492 17.8324C12.9319 17.6485 12.8519 17.3688 12.9399 17.0971C13.0278 16.8278 13.2575 16.6465 13.5424 16.6262L19.2213 16.2042L21.3756 10.9309C21.4846 10.6696 21.7276 10.5059 22.0099 10.5059C22.2942 10.5059 22.5378 10.6696 22.6461 10.9309L24.7988 16.2042Z" fill="#ECAB09"/>
                    </svg>
                    <div className="text-base lg:text-lg font-semibold text-black">Leader Board</div>
                </div>
                <div className="flex flex-col gap-4 lg:gap-5">
                {leaderBoard.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2 lg:gap-3">
                            <div className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none" className="w-full h-full"> 
                                    <path d="M27.9196 23.5592L22.7992 14.09C23.3215 12.9043 23.6138 11.594 23.6138 10.2155C23.6138 4.90245 19.3066 0.595703 13.994 0.595703C8.68016 0.595703 4.37341 4.90289 4.37341 10.2155C4.37341 11.6273 4.6801 12.9669 5.2261 14.1744L0.0828477 23.5548C-0.0829922 23.8563 -0.0554297 24.2281 0.151945 24.5033C0.359758 24.7777 0.710633 24.9067 1.04573 24.828L5.43779 23.8204L6.94104 28.0073C7.05829 28.3328 7.35536 28.5585 7.69967 28.5839C7.72201 28.5857 7.74342 28.5865 7.76442 28.5865C7.92264 28.5865 8.07788 28.5435 8.21362 28.4623C8.34937 28.381 8.46054 28.2644 8.53529 28.125L13.0114 19.7858C13.3377 19.8189 13.6655 19.8354 13.9935 19.8353C14.2976 19.8353 14.5977 19.8195 14.8943 19.7915L19.4675 28.1316C19.5484 28.2794 19.6704 28.4007 19.8186 28.4809C19.9669 28.5611 20.1351 28.5967 20.3031 28.5835C20.6466 28.5559 20.9423 28.3306 21.0587 28.0069L22.5619 23.82L26.954 24.8275C27.2909 24.9089 27.6382 24.7781 27.8461 24.5046C28.0547 24.2316 28.0828 23.8615 27.9196 23.5592ZM7.92361 25.5656L6.82281 22.4987C6.67231 22.0817 6.23571 21.8389 5.80343 21.9417L2.555 22.6868L6.25761 15.9336C7.47693 17.5807 9.20943 18.8232 11.2189 19.4279L7.92361 25.5656ZM6.13115 10.2154C6.13115 5.88024 9.65874 2.35311 13.9943 2.35311C18.3295 2.35311 21.8566 5.88024 21.8566 10.2154C21.8566 14.5506 18.3295 18.0786 13.9943 18.0786C9.65827 18.0786 6.13115 14.5506 6.13115 10.2154ZM22.1961 21.9417C21.7621 21.8393 21.3273 22.0817 21.1768 22.4986L20.0686 25.5878L16.7011 19.4475C18.7639 18.8433 20.5385 17.568 21.7735 15.8727L25.4608 22.6903L22.1961 21.9417Z" fill="#319AEB"/>
                                    <text x="10" y="15" fontStyle="normal" fontWeight={500} fontSize={14} fontFamily="Gellix" fill="#319AEB">{index+1}</text>
                                </svg>
                            </div>
                            <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                                <div className="text-sm lg:text-base font-medium text-gray-600 truncate">{stat.firstName} {stat.lastName}</div>
                            </div>
                        </div>
                        <div className="text-sm lg:text-base font-semibold text-blue-600 flex-shrink-0">{stat.total_points}</div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};
