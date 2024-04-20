import React from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import Login from "@/modules/Auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  )
}

export default LoginPage;
