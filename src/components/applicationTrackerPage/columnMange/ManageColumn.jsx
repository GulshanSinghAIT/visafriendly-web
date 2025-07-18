import React, { useState } from 'react';
import styles from './ManageColumn.module.css'; 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from 'react';
import API_CONFIG from '../../../config/api';

const ColumnDialog = (props) => {
  const [selectedOption, setSelectedOption] = useState('add');
  const [fieldName, setFieldName] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [columns,setColumnsAll] = React.useState([]);
  const [originalExtra,setExtra] = React.useState([]);

  const [visColumnArray,setVis] = React.useState([]);
  const [delColumnArray,setDelCol] = React.useState([]);
  const [delColumnNames,setDelColName] = React.useState([]);


  const { user } = useUser();
        const email = user?.emailAddresses[0]?.emailAddress;
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        if (!email) return;
       
        const response = await axios.get(
          API_CONFIG.ENDPOINTS.DASHBOARD.COLUMNS,{
            params : { email },
          }
        );

        if (response.data.success) {
            setColumnsAll(response.data.cols);
            setExtra(response.data.cols);
        }
      } catch (error) {
        console.error("Error fetching extra columns:", error);
      } 
    };
    fetchSaved();
  }, [email]);
  
  async function actionButtonHandler(selectedOption){

    if(selectedOption == "add"){
      try {
        if (!email) return;
     
        const response = await axios.post(
          API_CONFIG.ENDPOINTS.DASHBOARD.COLUMNS, { email, fieldName , selectedProperty }
        );
        if (response.data.success) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error inserting column:", error);
      }
    }
    else{
      try {
        if (!email) return;
      
        const response = await axios.put(
          API_CONFIG.ENDPOINTS.DASHBOARD.COLUMNS, { email, visColumnArray}
        );
        if (response.data.success) {
          
        }
      } catch (error) {
        console.error("Error inserting column:", error);
      }


      delColumnArray.map((stat,index) => {
        const colname =delColumnNames[index];
        async function dele(stat) {
        try {
          if (!email) return;
         
          const response = await axios.delete(
            API_CONFIG.ENDPOINTS.DASHBOARD.COLUMN_BY_ID(stat),{
              data: { email : email,
                colname:  colname }
            } 
          );
          if (response.data.success) {
            
          }
        } catch (error) {
          console.error("Error inserting column:", error);
        }
        }
        dele(stat);
      })
      window.location.reload();

    }
  }

  function changeHandler(index){


    const newColums = [...columns]
    const stat = newColums.find(
      (_,ind) => ind===index
    );
    stat.status = !stat.status;
    if(visColumnArray.includes(stat.id)){
      setVis(visColumnArray.filter(a=> a !== stat.id))
    }
    else{
      setVis([...visColumnArray,stat.id]);
    }
  
    setColumnsAll(newColums);
  }

  function columnDelHandler(colId,colName){
    setColumnsAll(
      columns.filter(a => a.id !== colId)
    );
    setDelCol([...delColumnArray,colId])
    setDelColName([...delColumnNames,colName])
  }

  function cancelHandler(){
    setColumnsAll(originalExtra);
  }

  const handleOptionChange = (e) => setSelectedOption(e.target.value);

  return (
    <div className={styles.addCol}>
      <Popup trigger={      <button className={styles.addColumn}><p>Manage Column</p></button>
} position="center center" modal>
                    {closeCol =>(
                      <div className={styles.dialogBox}>
                      <div className={styles.dialogHeader}>
                        <h3>Column</h3>
                        <button className={styles.closeButton} onClick={closeCol}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 4L4 12" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 4L12 12" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
            
                      <div className={styles.dialogBody}>
                        <div className={styles.toggleButtons}>
                          <label>
                            <input 
                              type="radio" 
                              name="dialogOption" 
                              value="add" 
                              checked={selectedOption === 'add'}
                              onChange={handleOptionChange}
                            />
                            <div>New Column</div>
                          </label>
                          <label>
                            <input 
                              type="radio" 
                              name="dialogOption" 
                              value="manage" 
                              checked={selectedOption === 'manage'}
                              onChange={handleOptionChange}
                            />
                            <div>Visibility/Delete</div>
                          </label>
                        </div>
            
                        {selectedOption === 'add' ? (
                          <div className={styles.content}>
                            <form className={styles.form}>
                              <label htmlFor="fieldName">Column Name</label>
                              <div className={styles.styledInput}>
                                <input 
                                  type="text" 
                                  id="fieldName" 
                                  placeholder="Enter Column Name"
                                  value={fieldName}
                                  onChange={(e) => setFieldName(e.target.value)}
                                />
                              </div>
                              <label htmlFor="selectProperty">Select Property</label>
                              <div className={styles.styledSelect}>
                                <select 
                                  id="selectProperty" 
                                  value={selectedProperty}
                                  onChange={(e) => setSelectedProperty(e.target.value)}
                                >
                                  <option value="" disabled>Select Property</option>
                                  <option value="name">Text</option>
                                  <option value="name">Number</option>
                                </select>
                                <div className={styles.dropdownArrow}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div className={styles.content}>
                            <div className={styles.tableContainer}>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Column</th>
                                    <th>Show In Table</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {columns.map((column, index) => (
                                    <tr key={index}>
                                      <td>{column.columnName}</td>
                                      <td>
                                        <input 
                                          type="checkbox" 
                                          checked={column.status}
                                          onChange={() =>{changeHandler(index)}}
                                        />
                                      </td>
                                      <td>
                                        <button className={styles.deleteButton} onClick={() => {columnDelHandler(column.id,column.columnName)}}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 6H21" stroke="#545251" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="#545251" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="#545251" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
            
                      <div className={styles.dialogFooter}>
                        <button className={styles.cancelButton} onClick={() => {cancelHandler();closeCol()}}>
                          Cancel
                        </button>
                        <button className={styles.actionButton} onClick={() => {actionButtonHandler(selectedOption);closeCol();}}>
                          {selectedOption === 'add' ? 'Add Column' : 'Manage Column'}
                        </button>
                      </div>
                    </div>
                    )}
                    </Popup>
     
    </div>
  );
};

export default ColumnDialog;
