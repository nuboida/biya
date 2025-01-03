"use client"
import { BiyaButton } from "@/components/BiyaButton";
import { BiyaIcon } from "@/components/Icon";
import { useRouter } from "next/navigation";
import React from "react";


const EmailVerified: React.FC = () => {
  const router = useRouter();
    return (
      <div className="lg:pg-10 2xl:p-28 max-lg:px-5 mt-32">
        <div className="flex flex-col justify-center items-center gap-10">
          <BiyaIcon name="mail"/>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-lg font-semibold pb-4">
            Email Verified Successfully
          </h1>
          <BiyaButton label="Login" onClick={() => {
            router.push("/auth/login");
          }} />
        </div>
      </div>
    )

}

export default EmailVerified;
