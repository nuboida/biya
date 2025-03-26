"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../ui/Icons";
import { WithdrawalModal } from "./withdrawal-modal";

interface WithdrawButtonProps {
  token: string;
  merchantId: string;
}

export const WithDrawalButton = ({ token, merchantId }: WithdrawButtonProps) => {
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  return (
    <>
    {withdrawalModal && <WithdrawalModal onClose={() => setWithdrawalModal(false)} token={token} merchantId={merchantId} />}
      <div>
        <Button
          size="default"
          className="bg-accent text-white hover:bg-accent/70"
          onClick={() => {
            setWithdrawalModal(true)
          }}
        >
          <span className="inline-block pr-2">Withdraw</span>
          <Icons.arrowDown />
        </Button>
      </div>
    </>
  );
};
