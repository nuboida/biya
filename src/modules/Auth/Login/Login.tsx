import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p>{"Don't have an account?"} <Link href={'/register'} className="font-bold">Sign Up</Link></p>
      <form>
        <div className="mt-10 grid grid-cols-6 lg:gap-8 2xl:gap-12">
          <BiyaInput
            name="email"
            type="email"
            required
            label="Email"
          />
          <BiyaInput
            name="password"
            type="password"
            required
            label="Password"
        />
        </div>
        <div className="flex flex-row-reverse underline text-secondary -mt-3">
          <Link href={'/forgot_password'}>Forgot Password?</Link>
        </div>
      <BiyaButton label="Sign In"/>
      </form>
    </div>
  )
}

export default Login;
