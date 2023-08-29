import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import Link from 'next/link';

const Navbar= () => {

  // const [name, setName] = useState<string>("")

  // const getBasicInfo = () => {
  //   const storedBasicInfo: string | null = localStorage.getItem("basicInfo");
  //   if (storedBasicInfo) {
  //     const basicInfoObject = JSON.parse(storedBasicInfo);
  //     const storedName = basicInfoObject.name;
  //     const storedAge =basicInfoObject.age;
  //     console.log("Stored Name:", storedName); // Check if storedName is extracted
  //     console.log("Stored Age:", storedAge);
      
  //     if (storedName) {
  //       setName(storedName);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getBasicInfo();
  // },)
  



  return (
    <header className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link href={'/'} className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
          <img className="mx-auto w-48" src="./logo.png" alt="logo" />
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
          <Link href={'/'} className="mr-5 hover:text-gray-900">Home</Link>
          <Link href={'/pricing'} className="mr-5 hover:text-gray-900">Pricing</Link>
          <Link href={'/exercise'} className="mr-5 hover:text-gray-900">Exercise</Link>
        </nav>
        <Modal />
      </div>
    </header>
  );
}

export default Navbar