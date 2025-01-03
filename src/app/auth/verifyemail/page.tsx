"use client";

import React, { Suspense, useContext } from "react";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import EmailVerified from "@/modules/Auth/EmailVerified";
import { useRouter, useSearchParams } from "next/navigation";
import ToastContext from "@/context/toastContext";

function SearchParamsCallback() {
  const searhParams = useSearchParams();
  const router = useRouter()
  const toast = useContext(ToastContext);
  toast.error("Please register first");
  if (!searhParams.get('key')) {
    router.push("/auth/signup");
  } else {
    return <></>
  }
}

const VerifyEmailPage = () => {
    return (
      <Suspense fallback={<SearchParamsCallback/>}>
        <AuthLayout>
          <EmailVerified />
        </AuthLayout>
      </Suspense>
    )

}

export default VerifyEmailPage;
