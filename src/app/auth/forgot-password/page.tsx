import ForgotPassword from "@/modules/Auth/ForgotPassword";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  )
}

export default ForgotPasswordPage;
