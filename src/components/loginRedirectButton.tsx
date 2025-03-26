"use client"

import { logout } from "@/action";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export const LoginRedirectButton = () => {
  return (
    <div>
      <Button size="lg" className=" active:bg-primary-100 text-white px-10" onClick={(e) => {
        e.preventDefault()
        logout();
        redirect("/login")
      }}>
        Log In
      </Button>
    </div>
  );
};
