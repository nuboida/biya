"use client";

import React from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import ValidateEmail from "@/modules/Auth/ValidateEmail";
import { useParams, useRouter } from "next/navigation";

const ValidateEmailPage = () => {
  const params = useParams();
  const router = useRouter();
  if(params.userEmail) {
    return (
      <AuthLayout>
        <ValidateEmail  email={decodeURIComponent(params.userEmail.toString())} />
      </AuthLayout>
    )
  } else {
    router.push("/auth/login");
  }
}

export default ValidateEmailPage;
