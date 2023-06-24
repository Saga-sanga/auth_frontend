import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import './modalOTP.css';
interface ModalProps { 
 
  handleForm: (e: React.MouseEvent<HTMLSpanElement>) => void;
  add: string;
}

const Modal: React.FC<ModalProps> = ({ handleForm, add }) => {
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAlert(false);
    if (otp.length === 8) {
      handleOTPForm();
    }
  }, [otp]);


  const handleOTPForm = () => {
    setAlert(false);
    console.log(otp, add);
    fetch("https://api.trustauthx.com/forgot/verify_email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        add: add,
        types: "string",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
       
        if (data.status === 200 && data.is_ok === true) {
          navigate("/");
        }
        else if (data.detail) {
          setMessage("Invalid OTP")
          setAlert(true)

        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      <div className="absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] bg-white flex flex-col justify-center items-center p-8 w-[90vw] sm:w-3/4 md:w-1/2 lg:1/3 rounded-lg z-20 ">
        <p className="text-sm mx-auto text-center md:text-left">
          Please check your email for a reset password OTP. You can reset password{" "}
          <span className="text-blue-400">by entering OTP</span> in the designated column. If you didn't receive an email, click I didn't receive email
        </p>
        <h2 className="text-2xl m-4">Enter e-mail OTP</h2>
        
                <OtpInput
                    containerStyle="flex justify-center gap-1 md:gap-4"
                    inputStyle="modal-otp-width h-8 sm:h-9 md:h-10 p-0 text-center rounded-xl"
                    value={otp}
                    onChange={setOtp}
                     numInputs={8}
                     renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                 />
                 {alert && <p className="text-red-500 mt-4" >{message}</p>}

                     
          <div className="flex w-full mt-9">
           
          <span className="cursor-pointer  text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600" 
          onClick = {handleForm} >I didn't receive Email &gt;</span>
        </div>
      </div>
    </>
  );
};

export default Modal;
