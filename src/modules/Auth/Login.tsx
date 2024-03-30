import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="p-20">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p>{"Don't have an account?"} <Link href={'/register'}>Sign Up</Link></p>
      <form className="mt-10 grid grid-cols-6 gap-4">
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

      <BiyaButton label="Sign In"/>
      </form>
    </div>
  )
}

export default Login;
