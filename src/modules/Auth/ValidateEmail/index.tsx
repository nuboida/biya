"use client";
import React from "react";
import Image from "next/image";
import { BiyaIcon } from "@/components/Icon";


interface ValidateProps {
  email: string;
}

const ValidateEmail: React.FC<ValidateProps> = ({email}) => {
  return (
    <div className="lg:p-10 2xl:p-28 max-lg:px-5">
      <div className="flex flex-col justify-center items-center gap-10">
        <div>
          <BiyaIcon name="mail"/>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h4 className="text-lg">An Email has been sent to <span className="font-bold">{email}</span></h4>
          <p>Check your Email and click the link to activate.</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
        <Image
        src={"/images/stopimage.svg"}
        alt="stop image"
        width={400}
        height={400}
        /></div>
        <p className="text-rose-500">Thank you for your interest. We are currently in beta and if you’ll like to be a part of it, please send an email to us on <span className="text-blue">info@biya.com.ng</span> </p>
      </div>
    </div>
  )
}

export default ValidateEmail;
