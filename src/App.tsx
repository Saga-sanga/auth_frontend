import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login/index";
import SignUp from "./pages/Signup/index";
import Payment from "./pages/Payment/index";
import Dashboard from "./pages/Dashboard/page";
import Page1 from "./pages/Dashboard/page1";
import Page2 from "./pages/Dashboard/page2";
import Page3 from "./pages/Dashboard/page3";
import Page4 from "./pages/Dashboard/page4";
import Page5 from "./pages/Dashboard/page5";
import Page6 from "./pages/Dashboard/page6";
import Page7 from "./pages/Dashboard/page7";
import Account from "./pages/Account/Account";
import PasswordReset from "./pages/password_reset/passwordReset";
import NewPassword from "./pages/password_reset/newPassword";
import { PasswordComponent } from "./pages/Login/components/PasswordComponent";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/password" element={<Login />} /> */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/page1" element={<Page1 />} />
          <Route path="/dashboard/page2" element={<Page2 />} />
          <Route path="/dashboard/page3" element={<Page3 />} />
          <Route path="/dashboard/page4" element={<Page4 />} />
          <Route path="/dashboard/page5" element={<Page5 />} />
          <Route path="/dashboard/page6" element={<Page6 />} />
          <Route path="/dashboard/page7" element={<Page7 />} />
          <Route path="/account/" element={<Account />} />
          <Route path="/account/:id" element={<Account />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
