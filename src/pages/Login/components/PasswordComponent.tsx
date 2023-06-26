import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { createRipple } from "../../../helper/createRipple";

type PasswordSubmitType = {
  handlePasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  password: string | File;
  errors: any;
};

export const PasswordComponent = ({
  handlePasswordSubmit,
  password,
  errors,
}: PasswordSubmitType) => {
  return (
    <div className="login-wrapper form-wrapper">
      <form
        onSubmit={handlePasswordSubmit}
        // className="was-validated"
      >
        <div className="form-group relative">
          <label
            htmlFor="password"
            className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            defaultValue={
              password as string
            }
            required
            name="password"
            placeholder="Enter password"
          />
          {errors?.password && (
            <div className=" color text-red-600">
              <span>{errors?.password?.message}</span>
            </div>
          )}
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

        <div className="ats-content mt-8 md:mt-11">
          <p className="mb-0 text-xl flex items-center flex-wrap">
            Forgot Password?
            <Link
              className="pl-2 a-t-s a-link text-xl flex items-center"
              to="/reset-password"
            >
              advance to reset Password{" "}
              <span className="forward-arr arr-black">
                {" "}
                <FaAngleRight className="pt-1 text-2xl" />
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
