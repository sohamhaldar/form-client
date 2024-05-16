"use client"
import { useState } from "react";
import axios from "axios";
import url from "@/utils/url";
const Form=({ onClose,isUpdate,prevData ,updateData})=>{
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        hobbies:''
      });
      

      const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit=async(formData)=>{
    const { name, phoneNumber, email, hobbies } = formData;
    console.log(formData)
    const res=await axios.post(`${url}/add`,{name, phoneNumber, email, hobbies});
    console.log(res);
    onClose();
    updateData();
  }
  const onUpdate=async()=>{
    console.log(formData);
    const { name, phoneNumber, email, hobbies } = formData;
    const id=prevData[0]._id;
    const update={
      name, phoneNumber, email, hobbies
    }
    console.log(update)
    const res=await axios.post(`${url}/update`,{id,update})
    console.log(res);
    onClose();
    updateData();

  }
  const close=()=>{
    setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        hobbies: ''
      })
    onClose()

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
    return(
    <form onSubmit={handleSubmit} className=" rounded-lg w-full h-[80%] flex flex-col justify-center items-center relative border-4 bg-gradient-to-r from-violet-600 to-fuchsia-500">
        <div className="w-full h-[20%] p-3">
            <h1 className="font-bold tracking-wide text-slate-200 text-3xl">FORM</h1>
        </div>
        <div className="w-[70%] h-[70%] flex flex-col justify-center items-center relative">
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" onChange={handleChange} name="name" id='name'  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="name" class="peer-focus:font-medium absolute text-sm text-slate-100 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-100 peer-focus:dark:text-slate-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="tel"  onChange={handleChange} pattern="[0-9]{3}[0-9]{3}[0-9]{4}" name="phoneNumber" id="phoneNumber" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="phoneNumber" class="peer-focus:font-medium absolute text-sm text-slate-100 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-100 peer-focus:dark:text-slate-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="email" name='email' onChange={handleChange}  id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="email" class="peer-focus:font-medium absolute text-sm text-slate-100 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-100 peer-focus:dark:text-slate-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="hobbies"  onChange={handleChange} id="hobbies" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="hobbies" class="peer-focus:font-medium absolute text-sm text-slate-100 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-100 peer-focus:dark:text-slate-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hobbies</label>
            </div>
            
        </div>
        <div className="w-full h-[10%] bg-cover p-4 flex justify-between">
        {isUpdate?<button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={onUpdate}>Update</button>:<button type="submit" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>}

        
        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={close}>Close</button>
        </div>
           
      
    </form>
    ); 

}
export default Form;