"use client"

import { logout } from "@/action";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export const LogoutButton = () => {
  return (
    <div>
      <Button size="default" className="bg-accent hover:bg-accent/60 active:bg-primary-100 text-white px-10" onClick={(e) => {
        e.preventDefault()
        logout();
        redirect("/login")
      }}>
        Logout
      </Button>
    </div>
  );
};
