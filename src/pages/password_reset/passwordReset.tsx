import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";

 
import logo from './logo.svg';
import image from './group.svg';

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email.length>0){
      navigate({
        pathname: '/new-password',
        search: createSearchParams({
          email: email,
        }).toString(),
      });
    }else{
      
    }
   
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-full w-full md:w-3/5 my-20 md:my-0">
        <div className="absolute top-4 left-4 md:top-8 md:left-8 w-10 md:w-20">
          <img src={logo} alt="logo" />
        </div>
        <div className="w-[90vw] sm:w-3/4  md:w-1/2 lg:w-1/2">
          <h2 className="text-left text-2xl md:text-4xl mb-4 font-semibold">Reset Password</h2>
        </div>

        <form className="flex flex-col w-full items-center justify-center text-left" onSubmit={handleForm}>
          <div className="relative w-[90vw] sm:w-3/4  md:w-1/2 lg:w-1/2 my-4 flex items-center">
            <input
              type="text"
              id="email"
              className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-2"
              placeholder="name@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute translate-x-5 translate-y-[-29px] bg-white text-xl"
            >
              Email
            </label>
          </div>
              <button
                  type="submit"
                  className="btn btn-spl-primary py-2 px-4 w-[90vw] sm:w-3/4  md:w-1/2 lg:w-1/2 mb-4  btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
                    >
                    <span>Next</span>
                    <span className="forward-arr">
                        {" "}
                      <FaAngleRight className="ca-forward-arr text-2xl mt-[2px]" />
                    </span>
              </button>

        </form>
               <div className="ats-content mt-4 md:mt-11 mx-auto text-center md:text-left ">
                  <p className="mb-0 text-xl flex items-center justify-center flex-wrap">
                  I remember AuthX password &nbsp;
                    <Link
                      className="a-t-s a-link text-xl flex items-center"
                      to="/"
                    >
                      advance to Login{" "}
                      <span className="forward-arr arr-black">
                        {" "}
                        <FaAngleRight className="pt-1 text-2xl" />
                      </span>
                    </Link>
                  </p>
                </div>
      
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-2/5 md:mt-0 bg-black text-white">
        <p className="text-2xl md:text-3xl my-5 mx-auto text-center md:text-left">AuthX: Ensure Security at every level</p>
        <img src={image} alt="" className="w-72" />
        <div className='w-full  pb-8 text-right px-3'>
         <span>© 2023 TrustAuthx. All rights reserved.</span> 
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;










