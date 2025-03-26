"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent, useActionState, useState } from "react";
import { recoverAcccount } from "@/action";
import { Icons } from "../ui/Icons";

export const ForgotPasswordForm = () => {
  const [recoveryData, setRecoveryData] = useState<{email: string}>({email: ''});
  const [state, recoveryAction, isPending] = useActionState(recoverAcccount, undefined);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecoveryData({...recoveryData, [event.target.name]: event.target.value});
  }

  return (
    <>
    <form action={recoveryAction} role="form">
      <div className="rounded-t mb-0 px-6 py-6">
        <div className="rounded-t mb-0 px-6 py-6">
          <div className="text-center mb-3">
            <h1 className="text-6xl font-mono">Forgot Password</h1>
            <p>
              Kindly input the email/phone number you registered with to reset
              password
            </p>
          </div>
          <div className="pt-6">
            <Input type="email" name="email" placeholder="email" onChange={handleInputChange} />
            {
              typeof state == "string" && (
                <p className="px-1 pt-1 text-red-600 font-semibold">{state}</p>
              )
            }
          </div>
          <div className="pt-5">
            <Button type="submit" size="lg" disabled={isPending}>
              {
                isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )
              }
              Send me the link
            </Button>
          </div>
          <div className="flex justify-center items-center py-4">
            <p>
              Remember your password?{" "}
              <Link href="/login" className="text-accent font-bold">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};
