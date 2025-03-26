"use client"

import clsx from "clsx";
import { Button } from "../ui/button";
import { useState } from "react";
import { UserActiveModal } from "./user-active-modal";

interface ActivateButtonProps {
  active: boolean;
  token: string;
  merchantId: string;
  employeeId: string;
  name: string;
}

export const ActivateButton = ({active, token, merchantId, employeeId, name}: ActivateButtonProps) => {
  const [activateModal, setActivateModal] = useState(false);
  return (
    <>
    {activateModal && <UserActiveModal onClose={() => setActivateModal(false)} token={token} merchantId={merchantId} id={employeeId} name={name} active={active} />}
      <Button className={clsx("text-nowrap bg-transparent",
        active && "text-red-500 border-red-500 border hover:bg-red-100",
        !active && "text-green-500 border-green-500 border hover:bg-green-100"
        )}
        onClick={() => {
          setActivateModal(true);
        }}
        >{active ? "Deactivate agent" : "Activate agent"}</Button>
    </>
  )
}
