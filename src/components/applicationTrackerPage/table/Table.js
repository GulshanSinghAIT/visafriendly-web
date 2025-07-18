import React, { useEffect, useState } from "react";
import './Table.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const resumes =["SWE Resume","Resume 1","Resume 2"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export function Table(props){
    function aGreatThanb (a,b){
        if(a.year > b.getFullYear()){
            return true;
        }
        if(a.year < b.getFullYear()){
            return false;
        }
        if(a.month.number > b.getMonth()){
            return true;
        }
        if(a.month.number < b.getMonth()){
            return false;
        }
        if(a.day > b.getDate()){
            return true;
        }
        if(a.day < b.getDate()){
            return false;
        }
        if(a.day===b.getDate() && a.month.number===b.getMonth() && a.year===b.getFullYear()){
            return true;
        }
        return false;

    }
    function min(a,b){
        if(a>=b){
          return b;
        }
        return a;
      }

    function aLessThanb (a,b){
        if(a.year < b.getFullYear()){
            return true;
        }
        if(a.year > b.getFullYear()){
            return false;
        }
        if(a.month.number < b.getMonth()){
            return true;
        }
        if(a.month.number > b.getMonth()){
            return false;
        }
        if(a.day < b.getDate()){
            return true;
        }
        if(a.day > b.getDate()){
            return false;
        }
        if(a.day===b.getDate() && a.month.number===b.getMonth() && a.year===b.getFullYear()){
            return true;
        }
        return false;

    }

    const sortByAppDate = (a,b) => {
        return new Date(a.appliedDate)-new Date(b.appliedDate);
    }

    const sortByRevDate = (a,b) => {
        return new Date(a.followUpDate)-new Date(b.followUpDate);
    }

    const { user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    useEffect(() => {
        const fetchSaved = async () => {
          try {
            if (!email) return;
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/dashboard/columns`,{
                params : { email },
              }
            );

            if (response.data.success) {
                props.setextra(response.data.cols);
            }
          } catch (error) {
            console.error("Error fetching extra columns:", error);
          } 
        };
        fetchSaved();
      }, [email]);

    let extraColumnsNonHidden=props.extraColumns.filter(
        column => column.status===1
    );
     useEffect(()=>{
        extraColumnsNonHidden=props.extraColumns.filter(
            column => column.status===1
        );
    },[props.extraColumns])
    

    const [hovered,setHover] = React.useState(false);
    const value= React.useContext(props.context);
      let stats=props.stats;
      let filteredStats=stats;
      const [collection,setCollection] = React.useState([]);
      useEffect(() => {
        setCollection(filteredStats);
      },[filteredStats])
      
      if(value.value !== "All"){
        filteredStats=stats.filter(stat => stat.rowData.status === value.value 
            && (aLessThanb(props.range[0],new Date(stat.rowData.appliedDate))) && 
            (aGreatThanb(props.range[min(1,props.range.length-1)],new Date(stat.rowData.appliedDate)))
             &&
             ((stat.rowData.role.toLowerCase().includes(props.searchVal.toLowerCase()))
            || (stat.rowData.companyName.toLowerCase().includes(props.searchVal.toLowerCase()))));
      }
      else{
        filteredStats=stats.filter(stat =>  (aLessThanb(props.range[0],new Date(stat.rowData.appliedDate))) && 
        (aGreatThanb(props.range[min(1,props.range.length-1)],new Date(stat.rowData.appliedDate))) &&
        ((stat.rowData.companyName.toLowerCase().includes(props.searchVal.toLowerCase()))
        || (stat.rowData.role.toLowerCase().includes(props.searchVal.toLowerCase())))
    );
      }

      
      
    let statusDropDownState=[];
    let checkState=[];
    let resumeDropState = [];
    let followUpDate = [];
    let applyDate=[];
    for(let i=0;i<filteredStats.length;i++){
        statusDropDownState.push(false);
        checkState.push(false);
        resumeDropState.push(false);
        followUpDate.push(filteredStats[i].rowData.followUpDate);
        applyDate.push(filteredStats[i].rowData.appliedDate);
    }
    const [drop,setDrop] = React.useState(statusDropDownState);
    const [resumeDrop,setResumeDrop] = React.useState(resumeDropState);
    const [check,setCheck] = React.useState(checkState);
    function changeDrop (index) {
      
        const nextDrop = drop.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return false;
            }
        });
        setDrop(nextDrop);
    }


    function changeResumeDrop (index) {
        const nextResumeDrop = resumeDrop.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return false;
            }
        });
        setResumeDrop(nextResumeDrop);
    }

    function changeCheck(index,rowId) {
        const nextDrop = check.map((c,i) =>{
            if(i===index){
                return !c;
            } else{
                return c;
            }
        });
        let cnt=0;
        nextDrop.map((c,i) =>{
            if(c){
                cnt++;
            }
        });
        if(props.delArray.includes(rowId)){
            const newDel  = props.delArray.filter((stat) => stat!==rowId)
            props.setDel(newDel);
        }
        else{
            props.setDel([...props.delArray,rowId])
        }
        props.setCheck(cnt);
        
        setCheck(nextDrop);
    }


    
    function handleHover(){
        setHover(!hovered);
    }
    // var date = new Date(parse);
    const [close,setClose] =React.useState(true);
    const [startDate,setStartDate] = React.useState(followUpDate);
    const [appliedDate,setApplyDate] = React.useState(applyDate);

    function changeDate(index,date){
        const nextDrop = startDate.map((c,i) =>{
            if(i===index){
                return date;
            } else{
                return c;
            }
        });
        setStartDate(nextDrop)
    }

    function changeApplyDate(index,date){
        const nextDrop = appliedDate.map((c,i) =>{
            if(i===index){
                return date;
            } else{
                return c;
            }
        });
        setApplyDate(nextDrop)
    }

    function closing(){
        setClose(true);
    }

    function opening(){
        if(close){
            setClose(false);
        }
    }

    


    const allValues=[];
    filteredStats.map((_,index)=>{
        let x=[];
        extraColumnsNonHidden.map((_,index2) =>{
            x.push(false);
        });
        allValues.push(x);
    });

    const[dropDownTable,setTable]=React.useState(allValues);
    function dropTableHandler(index,j){
        const nextDropTable = dropDownTable.map((row,i) => {
            return row.map(( ele,ji) => {
                if(index===i && ji===j){
                    return !ele;
                }
                else{
                    return false;
                }
            });
        }
    );
        setTable(nextDropTable);
        }

        
        // const[fStats,setStats] = React.useState(filteredStats);

        // const sortByDate=()=>{
        //     const newStat = [...fStats];
        //     newStat.sort((a,b) => {
        //         return b.id-a.id;
        //     })
        //     setStats(newStat);
        // }
        // const handleDrops = () =>{
        //     setDrops(!drops);
            // if(drops){
            //     sortByDate();
                
            // }
        // }
       const [remCheck,setRemCheck] = React.useState(false);
       function handleRem (checked) {
        setRemCheck(checked);
       }

       async function updateDashboardDate(rowid,columnName,value){
        const newCollections =  collection.map((stat) => {
            if(stat.id === rowid){
            return {
                ...stat,
                rowData: {
                    ...stat.rowData,
                    [columnName]: new Date(value),
                },
            };
            }
            else{
                return stat;
            }
        })

        try {
            if (!email) return;
            const response = await axios.put(
              `${process.env.REACT_APP_API_URL}/dashboard/rows/${rowid}`, { email,columnName,value }
            );
            if (response.data.success) {
                setCollection(newCollections);
            }
            else{
                window.location.reload();
            }
          } catch (error) {
            console.error("Error updating rows:", error);
          }
       }

       async function updateDashboard(rowid,columnName,event){
        const value = event.target.value;
        const newCollections =  collection.map((stat) => {
            if(stat.id === rowid){
            return {
                ...stat,
                rowData: {
                    ...stat.rowData,
                    [columnName]: value,
                },
            };
            }
            else{
                return stat;
            }
        })

        try {
            if (!email) return;
            const response = await axios.put(
              `${process.env.REACT_APP_API_URL}/dashboard/rows/${rowid}`, { email,columnName,value }
            );
            if (response.data.success) {
                setCollection(newCollections);
            }
            else{
                window.location.reload();
            }
          } catch (error) {
            console.error("Error updating rows:", error);
          }
       }

       async function updateDashboardDrop(rowid,columnName,value){
        const newCollections =  collection.map((stat) => {
            if(stat.id === rowid){
            return {
                ...stat,
                rowData: {
                    ...stat.rowData,
                    [columnName]: value,
                },
            };
            }
            else{
                return stat;
            }
        })

        try {
            if (!email) return;
            
            const response = await axios.put(
               `${process.env.REACT_APP_API_URL}/dashboard/rows/${rowid}`, { email,columnName,value }
            );
            if (response.data.success) {
                setCollection(newCollections);
            }
            else{
                window.location.reload();
            }
          } catch (error) {
            console.error("Error inserting saved jobs:", error);
          }
       }
       
    return(
        <div className="scrolling">
            <table className="wholeTable">
                <thead >
                    <tr className="tableHead">
                        <td>
                            <div className="checker">
                            </div>
                        </td>
                        <td>
                            <div className="nonChecker">
                            Company Name
                            </div>
                            </td>
                        <td>
                        <div className="nonCheckerF">
                            <div className="checkApplied"onMouseEnter={handleHover} onMouseLeave={handleHover}>
                                <p >Apply Date</p>
                                <img onClick={() => setCollection([...collection].sort(sortByAppDate))} src="./images/upDown.png"></img>
                                
                            </div>
                            {/* {drops && (<div className="dropDownContent">
                                <p className="today" >Today</p>
                                <p className="today" >Yesterday</p>
                                <p className="today" >Last 7 days</p>
                                <p className="today" >This Month</p>
                            </div>)
                            } */}
                            </div>
                        </td>
                        <td><div className="nonChecker"><p>Role</p></div></td>
                        <td><div className="nonChecker"><p>Status</p></div></td>
                        <td><div className="nonChecker"><p>Resume</p></div></td>
                        <td>
                        <div className="nonCheckerF">
                            <div className="checkApplied"onMouseEnter={handleHover} onMouseLeave={handleHover}>
                                <p >Follow Up Date</p>
                                <img onClick={() => setCollection([...collection].sort(sortByRevDate))} src="./images/upDown.png"></img>
                                
                            </div>
                            {/* {drops && (<div className="dropDownContent">
                                <p className="today" >Today</p>
                                <p className="today" >Yesterday</p>
                                <p className="today" >Last 7 days</p>
                                <p className="today" >This Month</p>
                            </div>) */}
                            {/* } */}
                            </div>
                        </td>
                        {extraColumnsNonHidden.map((Column, index) => (
                            <td>
                                <div className="nonChecker">{Column.columnName}</div></td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {collection.filter(stat => (value.value!=="All" ? stat.rowData.status === value.value : true)
             && (aLessThanb(props.range[0],new Date(stat.rowData.appliedDate))) && 
             (aGreatThanb(props.range[min(1,props.range.length-1)],new Date(stat.rowData.appliedDate)))
             &&
             ((stat.rowData.role.toLowerCase().includes(props.searchVal.toLowerCase()))
            || (stat.rowData.companyName.toLowerCase().includes(props.searchVal.toLowerCase())))).map((stat, index) => (
                    <tr>
                        <td >
                            <div className="checker">
                            <input type="checkbox" checked={check[index]} onChange={changeCheck.bind(this,index,stat.id)} className="check"></input>
                            </div>
                            </td>
                        <td tabIndex="0">
                            <div className="textEdit"  >
                            <input title={stat.rowData.companyName} type="text" defaultValue={stat.rowData.companyName} onChange={(e) => {updateDashboard(stat.id,"companyName",e)}}></input>
                            </div>
                            </td>
                        <td className="appDate" >
                            <div onClick={opening} className={close ? "noWrap":"myWrapper"}>
                                <DatePicker  popperPlacement="bottom" popperProps={{strategy :"fixed"}}  dateFormat="MMM dd, yyyy" onChange={(e) => {changeApplyDate.bind(this,index);updateDashboardDate(stat.id,"appliedDate",e)}}  selected={stat.rowData.appliedDate} className="datePicker">
                                </DatePicker>
                            </div>
                        </td>
                        <td><div className="textEdit">
                            <input title={stat.rowData.role} type="text" defaultValue={stat.rowData.role} onChange={(e) => {updateDashboard(stat.id,"role",e)}}></input>
                            </div></td>
                        <td className="dropDown">
                        <div className="textEdit">
                            <p className={stat.rowData.status} onClick={changeDrop.bind(this,index)}>{stat.rowData.status}</p>
                             {drop[index] && (<div className="dropDown-content">
                                <p className="Status">STATUS</p>
                                <p className="Applied" onClick={() => {changeDrop.bind(this,index)();updateDashboardDrop(stat.id,"status","Applied")}}>Applied</p>
                                <p className="Rejected" onClick={() => {changeDrop.bind(this,index)();updateDashboardDrop(stat.id,"status","Rejected")}}>Rejected</p>
                                <p className="Selected" onClick={() => {changeDrop.bind(this,index)();updateDashboardDrop(stat.id,"status","Selected")}}>Selected</p>
                                <p className="Interviewing" onClick={() => {changeDrop.bind(this,index)();updateDashboardDrop(stat.id,"status","Interviewing")}}>Interviewing</p>
                            </div>)}
                            </div>
                            </td>
                        <td className="resumeDrop">
                             <div className="textEdit">
                                <div className="resumes" onClick={changeResumeDrop.bind(this,index)}>
                                    <img src="./images/pdf.jpg"></img>
                                    <p>{stat.rowData.resume}</p>
                                    
                                </div>
                                {resumeDrop[index] && (<div className="resumeDrop-content">

                                    {resumes.map((c,i) => (
                                        <div className="eachBox">
                                            <p onClick={() => {changeResumeDrop.bind(this,index)();updateDashboardDrop(stat.id,"resume",c)}}>{c}</p>
                                            <img src="./images/downloads.png"></img>
                                        </div>

                                    ))}
                                </div>)}
                                </div>
                        </td>
                        <td>
                            <div onClick={opening} className={close ? "noWrap":"myWrapper"}>
                            <DatePicker popperPlacement="bottom" popperProps={{strategy :"fixed"}} dateFormat="MMM dd, yyyy" onChange={(e) => {changeDate.bind(this,index);updateDashboardDate(stat.id,"followUpDate",e)}}
                            shouldCloseOnSelect={false} selected={stat.rowData.followUpDate} className="datePicker">
                                <div>
                                <div className="remainder">
                                    <div className="remClock">
                                    <img src="./images/clock.png"></img>
                                    <p>Remind</p>
                                    </div>
                                    <div>
                                        <Switch onChange={handleRem} checked={remCheck} onColor="#2563EB" ></Switch>
                                    </div>
                                </div>
                                <div className="calendarButton">
                                    <button className="cancelButton" onClick={closing}>Cancel</button>
                                    <button className="submitButton" onClick={closing}>Apply</button>
                                </div>
                                </div>
                            </DatePicker>
                            </div>
                        </td>
                        {extraColumnsNonHidden.map((Column, j) => (
                                <td key={j}>
                                    <div className="textEdit">
                                    {(()=>{
                                        if( (Column.columnType).toString() === "name"){
                                            return <input type="text" title={stat.rowData[Column.columnName]} onChange={(e) => {updateDashboard(stat.id,Column.columnName,e)}} value={stat.rowData[Column.columnName]}></input>
                                         }
                                         else if( (Column.columnType).toString() === "date"){
                                            return <div onClick={opening} className={close ? "noWrap":"myWrapper"}>
                                            <DatePicker  dateFormat="MMM dd, yyyy"  className="datePicker">
                                            </DatePicker>
                                        </div>
                                         }
                                         else if((Column.columnType).toString() ==="dropDown"){
                                            return <div className="resumes" onClick={dropTableHandler.bind(this,index,j)}>
                                            <p></p>
                                            {dropDownTable[index][j] && (<div className="resumeDrop-content">
                                                {Column.options.map((c,i) => (
                                                    <div className="eachBox">
                                                        <p onClick={dropTableHandler.bind(this,index,j)}>{c}</p>
                                                    </div>
                                                ))}
                                            </div>)}
                                            </div>
                                        }
                                        else {
                                            return null
                                        }
                                    })()}
                                    </div>
                                </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
