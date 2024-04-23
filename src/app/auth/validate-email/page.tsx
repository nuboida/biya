import React from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import ValidateEmail from "@/modules/Auth/ValidateEmail";

const ValidateEmailPage = () => {
  return (
    <AuthLayout>
      <ValidateEmail />
    </AuthLayout>
  )
}

export default ValidateEmailPage;
