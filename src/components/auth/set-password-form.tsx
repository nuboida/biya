"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../ui/Icons";
import { redirect } from "next/navigation";

interface SetPasswordFormProps {
  token: string;
}

const setPasswordSubmit = async (token: string, request: {password: string, confirmPassword: string}) => {
  const response = await fetch(`/api/auth/${token}/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
  });
  return await response.json();
}

export const SetNewPassword = ({ token }: SetPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordCred, setPasswordCred] = useState<{password: string; confirmPassword: string}>({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPasswordCred({...passwordCred, [event.target.name]: event.target.value});
  }

  const onSubmit = () => {
    setIsLoading(true)
    setPasswordSubmit(token, passwordCred).then((res) => {
      if ("error" in res) {
        setError(res.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        redirect(`/login/forgot-password/${token}/confirmation`)
      }
    })
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
        <div className="rounded-t mb-0 px-6 py-6">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h1 className="text-6xl font-mono">Set Password</h1>
            </div>
            <div className="pt-6">
              <Input
                type="password"
                placeholder="Enter New Password"
                name="password"
                onChange={handleInputChange}
                defaultValue={passwordCred.password}
              />
            </div>
            <div className="pt-6">
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleInputChange}
                defaultValue={passwordCred.confirmPassword}
              />
            </div>
            {typeof error == "string" && (
              <p className="px-1 pb-4 text-red-600 font-semibold">{error}</p>
            )}
            <div className="pt-5">
              <Button
                size="lg"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
