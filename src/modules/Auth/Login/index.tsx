"use client";

import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { LoginRequest, LoginState } from "../auth.models";
import { login } from "../auth.api";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import ToastContext from "@/context/toastContext";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginState>({
    email: '',
    password: '',
    error: '',
    redirectToDashboard: false
  });


  const [auth, setAuth] = useLocalStorage('user', null);
  const router = useRouter();
  const toast = useContext(ToastContext);

  const onSubmit = (): void => {
    const userCredentials: LoginRequest = {
      email: loginCredentials.email,
      password: loginCredentials.password
    }

    login(userCredentials).then((data: any) => {
      if(data.status === 'error') {
        toast.error('Cannot Login');
        setLoginCredentials({...loginCredentials, error: data.message});
      } else {
        toast.success("successfully logged in");
       /*  setAuth(data);
        setLoginCredentials({...loginCredentials, error: '', redirectToDashboard: true}); */
      }
    })
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
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p>{"Don't have an account?"} <Link href={'/auth/signup'} className="font-bold">Sign Up</Link></p>
        <div className="mt-10 grid grid-cols-6 lg:gap-8 2xl:gap-12 max-lg:flex max-lg:flex-col">
          <BiyaInput
            name="email"
            type="email"
            required
            label="Email"
            onChange={handleChange}
          />
          <BiyaInput
            name="password"
            type="password"
            required
            label="Password"
            onChange={handleChange}
        />
        </div>
        <div className="flex flex-row-reverse underline text-secondary -mt-3">
          <Link href={'/forgot_password'}>Forgot Password?</Link>
        </div>
        <div className="py-10">
          <BiyaButton label="Sign In" onClick={() => {onSubmit()}} />
        </div>
    </div>
  )
}

export default Login;
