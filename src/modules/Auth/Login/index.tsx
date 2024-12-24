"use client";

import React, { useContext, useEffect, useState } from "react";
import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import { LoginRequest, LoginSchema } from "../auth.models";
import { login } from "../auth.api";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import ToastContext from "@/context/toastContext";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const [auth, setAuth] = useLocalStorage<string>('user', '');
  const router = useRouter();
  const toast = useContext(ToastContext);
  const {register, handleSubmit } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(LoginSchema)
  })
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (req: FieldValues): void => {
    setIsLoading(true);

    login(req as LoginRequest).then((res) => {
      if('error' in res) {
        toast.error(res.error);
        setIsLoading(false)
      }
      else {
        setAuth(res.token)
        router.push("/");
      }
    })

  }

  return (
    <div className="lg:p-14 2xl:p-28 max-lg:px-5">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p>{"Don't have an account?"} <Link href={'/auth/signup'} className="font-bold">Sign Up</Link></p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 grid grid-cols-6 lg:gap-8 2xl:gap-12 max-lg:flex max-lg:flex-col">
          <BiyaInput
            name="email"
            type="text"
            required
            label="Email"
            register={register('email')}
          />
          <BiyaInput
            name="password"
            type="password"
            //error={errors?.password?.message}
            required
            label="Password"
            register={register('password')}
        />
        </div>
        <div className="flex flex-row-reverse underline text-secondary -mt-3">
          <Link href={'/auth/forgot-password'}>Forgot Password?</Link>
        </div>
        <div className="py-10">
          <BiyaButton loading={isLoading} label="Sign In" />
        </div>
      </form>
    </div>
  )
}

export default Login;
