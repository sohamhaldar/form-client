"use client"
import { useState } from 'react';
import Modal from './modal';
import Form from './form';

const NoEntry = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddEntryClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='bg-cover w-[90%] h-[60%] bg-slate-100 flex flex-col justify-center items-center rounded-lg p-4'>
      <div className='flex justify-center w-full items-center m-4'>
        <h1 className='font-semibold tracking-wide text-2xl text-gray-500'>No Entries in Table</h1>
      </div>
      
      <div className='flex justify-center w-full m-4'>
        <button className='p-3 bg-green-500 rounded-lg tracking-wide text-slate-100 hover:bg-green-600' onClick={handleAddEntryClick}>Add Entry</button>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal} className=''>
          <Form onClose={handleCloseModal}/>
        </Modal>
      )}
    </div>
  );
};

export default NoEntry;