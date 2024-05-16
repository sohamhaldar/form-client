import { useState } from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg w-[60%]'>
        {children}
      </div>
    </div>
  );
};

export default Modal;