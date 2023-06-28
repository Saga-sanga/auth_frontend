"use client"
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginToken, loginUser } from "@/redux/Auth/authSlice";
import { Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { AppDispatch } from "@/redux/store";
import logo from "./images/logo.svg"
import graphic from "../../../assets/images/login-graphic.svg"
import { EmailComponent } from "../../../components/form/EmailComponent";
import { PasswordComponent } from "../../../components/form/PasswordComponent";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { checkUser } from "@/helper/api";

type FormValues = {
  username: string;
  password: string;
  type: string | null;
  otp: string | undefined;
};

const Login = () => {
  const { userToken, user } = useSelector((state: any) => state.auth);

  // email validation
  const asyncEmailValidation = async (email: string) => {
    const activeElement = document.activeElement as HTMLInputElement;
    if (!activeElement || (activeElement && activeElement?.type === "submit" && isValid)) {
      try {
        const response = await checkUser({ emailid: email });
        const { detail } = response;
        if (!detail) {
          if (response.is_pool) {
            setValue("type", "pool");
          } else {
            setValue("type", "participant");
          }
          setfa2(JSON.stringify(response.fa2 || false));
          return true;
        } else {
          console.log("async email validation failed");
          return false;
        }
      } catch (e) {
        console.log("Error in asyncEmailValidation ", e);
        return false;
      }
    } else {
      return true;
    }
  };

  // yup handler
  const schema = yup
    .object({
      username: yup
        .string()
        .required("Email field required")
        .email("Valid Email address required")
        .test("userNotFound", "User does not exist", asyncEmailValidation),
      type: yup.string().nullable().default(""),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    setValue,
    setError,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  // setting states
  const [fa2, setfa2] = useState("null");
  const [show, setShow] = useState(false);
  const [gAuth, setgAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<FormDataEntryValue>("");
  const dispatch = useDispatch<AppDispatch>();
  const [otp, setOtp] = useState("")
  const [customError, setCustomError] = useState<any>("")
  const router = useRouter();
  // const [path, setPath] = usePathname()
  const path = usePathname()


  // const path: string = router.pathname;
  // useEffect(() => {
  //   if (router) {
  //     setPath(router.pathname)
  //   }

  // }, [router])


  useEffect(() => {
    setLoading(true);

    if (path == '/password') {
      if (!getValues().username) {
        router.push('/')
      }
    }
    if (userToken?.access_token) {
      dispatch(loginUser());
      setLoading(false);
    }
    if (user && user?.username) {
      router.push("/dashboard");
      setLoading(false);
    }

    const formData = getValues();
    if (gAuth && formData.username.length
      // && 
      // formData.password.length

    ) {
      const loginAction = loginToken(formData as FormValues);
      dispatch(loginAction);
      setLoading(false);
    }
    setLoading(false);
  }, [userToken, user]);

  const responseSocialAuth = async (response: any) => {
    // debugger
    const { user, providerId } = response;
    const {
      reloadUserInfo: { passwordHash },
    } = user;
    if (user && user.email) {
      setgAuth(true);
      setValue("username", user.email);
      const userResponse = await checkUser({ emailid: user.email });
      if (userResponse) {
        if (userResponse.fa2) {
          setShow(true);
        } else {
          if (!userResponse.detail) {
            const formData = getValues();
            dispatch(
              loginToken({
                username: formData.username,
                // password: formData.password,
                type: "",
                otp: otp,
              } as FormValues)
            );
          }
        }
      }
    }
  };

  // otp handler
  const otpHandler = async (e: any) => {
    try {
      e.preventDefault();
      const formData = getValues();
      const res = await dispatch(
        loginToken({
          username: formData.username,
          type: "",
          otp: otp,
        } as FormValues)
      );
      if (res.type === "auth/loginToken/rejected" && !res.payload) {
        alert("Invalid OTP");
        setOtp("");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("Error from OTP handler ", e);
    } finally {
      setShow(false);
    }
  };

  // on submit handler
  const onSubmitHandler = async (pwd: FormDataEntryValue) => {
    try {
      console.log("inside submit handler email", isValid);
      setLoading(true);
      const response = await checkUser({ emailid: getValues().username });
      const faValue = JSON.stringify(response.fa2);
      if (isValid) {
        if (faValue === "true") {
          setShow(true);
        } else {
          const data = {
            username: getValues().username,
            password: pwd,
            otp: otp
          }
          const res = await dispatch(loginToken(data));
          console.log("response from login token ", res);
          if (res["type"] === "auth/loginToken/fulfilled" && !res.payload) {
            setCustomError({
              "password": {
                type: "custom",
                message: "Invalid Password",
              }
            });
          } else {
            router.push("/dashboard/page1");
          }
        }
        setLoading(false);
      } else {
        console.log("Not valid");
        setLoading(false);
      }
    } catch (err) {
      console.log("Error in onSubmitHandler ", err);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    console.log(getValues())
    setCustomError("")
    router.push('/password')
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parsedData = Object.fromEntries(formData.entries());
    // setPassword(parsedData.password);
    onSubmitHandler(parsedData.password);
  };


  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <Image src="/logo.svg" alt="AuthX logo" />
        </div>
        <div className="flex my-12 items-center justify-center grow sm:mr-12">
          <div className="mb-32 md:w-96 lg:w-[32rem]">
            <h1 className="scroll-m-20 text-[2.5rem] text-center pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Login to your AuthX account
            </h1>
            {path != "/password" ?
              <EmailComponent
                handleEmailSubmit={handleEmailSubmit}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit} />
              :
              <PasswordComponent
                handlePasswordSubmit={handlePasswordSubmit}
                password={password}
                errors={customError}
              />
            }
          </div>
        </div>
      </div>
      <div className="bg-black min-h-screen w-full sm:basis-2/5 relative">
        <div className="flex flex-col items-center my-10 md:mt-12">
          <h1 className="text-3xl xl:text-4xl mx-4 text-white max-w-md tracking-widest font-light text-center">
            AuthX: Ensure Security at every level
          </h1>
          <Image
            className="mt-8 md:mt-10 xl:mt-12 w-3/5"
            src="/login-graphic.svg"
            alt="AuthX pre login"
            width={340}
          />
        </div>
        <span className="text-white w-full text-right absolute bottom-0 right-0 mb-4 xl:mb-8 mr-6">
          © 2023 TrustAuthx. All rights reserved.
        </span>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        className="modal-dialog-login"
      >
        <div className="bg-white rounded-3xl p-16 mt-[20vh] w-max self-center">
          <div>
            <div className="">
              <div className="text-3xl text-center mb-4">Enter MFA OTP</div>
              <p className="text-center mb-10 text-slate-600">
                Enter Multifactor OTP from your authentication app
              </p>
              <OtpInput
                containerStyle="flex justify-center gap-1"
                inputStyle="otp-input-width h-12 p-0 text-center rounded-xl"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
