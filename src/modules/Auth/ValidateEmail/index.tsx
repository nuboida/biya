import React from "react";
import Link from "next/link";
import { BiyaInput } from "@/components/BiyaInput";
import { BiyaButton } from "@/components/BiyaButton";

const ValidateEmail = () => {
  return (
    <div>
          <Link href={'/auth/login'} className="text-sm text-primary text-center mb-3 underline cursor-pointer">{"<"}Back to Sign In</Link>
          <div className="lg:p-14 2xl:p-28 max-lg-px-5">
            <h1 className="text-2xl font-bold">Email Reset</h1>
            <p>Kindly enter the email address linked to your Biya NG account</p>
            <div className="mt-10 w-2/4">
              <BiyaInput
                name="email"
                type="email"
                required
                label="Email"
              />
              <BiyaButton label="Submit" />
            </div>
          </div>
        </div>
  )
}

export default ValidateEmail;
