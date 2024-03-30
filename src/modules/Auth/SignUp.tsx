import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="p-20">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <p>{"Already have an account?"} <Link href={'/register'}>Sign In</Link></p>
      <form className="mt-10 grid grid-cols-6 gap-4">
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

      <BiyaButton label="Sign up"/>
      </form>
    </div>
  )
}

export default SignUp;
