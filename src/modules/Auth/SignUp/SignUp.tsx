import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="lg:p-20 max-md:px-5">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p>{"Already have an account?"} <Link href={'/register'} className="font-bold">Sign In</Link></p>
      <form>
        <div className="mt-10 lg:grid grid-cols-6 lg:gap-8 2xl:gap-12 max-md:flex max-md:flex-col">
          <BiyaInput
            name="firstName"
            type="text"
            required
            label="First Name"
          />
          <BiyaInput
            name="lastName"
            type="text"
            required
            label="Last Name"
        />
          <BiyaInput
            name="businessName"
            type="text"
            required
            label="Business Name"
        />
          <BiyaInput
            name="email"
            type="email"
            required
            label="Email"
        />
          <BiyaInput
            name="phoneNumber"
            type="tel"
            required
            label="Phone Number"
        />
          <BiyaInput
            name="password"
            type="password"
            required
            label="Password"
        />
        </div>
      <BiyaButton label="Sign Up"/>
      </form>
    </div>
  )
}

export default SignUp;
