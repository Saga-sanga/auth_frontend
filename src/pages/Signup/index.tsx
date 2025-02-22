import React, { useState, useEffect } from "react";
import { LuXCircle } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import logo from "./images/logo.svg";
import graphics from "./images/signup-graphic.svg";
import OtpInput from "react-otp-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { createRipple } from "../../helper/createRipple";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// TS types
type RequestObjectType = {
  username: FormDataEntryValue;
  password: FormDataEntryValue;
  full_name: string;
  is_pool: boolean;
  link: boolean;
  ref: string;
  types: string;
};

type RegisterUser = {
  username: string;
  password: string;
  "referral-id": string | null | undefined;
  agreeTerms: boolean | undefined;
};

//yup schema
const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter a password").min(8),
    "referral-id": yup.string().nullable(),
    agreeTerms: yup
      .boolean()
      .oneOf([true], "Please accept our Terms of Service and Privacy policy"),
  })
  .required();

// TODO: debounce I have not received email button
const SignUp = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [messageToken, setMessageToken] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [requestObject, setRequestObject] = useState<RequestObjectType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
  });

  // Alert component
  const AlertMessage = ({ message }: { message: string }) => {
    return (
      <Alert className="fixed top-6 w-96 bg-yellow-400 z-[1100]">
        <AlertTitle>Notice!</AlertTitle>
        <button
          onClick={() => setAlert(false)}
          className="absolute right-2 top-2"
        >
          <LuXCircle className="w-5 h-5" />
        </button>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  };

  // OTP action
  useEffect(() => {
    if (otp.length === 8) {
      console.log("verifying OTP", otp);
      setLoading(true);
      handleOTPValidation();
    }
  }, [otp]);

  // Execute fetch once requestObject is updated to ensure we use latest data
  useEffect(() => {
    async function fetchdata() {
      const data = await handleSignUpRequest();

      if (data.msg) {
        setMessageToken(data.msg);
        setLoading(false);
        setShow(true);
      }

      if (data.detail) {
        setAlertMessage(data.detail);
        setAlert(true);
        setLoading(false);
      }
    }

    console.log(requestObject);
    if (requestObject) {
      fetchdata();
    }
  }, [requestObject]);

  //handle OTP Validation
  const handleOTPValidation = () => {
    fetch("https://api.trustauthx.com/verify_email/false", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        add: messageToken,
        types: "email",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status === 200 && data.is_ok === true) {
          setShow(false);
          navigate("/");
        }
        if (data.detail) {
          setAlertMessage(data.detail);
          setAlert(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle resend OTP email
  const resendEmail = async () => {
    setLoading(true);
    const data = await handleSignUpRequest();
    if (data.msg) {
      setMessageToken(data.msg);
      setLoading(false);
      setShow(true);
    }

    if (data.detail) {
      setAlertMessage(data.detail);
      setAlert(true);
      setLoading(false);
    }
  };

  // Signup request
  const handleSignUpRequest = async () => {
    return await fetch("https://api.trustauthx.com/signup", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestObject),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  // form submit handler
  const handleFormSubmit = async (data: RegisterUser) => {
    const reqObject = {
      username: data.username,
      password: data.password,
      full_name: "Test User",
      is_pool: true,
      link: true,
      ref: "string",
      types: "string",
    };

    setAlert(false);
    setRequestObject(reqObject);
    setLoading(true);
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <img className="w-8" src={logo} alt="AuthX logo" />
        </div>
        <div className="flex my-8 items-center justify-center grow sm:mr-12">
          <div className="md:w-96 lg:w-[32rem]">
            <img className="mx-auto mb-8" src={logo} alt="AuthX logo" />
            <h1 className="scroll-m-20 text-[2.5rem] text-center pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Create a new AuthX account
            </h1>

            <div className="login-wrapper form-wrapper">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                // className="was-validated"
              >
                <div className="form-group relative">
                  <label
                    htmlFor="email"
                    className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
                  >
                    Email
                  </label>
                  <input
                    {...register("username")}
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="name@example.com"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ message }) => (
                      <p className="text-red-600 pl-8">{message}</p>
                    )}
                  />
                </div>

                <div className="form-group mt-8 md:mt-11 relative">
                  <label
                    htmlFor="password"
                    className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    type="password"
                    className={`form-control ${
                      errors.password && "border-red"
                    }`}
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <p className="text-red-600 pl-8">{message}</p>
                    )}
                  />
                </div>

                <div className="form-group mt-8 md:mt-11 relative">
                  <label
                    htmlFor="referral-id"
                    className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
                  >
                    Referral ID (Optional)
                  </label>
                  <input
                    {...register("referral-id")}
                    id="referral-id"
                    type="text"
                    className="form-control"
                    placeholder="Referral-ID"
                  />
                </div>

                <div className="form-group">
                  <div className="d-grid start">
                    <button
                      type="submit"
                      onClick={createRipple}
                      className="ripple-button btn btn-spl-primary mt-8 md:mt-11 btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
                    >
                      <span>Next</span>
                      <span className="forward-arr">
                        {" "}
                        <FaAngleRight className="ca-forward-arr text-2xl mt-[2px]" />
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center mt-8 md:mt-11">
                  <input
                    {...register("agreeTerms")}
                    id="terms"
                    type="checkbox"
                    className="checkbox-customized cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-5 text-sm font-medium tracking-[.13em] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and agree to Flitchcoin's{" "}
                    <a className="highlighted-text" href="#">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="highlighted-text">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="agreeTerms"
                  render={({ message }) => (
                    <p className="text-red-600 pl-10 mt-2">{message}</p>
                  )}
                />

                <div className="ats-content mt-8 md:mt-11">
                  <p className="mb-0 text-xl flex items-center flex-wrap">
                    I already have an AuthX account
                    <Link
                      className="a-t-s a-link pl-2 text-xl flex items-center"
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
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black min-h-screen w-full sm:basis-2/5 relative flex flex-col justify-center">
        <div className="flex flex-col items-center my-10 md:mt-12">
          <h1 className="text-3xl xl:text-4xl mx-4 text-white max-w-md tracking-widest font-light text-center">
            AuthX’s Frictionless Signup/Login Hybrids
          </h1>
          <img
            className="mt-8 md:mt-10 xl:mt-12 w-3/5 max-h-[65vh]"
            src={graphics}
            alt="AuthX pre login"
            width={340}
          />
        </div>
        <span className="text-white w-full text-right absolute bottom-0 right-0 mb-4 xl:mb-8 mr-6">
          © 2023 TrustAuthx. All rights reserved.
        </span>
      </div>

      {alert && <AlertMessage message={alertMessage} />}

      <Modal
        show={show}
      >
        <div className="bg-white max-w-3xl mt-4 mb-12 rounded-3xl p-12 md:p-16">
          <p className="font-light text-center">
            Please check your email for a registration link or OTP. You can
            register any way by clicking on the{" "}
            <span className="text_design">link in E-mail </span>or{" "}
            <span className="text_design">by entering OTP </span>in the
            designated column. If you didn't receive an email, you can click I
            didn't receive any email.
          </p>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="">
              <div className="number_input">
                <div className="text-3xl text-center my-11">
                  Enter e-mail OTP
                </div>
                <OtpInput
                  containerStyle="flex justify-center gap-1"
                  inputStyle="otp-input-width h-12 p-0 text-center rounded-xl"
                  value={otp}
                  onChange={setOtp}
                  numInputs={8}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="row">
                <div className="col-lg-10 text-start">
                  <button
                    className="mt-16 p-0 bg-transparent font-['Lexend'] font-normal down-button"
                    onClick={resendEmail}
                  >
                    I didn't receive Email
                    <span className="modal-arr pl-2">›</span>
                  </button>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </Modal>

      <Modal
        show={loading}
      >
        <div className="mb-12">
          <svg
            className="animate-spin w-14 h-14 -ml-1 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
