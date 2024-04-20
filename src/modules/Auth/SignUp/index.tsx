'use client';
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import { SignupRequest, SignupState } from "../auth.models";
import { signup } from "../auth.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {

  const [signupCredentials, setSignupCredentials] = useState<SignupState>({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    network: 'MTN',
    error: '',
    redirectToSignin: false
  });

  const router = useRouter();

  const onSubmit = (): void => {
    const userCredentials: SignupRequest = {
      firstName: signupCredentials.firstName,
      lastName: signupCredentials.lastName,
      businessName: signupCredentials.businessName,
      email: signupCredentials.email,
      phone: signupCredentials.phone,
      password: signupCredentials.password,
      network: signupCredentials.network
    }


    signup(userCredentials).then((data: any) => {
      if(data.status === 'error') {
        toast.error(data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 1000
        });
        setSignupCredentials({...signupCredentials, error: data.message})
      } else {
        console.log(data);
        setSignupCredentials({...signupCredentials, error: '', redirectToSignin: true});
      }
    });
  }

  const handleChange  = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupCredentials({...signupCredentials, [event.target.name]: event.target.value});
  }

  useEffect(() => {
    const { redirectToSignin } = signupCredentials;
    if (redirectToSignin) {
      router.push("/auth/signin")
    }
  }, [router, signupCredentials])

  return (
    <div className="lg:p-10 2xl:p-28 max-lg:px-5">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p>{"Already have an account?"} <Link href={'/auth/login'} className="font-bold">Sign In</Link></p>
        <div className="mt-10 lg:grid grid-cols-6 lg:gap-8 2xl:gap-12 max-lg:flex max-lg:flex-col">
          <BiyaInput
            name="firstName"
            type="text"
            required
            label="First Name"
            onChange={handleChange}
          />
          <BiyaInput
            name="lastName"
            type="text"
            required
            label="Last Name"
            onChange={handleChange}
        />
          <BiyaInput
            name="businessName"
            type="text"
            required
            label="Business Name"
            onChange={handleChange}
        />
          <BiyaInput
            name="email"
            type="email"
            required
            label="Email"
            onChange={handleChange}
        />
          <BiyaInput
            name="phone"
            type="tel"
            required
            label="Phone Number"
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
        <div className="py-10">
          <BiyaButton label="Sign Up" onClick={() => {onSubmit()} }/>
        </div>
    </div>
  )
}

export default SignUp;
