import React from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import SignUp from "@/modules/Auth/SignUp/SignUp";


const Auth = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  )
}

export default Auth;
