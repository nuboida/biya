"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import { LoginRequest, LoginResponse, LoginState } from "../auth.models";
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
  const [auth, setAuth] = useLocalStorage<LoginResponse>('user', {
    status: "",
    message: "",
    code: 0,
    data: {
      id: "",
      email: "",
      name: "",
      phone: "",
      verifyEmail: false,
      authToken: ""
    }
  });
  const router = useRouter();
  const toast = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (): void => {
    setIsLoading(true);
    const userCredentials: LoginRequest = {
      email: loginCredentials.email,
      password: loginCredentials.password
    }

    login(userCredentials).then((data: LoginResponse) => {
      if(!data) {
        toast.error("Something went wrong, please try again later");
        setIsLoading(false)
      } else if(data.status ==='error') {
        toast.error("Incorrect Username or Password");
        setLoginCredentials({...loginCredentials, error: data.message});
        setIsLoading(false)
      }
      else {
        setAuth(data);
        setLoginCredentials({...loginCredentials, error: '', redirectToDashboard: true});
      }
    })
  }

  const handleChange =  (event: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({...loginCredentials, [event.target.name]: event.target.value});
  }

  useEffect(() => {
    const { redirectToDashboard } = loginCredentials;
    if(redirectToDashboard) {
      router.push("/")
    }
  }, [router, loginCredentials, auth]);

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
          <Link href={'/auth/forgot-password'}>Forgot Password?</Link>
        </div>
        <div className="py-10">
          <BiyaButton loading={isLoading} label="Sign In" onClick={() => {onSubmit()}} />
        </div>
    </div>
  )
}

export default Login;
