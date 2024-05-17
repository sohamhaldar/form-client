"use client"
import {React, useState,useEffect } from "react";
import  Form  from "@/components/form";
import TableComponent from "@/components/table";
import axios from "axios";
import url from "@/utils/url";
import { NoEntry } from "@/components/noentry";
import Modal  from "@/components/modal";

const Page=()=>{
    const [data,setData]=useState();
    const [checkedRows, setCheckedRows] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isUpdate,setUpdate]=useState(false);
    const [prevData,setPrevData]=useState({});
    
  const handleSendMail = () => {
    const checkedData = Object.keys(checkedRows).filter(item => checkedRows[item]);
    const filteredList = data.filter(item => checkedData.includes(item._id));
    const mailBody = `
                Serial Number Name Phone Email Hobbies
              ${filteredList.map((item, index) => `
                  ${index + 1} ${item.name} ${item.phone} ${item.email} ${item.hobbies}
              `).join('')}      
    `;
    const body = encodeURIComponent(mailBody);
    console.log(body);
    window.location.href = `mailto:info@redpositive.in?subject=Selected Rows Data&body=${body}`;
  };

    const handleAddEntryClick = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const getEntry=async()=>{
      const res=await axios.get(`${url}/entries`);
      console.log(res.data.tables);
      setData(res.data.tables);
    }
    useEffect(()=>{
      getEntry();
    },[])

    const handleUpdateEntry = (updatedData) => {
        setUpdate(true);
        const checkedData = Object.keys(checkedRows).filter(item => checkedRows[item]);
        const filteredList = data.filter(item => checkedData.includes(item._id));
        setPrevData(filteredList);
        console.log(filteredList);
        setShowModal(true);
      };
    
      const handleDeleteEntry = (deletedData) => {
        console.log(deletedData);
        const filteredList = data.filter(item => item.email !== deletedData.email);
        setData(filteredList);
      };
      const deleteCheckedData=async()=>{
        console.log(checkedRows);
        const checkedData = Object.keys(checkedRows).filter(item => checkedRows[item]);
        console.log(checkedData);
        const filteredList = data.filter(item => !checkedData.includes(item._id));
        setData(filteredList);
        const res=await axios.post(`${url}/delete`,{ids:checkedData});
        console.log(res);
        setCheckedRows({});
      }

    return(
      <div class="bg-cover w-screen h-screen flex flex-col justify-center items-center relative " style={{ backgroundImage: 'url(/cool-background.png)' }}>
        <div className="h-[20%] w-full flex ">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
              <div className="h-[80%] w-[80%] bg-slate-50 rounded-lg flex justify-around items-center">
                <button onClick={handleAddEntryClick} className="h-[50%] flex justify-normal items-center rounded-md text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-3 py-2.5 ">
                      <img src="/add-circle.svg" className="h-[90%] m-1" />
                    Add Entry
                </button>
                <button
                  onClick={deleteCheckedData}
                  className={`h-[50%] flex justify-end items-center rounded-md text-white ${Object.keys(checkedRows).filter(item => checkedRows[item]).length === 0? 'bg-gray-500 hover:bg-gray-500' : 'bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br'} focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium text-sm px-3 py-2.5`}
                  disabled={Object.keys(checkedRows).filter(item => checkedRows[item]).length === 0}
                >
                  <img src="/delete.svg" className="h-[80%] m-1" />
                  Delete
                </button>
                  
                <button  disabled={Object.keys(checkedRows).filter(item => checkedRows[item]).length > 1||Object.keys(checkedRows).filter(item => checkedRows[item]).length==0} onClick={handleUpdateEntry} className={`h-[50%] flex justify-normal items-center rounded-md text-white ${Object.keys(checkedRows).filter(item => checkedRows[item]).length > 1||Object.keys(checkedRows).filter(item => checkedRows[item]).length ==0? 'bg-gray-500 hover:bg-gray-500' : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br'} focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-3 py-2.5`}>
                  <img src="/update.svg" className="h-[90%] m-1" />

                  Update
                </button>
                <button
                  onClick={handleSendMail}
                  className={`h-[50%] flex justify-end items-center rounded-md text-white ${Object.keys(checkedRows).filter(item => checkedRows[item]).length === 0? 'bg-gray-500 hover:bg-gray-500' : 'bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br'} focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium text-sm px-3 py-2.5`}
                  disabled={Object.keys(checkedRows).filter(item => checkedRows[item]).length === 0}
                >
                  <img src="/delete.svg" className="h-[80%] m-1" />
                  Mail
                </button>
              </div>
            </div>
        </div>
        <div className="h-[80%] w-full flex justify-center">
        {data?<TableComponent data={data} onUpdate={handleUpdateEntry} onDelete={handleDeleteEntry} setRows={setCheckedRows} updateData={getEntry}/>:
              <div role="status" className="h-full w-full flex justify-center items-center">
                  <svg aria-hidden="true" class="w-10 h-10  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
              </div>
}
          
        </div>
        {showModal && (
        <Modal onClose={handleCloseModal} className=''>
          {isUpdate?<Form onClose={handleCloseModal} isUpdate={true} prevData={prevData} updateData={getEntry}/>:<Form onClose={handleCloseModal} updateData={getEntry} isUpdate={false}/>}
        </Modal>
      )}
      </div>
      
    
  );
};

export default Page;