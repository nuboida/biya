import React from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import ValidatePhone from "@/modules/Auth/ValidatePhone";

const ValidatePhonePage = () => {
  return (
    <AuthLayout>
      <ValidatePhone />
    </AuthLayout>
  )
}

export default ValidatePhonePage;
