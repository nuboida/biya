"use client";

import React from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import EmailVerified from "@/modules/Auth/EmailVerified";
import { useParams, useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const params = useParams();
  const router = useRouter();

  if (params.key != '') {
    return (
      <AuthLayout>
        <EmailVerified />
      </AuthLayout>
    )
  } else {
    router.push("/auth/signup");
  }
}

export default VerifyEmailPage;
