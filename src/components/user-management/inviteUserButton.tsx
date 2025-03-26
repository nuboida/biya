"use client"

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const InviteUserButton = () => {
  const router = useRouter()
  return (
    <div>
      <Button size="default" className="bg-accent hover:bg-accent/60 active:bg-primary-100 text-white px-10" onClick={() => {
        router.push("/user-management/invite-user")
      }}>
        Invite User
      </Button>
    </div>
  );
};
