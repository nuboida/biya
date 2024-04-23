"use client";

import { RadioButton } from "@/components/RadioButton";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ForgotPassword = () => {
  const [selectedMethod, setSelectedMethod] = React.useState('');
  const router = useRouter();
  const methods = [
      {
          label: 'Email Reset',
          description: 'A Password Reset link will be sent to your mailbox',
          value: 'email',
          icon: 'email',
          onChange: () => setSelectedMethod('email'),
          checked: selectedMethod === 'email',
      },
      {
          label: 'Phone Reset',
          description: 'An OTP Code will be sent to your phone',
          value: 'phone',
          icon: 'phone-incoming',
          onChange: () => setSelectedMethod('phone'),
          checked: selectedMethod === 'phone',
      }
  ];

  useEffect(() => {
      if (selectedMethod) {
          setTimeout(() => {
              router.push(`/auth/validate-${selectedMethod}`);
          }, 1000);
      }
  }, [selectedMethod, router]);
  return (
        <div>
          <Link href={'/login'} className="text-sm text-primary text-center mb-3 underline">{"<Back to Sign In"}</Link>
          <div className="lg:p-14 2xl:p-28 max-lg-px-5">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p>Select a Password Reset Method</p>
            <div className="mt-10 grid grid-cols-1 gap-1">
                {methods.map((method, i) => (
                <div key={i} className="bg-sky-100">
                   <RadioButton key={method.value} {...method} />
                </div>)
              )}
            </div>
          </div>
        </div>
  );
};

export default ForgotPassword;
