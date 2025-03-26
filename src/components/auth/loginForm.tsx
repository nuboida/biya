"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent, useActionState, useState } from "react";
import { Icons } from "../ui/Icons";
import {login} from '../../action';
import Link from "next/link";

type LoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [state, loginAction, isPending] = useActionState(login, undefined);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  return (
    <div className={cn("flex-auto p-6", className)} {...props}>
      <form action={loginAction} role="form">
        <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
          Email
        </label>
        <div className="mb-6">
          <Input
            type="text"
            name="email"
            placeholder="Enter email or employee id"
            onChange={handleInputChange}
          />
        </div>
        <label className="sr-only mb-2 ml-1 font-bold text-xs text-slate-700">
          Password
        </label>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {typeof state == "string" && (
            <p className="px-1 pt-1 text-red-600 font-semibold">{state}</p>
          )}
        </div>
        <div className="flex flex-row-reverse">
          <Link href="/login/forgot-password" className="text-accent font-semibold">Forgot Password?</Link>
        </div>
        <div className="text-center mt-6">
          <Button size="lg" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};
