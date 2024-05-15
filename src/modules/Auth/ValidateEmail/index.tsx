"use client";
import React from "react";
import { BiyaIcon } from "@/components/Icon";


interface ValidateProps {
  email: string;
  phone: string;
}

const ValidateEmail = () => {
  return (
    <div className="lg:p-10 2xl:p-28 max-lg:px-5">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="">
          <BiyaIcon name="mail"/>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h4 className="text-lg font-bold">An Email has been sent to you</h4>
          <p>Check your Email and click the link to activate.</p>
        </div>
      </div>
      <div className="mt-10 flex items-center">
        <span><BiyaIcon name="info" /></span>
        <p>Thank you for your interest. We are current in beta and if you’ll like to be a part of it, please send an email to us on <span className="text-blue">info@biya.com.ng</span> </p>
      </div>
    </div>
  )
}

export default ValidateEmail;
