import React, { useState } from 'react'
import ProfileForm from './ProfileForm';


const Modal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };

    const closeModal = () => {
        setIsModalOpen(false);
      };

  return (
    <div>
      {/* Modal toggle */}
      <button
        onClick={openModal}
        className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        type="button"
      >
        Create Profile
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 w-full h-full bg-opacity-75 bg-gray-900"
        >
          <div className="flex items-center justify-center h-full">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 max-w-md mx-auto p-6">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              {/* Include your profile form here */}
              <form className="space-y-6" >
                <ProfileForm />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Modal