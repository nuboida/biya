"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "../ui/Icons";
import { redirect } from "next/navigation";

interface ChangePasswordFormProps {
  token: string;
}

const changePasswordSubmit = async (
  token: string,
  request: { oldPassword: string; newPassword: string; confirmPassword: string }
) => {
  try {
    const response = await fetch("api/auth/change-employee-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const ChangePasswordForm = ({ token }: ChangePasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChange, setPasswordChange] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPasswordChange({
      ...passwordChange,
      [event.target.name]: event.target.value,
    });
  };

  const submitChangePassword = () => {
    setIsLoading(true);

    changePasswordSubmit(token, passwordChange).then((res) => {
      if ("error" in res) {
        setError(res.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        redirect('/change-password/confirmation')
      }
    });
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
        <div className="rounded-t mb-0 px-6 py-6">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h1 className="text-6xl font-mono">Password Change</h1>
            </div>
            <div className="pt-6">
              <Input
                type="password"
                placeholder="Enter Password"
                name="oldPassword"
                onChange={handlePasswordChange}
                defaultValue={passwordChange.oldPassword}
              />
            </div>
            <div className="pt-6">
              <Input
                type="password"
                placeholder="Enter New Password"
                name="newPassword"
                onChange={handlePasswordChange}
                defaultValue={passwordChange.newPassword}
              />
            </div>
            <div className="pt-6">
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handlePasswordChange}
                defaultValue={passwordChange.confirmPassword}
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
                  submitChangePassword();
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
  );
};
