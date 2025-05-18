"use client";

import { register } from "@/action";
import { ChangeEvent, useActionState, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../ui/Icons";
import { cn } from "@/lib/utils";

type RegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

export interface SignupRequest {
  firstName: string;
  lastName: string;
  businessName: string;
  businessEmail: string;
  email: string;
  phone: string;
  password: string;
  terms: boolean;
}

export const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
  const [registerData, setRegisterData] = useState<SignupRequest>({
    firstName: "",
    lastName: "",
    businessName: "",
    businessEmail: "",
    email: "",
    phone: "",
    password: "",
    terms: false
  });

  const [state, registerAction, isPending] = useActionState(
    register,
    undefined
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'terms') {
      setRegisterData({
        ...registerData,
        terms: event.target.checked
      })
    } else {
      setRegisterData({
        ...registerData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div className={cn("flex-auto px-6 pb-6 pt-4", className)} {...props}>
      {typeof state == "string" && (
        <p className="px-1 pt-1 text-red-600 font-semibold">{state}</p>
      )}
      <form action={registerAction} role="form" className={cn(
        typeof state == "string" && "border-red-200 border p-2"
      )}>
        <h5 className="text-accent font-semibold">Owner details</h5>
        <div className="flex flex-row items-center gap-2 mt-2">
          <div>
            <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
              First Name
            </label>
            <div className="2xl:mb-4 lg:mb-3">
              <Input
                placeholder="First Name"
                name="firstName"
                onChange={handleInputChange}
                defaultValue={registerData.firstName}
              />
            </div>
          </div>
          <div>
            <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
              Last Name
            </label>
            <div className="2xl:mb-4 lg:mb-3">
              <Input
                placeholder="Last Name"
                name="lastName"
                onChange={handleInputChange}
                defaultValue={registerData.lastName}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
              Email
            </label>
            <div className="2xl:mb-4 lg:mb-3">
              <Input
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                defaultValue={registerData.email}
              />
            </div>
          </div>
          <div>
            <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
              Phone
            </label>
            <div className="2xl:mb-4 lg:mb-3">
              <Input
                name="phone"
                placeholder="Phone"
                onChange={handleInputChange}
                defaultValue={registerData.phone}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
            Password
          </label>
          <div className="2xl:mb-4 lg:mb-3">
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleInputChange}
              defaultValue={registerData.password}
            />
          </div>
        </div>

        <hr />
        <div className="mt-2">
        <h5 className="text-accent font-semibold">Merchant details</h5>
          <div className="mt-2">
            <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
              Business Name
            </label>
            <div className="2xl:mb-4 lg:mb-3">
              <Input
                name="businessName"
                placeholder="Business Name"
                onChange={handleInputChange}
                defaultValue={registerData.businessName}
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
              Business Email
            </label>
            <div className="2xl:mb-4 lg:mb-3">
              <Input
                name="businessEmail"
                placeholder="Business Email"
                onChange={handleInputChange}
                defaultValue={registerData.businessEmail}
              />
            </div>
          </div>
        </div>

        <div className="2xl:mb-4 lg:mb-3">
          <div className="flex gap-1">
            <input type="checkbox" onChange={handleInputChange} name="terms" defaultChecked={registerData.terms} />
            <p>
              I agree to{" "}
              <span className="text-accent font-semibold">
                Terms and Conditions
              </span>
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button size="lg" type="submit" disabled={isPending || !registerData.terms}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
