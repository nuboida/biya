"use client";

import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { LoginRequest, LoginResponse, LoginState } from "../auth.models";
import { useRouter } from "next/navigation";
import ToastContext from "@/context/toastContext";

const ResetPassword = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginState>({
    email: '',
    password: '',
    error: '',
    redirectToDashboard: false
  });
  const router = useRouter();
  const toast = useContext(ToastContext);

  const onSubmit = (): void => {
    const userCredentials: LoginRequest = {
      email: loginCredentials.email,
      password: loginCredentials.password
    }
  }

  const handleChange =  (event: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({...loginCredentials, [event.target.name]: event.target.value});
  }

  useEffect(() => {
    const { redirectToDashboard } = loginCredentials;
    if(redirectToDashboard) {
      router.push("/dashboard")
    }
  }, [router, loginCredentials]);

  return (
    <div className="lg:p-14 2xl:p-28 max-lg:px-5">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <p>Create a new password for your account</p>
        <div className="mt-10 grid grid-cols-6 lg:gap-8 2xl:gap-12 max-lg:flex max-lg:flex-col">
          <BiyaInput
            name="password"
            type="password"
            required
            label="Enter New Password"
            onChange={handleChange}
          />
          <BiyaInput
            name="confirmPassword"
            type="password"
            required
            label="Confirm Password"
            onChange={handleChange}
        />
        </div>
        <div className="py-10">
          <BiyaButton label="Submit" onClick={() => {onSubmit()}} />
        </div>
    </div>
  )
}

export default ResetPassword;
