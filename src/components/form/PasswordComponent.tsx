import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { createRipple } from "@/helper/createRipple";
import Link from "next/link";
import { LinkText } from "./LinkText";
import { FormButton } from "./FormButton";

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
            <FormButton>Next</FormButton>
          </div>
        </div>

        <div className="ats-content mt-8 md:mt-11">
          <p className="mb-0 text-xl flex items-center flex-wrap">
            Forgot Password?
            <Link
              className="btn-spl-primary pl-2 text-xl flex items-center"
              href="/reset-password"
            >
              <LinkText>advance to reset Password</LinkText> 
              <span className="forward-arr">
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
