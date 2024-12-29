"use client";

import React from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import EmailVerified from "@/modules/Auth/EmailVerified";

const VerifyEmailPage = () => {
  return (
    <AuthLayout>
      <EmailVerified />
    </AuthLayout>
  )
}

export default VerifyEmailPage;
