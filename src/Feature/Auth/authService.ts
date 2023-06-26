import axios from "axios";
import {API_DOMAIN} from '../../helper/constant'

const defaultType = async (type) => {
  return type;
};

const loginUser = async (data) => {
  return data.type;
};

// signup user
const signupUser = async (data) => {
  let response;
  let userValue = {
    username: "",
    password: "",
    full_name: "",
    is_pool: null,
    ref:"",
    link:"",
    types:""
  };  
  if(data && (data.formData && data.formData.type && !data.type)){
    data.type = data.formData.type;
  }
  if (data.type === "participant") {
    userValue = {
      username: data.formData.username,
      password: data.formData.password,
      full_name: data.formData.fullName,
      is_pool: false,
      ref: data.formData.referal,
      link:true,
      types: "email"
    };
  } else {    
    userValue = {
      username: data.formData.username,
      password: data.formData.password,
      full_name: data.formData.fullName,
      is_pool: true,
      ref: data.formData.referal,
      link:true,
      types: "email"
    };    
  }  
  try {    
    response = await axios.post("https://api.trustauthx.com/api/Signup", userValue);
  } catch (error) {    
    response = error.response;
  }
  return response;
};

// otp verify
const verifyEmail = async (data) => {
  let response;
  try {
    response = await axios.post(`https://api.trustauthx.com/api/verify_email/${data.link}`, data);
  } catch (error) {
    response = error.response;
  }
  if(response.status === 406){
    return "Wrong OTP";
  }else{
    return response.data;
  }
};


// login user
const loginToken = async (data:any) => {
  let response;
  try {
    // const params = new URLSearchParams();
    const body={
      otp:"100000",
      grant_type:"",
      username:data.username || data.email,
      password:data.password,
      scope:"",
      client_id:"",
      client_secret:data?.otp ? Number(data?.otp) :"100000"
    }
    response = await axios.post(`${API_DOMAIN}/token`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept" : "application/x-www-form-urlencoded",
      },
    });
    if (response.data) {
      localStorage.setItem("token", response.data.access_token);
    }
  } catch (error:any) {
    response = error?.response;
  }
  if(response.status === 401) {
  }else{
    return response.data;
  }
};

const signinUser = async (data) => {
  return data.type;
};
const logOutUser = async () => {
  localStorage.removeItem("token");
};

const authService = {
  defaultType,
  loginUser,
  signinUser,
  logOutUser,
  loginToken,
  signupUser,
  verifyEmail,
};

export default authService;