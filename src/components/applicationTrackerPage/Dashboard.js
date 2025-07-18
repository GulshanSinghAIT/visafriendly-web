import React, { useEffect } from "react";
import "./Dashboard.css";
import { Header } from "../profile/header/Header";
import { ApplicationProgressOverview } from "./applicationOverview/ApplicationProgressOverview";
import { Table } from "./table/Table";
import { Calendar, DateObject } from "react-multi-date-picker";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { CSVLink } from "react-csv";
import ColumnDialog from "./columnMange/ManageColumn";
import JobApplicationModal from "./popUpForm/addJobApplication";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { LoadingLogo } from "../loadingPage/LoadingLogo";

const countContext = React.createContext();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function Dashboard() {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [extraColumns, setextra] = React.useState([]);
  const [defaultStats, setDefault] = React.useState([]);
  const [isSuccess, setSuccess] = React.useState(false);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!email) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/dashboard/rows`,
          {
            params: { email },
          }
        );

        if (response.data.success) {
          setDefault(response.data.rows);
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error fetching dashboard rows:", error);
      }
    };

    fetchDashboard();
  }, [email]);

  const csvData = [];
  const [value, setValue] = React.useState("All");
  const [check, setCheck] = React.useState(0);
  const [delArray, setDel] = React.useState([]);
  const startDate = new DateObject("Jan 1, 1941");
  const endDate = new DateObject();
  startDate.year = 1941;

  const [num, setNum] = React.useState(1);
  const [range, setRange] = React.useState([startDate, endDate]);

  const [dateClick, setDate] = React.useState(false);
  function dateClicker() {
    setDate(!dateClick);
  }

  useEffect(() => {
    if (range.length == 2) {
      setDate(false);
    }
  }, [range]);

  function min(a, b) {
    if (a >= b) {
      return b;
    }
    return a;
  }
  const [searchVal, setSearchVal] = React.useState("");

  async function delRowsHandler() {
    try {
      if (!email) return;

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/dashboard/rows`,
        {
          data: { email: email, delArray: delArray },
        }
      );
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  }
  return (
    <countContext.Provider value={{ value, setValue }}>
      {isSuccess ? (
        <div className="dashboard">
          <Header />
          <main className="dashboard-content">
            <div className="dash">
              <div className="content-header">
                <h1 className="title">Application Progress Overview</h1>
                <JobApplicationModal></JobApplicationModal>
              </div>
              <ApplicationProgressOverview context={countContext} />
              <div className="filters">
                <div className="start">
                  <input
                    className="SearchBar1"
                    type="text"
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search Role, Company"
                  ></input>
                  <div className="Range">
                    <div className="rangeFilter">
                      <p>
                        {months[range[0].month.number - 1]} {range[0].day} -{" "}
                        {
                          months[
                            range[min(1, range.length - 1)].month.number - 1
                          ]
                        }{" "}
                        {range[min(1, range.length - 1)].day}
                      </p>

                      <img
                        src="./images/chevron-down.png"
                        onClick={dateClicker}
                      ></img>
                    </div>
                    {dateClick && (
                      <div className="dateRangePicker">
                        <Calendar
                          value={range}
                          onChange={setRange}
                          className="datePickerRange"
                          range
                          rangeHover
                        ></Calendar>
                      </div>
                    )}
                  </div>
                  <div>
                    {check > 0 && (
                      <div className="Delete">
                        <p className="DeleteTxt">{check} Selected</p>

                        <hr></hr>
                        <div className="dele">
                          <Popup
                            trigger={<img src="./images/trash.png"></img>}
                            position="center center"
                            modal
                          >
                            {(close) => (
                              <div className="delPopUp">
                                <div className="delIcon">
                                  <img src="./images/trash-2.png"></img>
                                </div>
                                <div className="delContent">
                                  <h2>Are you sure you want to delete? </h2>
                                  <div>
                                    This action cannot be undone. The item will
                                    be permanently deleted.
                                  </div>
                                </div>
                                <div className="delButtons">
                                  <button className="cancelBut" onClick={close}>
                                    Cancel
                                  </button>
                                  <button
                                    className="submitBut"
                                    onClick={() => {
                                      close();
                                      delRowsHandler();
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </div>
                        {/* <Popup trigger={<img src="./images/eye-off.png" ></img>} position="center center" modal>
              {close =>(
                <div className='delPopUp'>
                  <div className='delIcon'>
                    <img src='./images/eye-off-2.png'></img>
                  </div>
                  <div className='delContent'>
                    <h2>Are you sure you want to delete? </h2>
                    <div>Hiding this item will make it invisible but it can be restored later if needed.</div>
                  </div>
                  <div className='delButtons'>
                    <button className='cancelBut' onClick={close}>Cancel</button>
                    <button className='submitBut' onClick={close}>Hide</button>
                  </div>
                </div>
              )}
              </Popup> */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="end">
                  <ColumnDialog extraColumns={extraColumns}></ColumnDialog>
                  <div className="downloadImage">
                    <CSVLink data={csvData}>
                      {" "}
                      <img src="./images/download.png"></img>
                    </CSVLink>
                  </div>
                </div>
              </div>
              <Table
                delArray={delArray}
                setDel={setDel}
                range={range}
                searchVal={searchVal}
                context={countContext}
                stats={defaultStats}
                setCheck={setCheck}
                extraColumns={extraColumns}
                setextra={setextra}
              />
            </div>
          </main>
        </div>
      ) : (
        <LoadingLogo/>
      )}
    </countContext.Provider>
  );
}
