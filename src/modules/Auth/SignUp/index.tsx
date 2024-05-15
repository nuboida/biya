'use client';
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import { SignupRequest, SignupState, signUpSchema } from "../auth.models";
import { signup } from "../auth.api";
import { useRouter } from "next/navigation";
import ToastContext from "@/context/toastContext";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiyaSelect } from "@/components/Select/BiyaSelect";

const SignUp = () => {

  const router = useRouter();
  const toast = useContext(ToastContext);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpSchema)
  })
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FieldValues): void => {
    setIsLoading(true);
    const signupRequest = {
      ...data,
      network: 'MTN'
    }

    signup(signupRequest as SignupRequest).then((data: any) => {
      if(!data) {
        toast.error("Something went wrong, please try again later");
        setIsLoading(false)
      } else if(data.status ==='error') {
        toast.error(data.message);
        setIsLoading(false)
      }
      else {
        router.push("/validateemail");
      }
    });
  }

  return (
    <div className="lg:p-10 2xl:p-28 max-lg:px-5">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p>{"Already have an account?"} <Link href={'/auth/login'} className="font-bold">Sign In</Link></p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 lg:grid grid-cols-6 lg:gap-8 2xl:gap-12 max-lg:flex max-lg:flex-col">
          <BiyaInput
            name="firstName"
            type="text"
            required
            label="First Name"
            error={errors?.firstName?.message}
            register={register('firstName')}
          />
          <BiyaInput
            name="lastName"
            type="text"
            required
            label="Last Name"
            error={errors?.lastName?.message}
            register={register('lastName')}
        />
          <BiyaInput
            name="businessName"
            type="text"
            required
            label="Business Name"
            error={errors?.businessName?.message}
            register={register('businessName')}
        />
          <BiyaInput
            name="email"
            type="email"
            required
            label="Email"
            error={errors?.email?.message}
            register={register('email')}
        />
          <BiyaInput
            name="phone"
            type="tel"
            required
            label="Phone Number"
            error={errors?.phone?.message}
            register={register('phone')}
        />
          <BiyaInput
            name="password"
            type="password"
            required
            label="Password"
            error={errors?.password?.message}
            register={register('password')}
        />
        </div>
        <div className="py-10">
          <BiyaButton loading={isLoading} label="Sign Up" />
        </div>
      </form>
    </div>
  )
}

export default SignUp;
