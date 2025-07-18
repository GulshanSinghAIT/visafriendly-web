import React from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "./link/Link";
import { Points } from "./points/Points";
import { Header } from "../profile/header/Header";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export function ReferAndEarn(){
    const queryString =window.location.search;
    const parameters = new URLSearchParams(queryString);
    const value = parameters.get('ref');
    console.log(value);
    Cookies.set('ref',value,{expires:14,path:"/"});
     const { user } = useUser();
     const email = user?.emailAddresses[0]?.emailAddress;
     const [points,setPoints] = React.useState(0);
     const [refs,setRefs] = React.useState(0);

    useEffect(() => {
        const fetchSaved = async () => {
          try {
            if (!email) return;
            console.log(email);
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/refer/refAndPoints`,{
                params : { email },
              }
            );
            if (response.data.success) {
                console.log('kijik',response.data.points);
                setRefs(response.data.points[0].referals_accepted);
                setPoints(response.data.points[0].total_points);
            }
          } catch (error) {
            console.error("Error fetching points and refs:", error);
          }
        };
    
        fetchSaved();
      }, [email]);
      
    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Header />
            <div className="w-full flex flex-col-reverse lg:flex-row justify-start gap-4 lg:gap-8 px-4 sm:px-6 lg:px-12 xl:px-48 py-8 lg:py-20 max-w-screen-2xl mx-auto">
                <Link points={points} setPoints={setPoints} refs={refs} setRefs={setRefs}/>
                <Points points={points} setPoints={setPoints} refs={refs} setRefs={setRefs}/>
            </div>
        </div>
    )
}
